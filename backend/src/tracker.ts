interface Tracker {
  track(event: string, ...tags: string[]): void;
}

class Tracker implements Tracker {
  track(event: string, ...tags: string[]) {
    console.log("tracker", event, tags);
  }
}

(window as any).tracker = new Tracker();
