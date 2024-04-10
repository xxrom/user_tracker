/*
{
    "event": "pageview",
    "tags": [],
    "url": "http://localhost:50000/1.html",
    "title": "My website",
    "ts": 1675209600
}
*/
var Tracker = /** @class */ (function () {
    function Tracker() {
    }
    Tracker.prototype.track = function (event) {
        var tags = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            tags[_i - 1] = arguments[_i];
        }
        console.log("tracker", event, tags);
        fetch("http://localhost:8888/track", {
            body: JSON.stringify({
                event: event,
                tags: tags,
                title: "My website",
                ts: new Date().getTime(),
                url: window.location.href,
            }),
            headers: { "Content-Type": "application/json" },
            mode: "no-cors",
            method: "POST",
        }).catch(function (error) {
            console.error("track error: ", error);
        });
    };
    return Tracker;
}());
window.tracker = new Tracker();
