interface Tracker {
  track(event: string, ...tags: string[]): void;
}

/*
{
	"event": "pageview",
	"tags": [],
	"url": "http://localhost:50000/1.html",
	"title": "My website",
	"ts": 1675209600
}
*/

class Tracker implements Tracker {
  track(event: string, ...tags: string[]) {
    console.log("tracker", event, tags);

    fetch("http://localhost:8888/track", {
      body: JSON.stringify({
        event,
        tags,
        title: "My website",
        ts: new Date().getTime(),
        url: window.location.href,
      }),
      headers: { "Content-Type": "application/json" },
      mode: "no-cors",
      method: "POST",
    }).catch((error) => {
      console.error("track error: ", error);
    });
  }
}

(window as any).tracker = new Tracker();
