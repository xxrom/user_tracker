const SERVER_URL = `%%SERVER_URL%%/track`;

const THROTTLE_SECONDS = 10;
const BUFFER_MAX_SIZE = 3;

type TrackType = {
  event: string;
  tags: Array<string>;
  title: string;
  ts: number;
  url: string;
};

type TimeoutTypes = "issueTimeout" | "pushTimeout";

type SetTimeoutType = ReturnType<typeof setTimeout>;

interface Tracker {
  buffer: Array<TrackType>;
  issueBuffer: Array<TrackType>;

  lastPushTime: number;

  pushTimeout: SetTimeoutType | undefined;
  issueTimeout: SetTimeoutType | undefined;

  pushBufferMaxSize: number;
  throttleInterval: number;

  beforeCloseBrowser: () => void;
  beforeHiddenBrowser: () => void;

  track(event: string, ...tags: string[]): void;
}

class Tracker implements Tracker {
  constructor() {
    this.throttleInterval = THROTTLE_SECONDS * 1000;
    this.pushBufferMaxSize = BUFFER_MAX_SIZE;
    this.lastPushTime = 0;

    this.resetBuffer();
    this.resetIssueBuffer();
  }

  init() {
    if (window?.nc?.q?.length > 0) {
      const q = window.nc.q;

      q.forEach((a: Array<string>) => {
        const [event, ...tags] = [...a];
        this.track(event, ...tags);
      });

      // For users load time statistics
      const time = window?.nc?.t;
      this.track("userInitTime", time.toString());
    }

    this.beforeCloseBrowser = () => {
      if (this.buffer.length > 0) {
        this.sendBeacon();
      }
    };
    this.beforeHiddenBrowser = () => {
      if (document.visibilityState === "hidden") {
        this.beforeCloseBrowser();
      }
    };

    document.addEventListener("visibilitychange", this.beforeHiddenBrowser);
    window.addEventListener("beforeunload", this.beforeCloseBrowser);
  }

  sendBeacon() {
    const body = JSON.stringify({
      tracks: this.buffer,
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon(SERVER_URL, body);
    } else {
      fetch(SERVER_URL, { body, method: "POST", keepalive: true });
    }
  }

  prepareObject(event: string, ...tags: string[]): TrackType {
    return {
      event,
      tags,
      title: document.title,
      ts: Math.floor(new Date().getTime() / 1000), // in seconds
      url: window.location.href,
    };
  }

  resetTimeout(timeoutType: TimeoutTypes) {
    clearTimeout(this[timeoutType]);
    this[timeoutType] = undefined;
  }
  resetLastPushTime() {
    this.lastPushTime = new Date().getTime();
  }
  resetBuffer() {
    this.buffer = [];
  }
  resetIssueBuffer() {
    this.issueBuffer = [];
  }

  async pushTracks() {
    const currentBuffer = [...this.buffer];

    try {
      this.resetLastPushTime();
      this.resetBuffer();
      this.resetTimeout("pushTimeout");

      const res = await fetch(SERVER_URL, {
        body: JSON.stringify({
          tracks: currentBuffer,
        }),
        headers: {
          "Content-Type": "text/plain",
        },
        method: "POST",
      });

      if (res.status === 422 || !res.ok) {
        throw Error("Not valid server status response");
      }
    } catch (error) {
      this.issueBuffer.push(...currentBuffer);
      this.setFunctionTimeout("issueTimeout");
    }
  }

  setFunctionTimeout(timeoutType: TimeoutTypes) {
    if (typeof this[timeoutType] !== "undefined") {
      return;
    }

    const getTimeoutMs = () => {
      if (timeoutType === "issueTimeout") {
        return this.throttleInterval;
      }

      const currentTime = new Date().getTime();
      const timeDiff = currentTime - this.lastPushTime;

      return timeDiff < this.throttleInterval
        ? this.throttleInterval - timeDiff
        : this.throttleInterval;
    };

    this[timeoutType] = setTimeout(() => {
      if (timeoutType === "issueTimeout") {
        this.buffer.push(...this.issueBuffer);

        this.resetIssueBuffer();
        this.resetTimeout(timeoutType);
      }

      this.pushTracks();
    }, getTimeoutMs());
  }

  track(event: string, ...tags: string[]) {
    const track = this.prepareObject(event, ...tags);
    const currentTime = new Date().getTime();

    this.buffer.push(track);

    const isBufferFull = this.buffer.length >= this.pushBufferMaxSize;
    const isTimeoutForPush =
      currentTime - this.lastPushTime >= this.throttleInterval;
    const isPushTracks = isBufferFull || isTimeoutForPush;

    if (isPushTracks) {
      this.pushTracks();
    } else {
      this.setFunctionTimeout("pushTimeout");
    }
  }
}

interface Window {
  tracker: Tracker;
  nc: {
    q: Array<any>;
    t: number;
  };
}
window.tracker = new Tracker();
window.tracker.init();
