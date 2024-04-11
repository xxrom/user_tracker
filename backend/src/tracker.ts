const SERVER_URL = "http://localhost:8888/track";
const THROTTLE_SECONDS = 10;
const BUFFER_MAX_SIZE = 3;

type TrackType = {
  event: string;
  tags: Array<string>;
  title: string;
  ts: number;
  url: string;
};

type TimeoutType = ReturnType<typeof setTimeout>;

interface Tracker {
  buffer: Array<TrackType>;
  issueBuffer: Array<TrackType>;

  lastPushTime: number;

  pushTimeout: TimeoutType | undefined;
  issueTimeout: TimeoutType | undefined;

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

    this.resetBuffer();
    this.resetIssueBuffer();
    this.resetLastPushTime();

    this.beforeCloseBrowser = () => {
      if (this.buffer.length > 0) {
        this.pushTracks();
      }
    };
    this.beforeHiddenBrowser = () => {
      if (document.visibilityState === "hidden") {
        this.beforeCloseBrowser();
      }
    };

    document.addEventListener("visibilitychange", this.beforeHiddenBrowser);
    window.addEventListener("beforeunload", this.beforeCloseBrowser); // worse performance

    /*
    // Awful user experience 
    this.beforeCloseBrowser = (event: BeforeUnloadEvent) => {
      if (this.buffer.length > 0) {
        // Recommended
        event.preventDefault();

        // Included for legacy support, e.g. Chrome/Edge < 119
        event.returnValue = true; // send alert

        return this.pushTracks();
      }
    window.addEventListener("beforeunload", this.beforeCloseBrowser); // worse performance
    */
  }

  remove() {
    document.removeEventListener("visibilitychange", this.beforeHiddenBrowser);
    window.removeEventListener("beforeunload", this.beforeCloseBrowser);
  }

  prepareObject(event: string, ...tags: string[]) {
    return {
      event,
      tags,
      title: document.title,
      ts: Math.floor(new Date().getTime() / 1000), // in seconds
      url: window.location.href,
    };
  }

  resetPushTimeout() {
    clearTimeout(this.pushTimeout);
    this.pushTimeout = undefined;
  }
  resetIssueTimeout() {
    clearTimeout(this.issueTimeout);
    this.issueTimeout = undefined;
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
    console.log(">>> pushTracks", this.buffer.length);

    if (this.buffer.length === 0) {
      return;
    }

    try {
      const res = await fetch(SERVER_URL, {
        body: JSON.stringify({
          tracks: this.buffer,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      //const body = await res.json(); // get body from server if needed

      if (res.status === 422 || !res.ok) {
        throw Error("Not valid server status response");
      }
    } catch (error) {
      this.issueBuffer.push(...this.buffer);
      this.setIssuePushTimeout();
    }

    this.resetLastPushTime();
    this.resetBuffer();
    this.resetPushTimeout();
  }

  setIssuePushTimeout() {
    console.log(`IssueBuffer size: ${this.issueBuffer.length}`);

    if (typeof this.issueTimeout !== "undefined") {
      return;
    }

    this.issueTimeout = setTimeout(() => {
      this.buffer.push(...this.issueBuffer);

      this.resetIssueBuffer();
      this.resetIssueTimeout();

      // Run default pusTracks process
      this.pushTracks();
    }, this.throttleInterval);
  }
  setPushTimeout() {
    console.log(`buffer size: ${this.buffer.length}`);

    if (typeof this.pushTimeout !== "undefined") {
      return;
    }

    this.pushTimeout = setTimeout(
      () => this.pushTracks(),
      this.throttleInterval
    );
  }

  addTrack(event: string, ...tags: string[]) {
    const track = this.prepareObject(event, ...tags);
    const currentTime = new Date().getTime();

    const isFirstTrack = this.buffer.length === 0;
    if (isFirstTrack) {
      this.lastPushTime = currentTime;
    }

    this.buffer.push(track);

    const isBufferFull = this.buffer.length >= this.pushBufferMaxSize;
    const isTimeoutForPush =
      currentTime - this.lastPushTime >= this.throttleInterval;

    const isPushTracks = isBufferFull || isTimeoutForPush;

    if (isPushTracks) {
      this.pushTracks();
    } else {
      this.setPushTimeout();
    }
  }

  track(event: string, ...tags: string[]) {
    this.addTrack(event, ...tags);
  }
}

(window as any).tracker = new Tracker();
