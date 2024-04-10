var Tracker = /** @class */ (function () {
    function Tracker() {
    }
    Tracker.prototype.track = function (event) {
        var tags = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            tags[_i - 1] = arguments[_i];
        }
        console.log("tracker", event, tags);
    };
    return Tracker;
}());
window.tracker = new Tracker();
