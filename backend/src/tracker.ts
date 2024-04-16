const SERVER_URL = `http://localhost:%%PORT0%%/track`;
console.log("URL", SERVER_URL);
const THROTTLE_SECONDS = 1;
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

    if ((window as any)?.nc?.q?.length > 0) {
      const q = (window as any).nc.q;

      q.forEach((a: Array<string>) => {
        const [event, ...tags] = [...a];
        this.track(event, ...tags);
      });

      // For users load time statistics
      const t = (window as any)?.nc?.t;
      this.track("userInitTime", t);
    }

    this.beforeCloseBrowser = () => {
      if (this.buffer.length > 0) {
        // to avoid additional preflight "OPTIONS" request
        this.pushTracks("text/plain");
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

  prepareObject(event: string, ...tags: string[]) {
    return {
      event,
      tags: tags ? tags : [],
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

  async pushTracks(contentType = "application/json") {
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
          "Content-Type": contentType,
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

(window as any).tracker = new Tracker();
