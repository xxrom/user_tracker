var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var SERVER_URL = "http://localhost:6075/track";
var THROTTLE_SECONDS = 10;
var BUFFER_MAX_SIZE = 3;
var Tracker = /** @class */ (function () {
    function Tracker() {
        this.throttleInterval = THROTTLE_SECONDS * 1000;
        this.pushBufferMaxSize = BUFFER_MAX_SIZE;
        this.lastPushTime = 0;
        this.resetBuffer();
        this.resetIssueBuffer();
    }
    Tracker.prototype.init = function () {
        var _this = this;
        var _a, _b, _c;
        if (((_b = (_a = window === null || window === void 0 ? void 0 : window.nc) === null || _a === void 0 ? void 0 : _a.q) === null || _b === void 0 ? void 0 : _b.length) > 0) {
            var q = window.nc.q;
            q.forEach(function (a) {
                var _a = __spreadArray([], a, true), event = _a[0], tags = _a.slice(1);
                _this.track.apply(_this, __spreadArray([event], tags, false));
            });
            // For users load time statistics
            var time = (_c = window === null || window === void 0 ? void 0 : window.nc) === null || _c === void 0 ? void 0 : _c.t;
            this.track("userInitTime", time.toString());
        }
        this.beforeCloseBrowser = function () {
            if (_this.buffer.length > 0) {
                _this.sendBeacon();
            }
        };
        this.beforeHiddenBrowser = function () {
            if (document.visibilityState === "hidden") {
                _this.beforeCloseBrowser();
            }
        };
        document.addEventListener("visibilitychange", this.beforeHiddenBrowser);
        window.addEventListener("beforeunload", this.beforeCloseBrowser);
    };
    Tracker.prototype.sendBeacon = function () {
        var body = JSON.stringify({
            tracks: this.buffer,
        });
        if (navigator.sendBeacon) {
            navigator.sendBeacon(SERVER_URL, body);
        }
        else {
            fetch(SERVER_URL, { body: body, method: "POST", keepalive: true });
        }
    };
    Tracker.prototype.prepareObject = function (event) {
        var tags = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            tags[_i - 1] = arguments[_i];
        }
        return {
            event: event,
            tags: tags,
            title: document.title,
            ts: Math.floor(new Date().getTime() / 1000), // in seconds
            url: window.location.href,
        };
    };
    Tracker.prototype.resetTimeout = function (timeoutType) {
        clearTimeout(this[timeoutType]);
        this[timeoutType] = undefined;
    };
    Tracker.prototype.resetLastPushTime = function () {
        this.lastPushTime = new Date().getTime();
    };
    Tracker.prototype.resetBuffer = function () {
        this.buffer = [];
    };
    Tracker.prototype.resetIssueBuffer = function () {
        this.issueBuffer = [];
    };
    Tracker.prototype.pushTracks = function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentBuffer, res, error_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        currentBuffer = __spreadArray([], this.buffer, true);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        this.resetLastPushTime();
                        this.resetBuffer();
                        this.resetTimeout("pushTimeout");
                        return [4 /*yield*/, fetch(SERVER_URL, {
                                body: JSON.stringify({
                                    tracks: currentBuffer,
                                }),
                                headers: {
                                    "Content-Type": "text/plain",
                                },
                                method: "POST",
                            })];
                    case 2:
                        res = _b.sent();
                        if (res.status === 422 || !res.ok) {
                            throw Error("Not valid server status response");
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        (_a = this.issueBuffer).push.apply(_a, currentBuffer);
                        this.setFunctionTimeout("issueTimeout");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Tracker.prototype.setFunctionTimeout = function (timeoutType) {
        var _this = this;
        if (typeof this[timeoutType] !== "undefined") {
            return;
        }
        var getTimeoutMs = function () {
            if (timeoutType === "issueTimeout") {
                return _this.throttleInterval;
            }
            var currentTime = new Date().getTime();
            var timeDiff = currentTime - _this.lastPushTime;
            return timeDiff < _this.throttleInterval
                ? _this.throttleInterval - timeDiff
                : _this.throttleInterval;
        };
        this[timeoutType] = setTimeout(function () {
            var _a;
            if (timeoutType === "issueTimeout") {
                (_a = _this.buffer).push.apply(_a, _this.issueBuffer);
                _this.resetIssueBuffer();
                _this.resetTimeout(timeoutType);
            }
            _this.pushTracks();
        }, getTimeoutMs());
    };
    Tracker.prototype.track = function (event) {
        var tags = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            tags[_i - 1] = arguments[_i];
        }
        var track = this.prepareObject.apply(this, __spreadArray([event], tags, false));
        var currentTime = new Date().getTime();
        this.buffer.push(track);
        var isBufferFull = this.buffer.length >= this.pushBufferMaxSize;
        var isTimeoutForPush = currentTime - this.lastPushTime >= this.throttleInterval;
        var isPushTracks = isBufferFull || isTimeoutForPush;
        if (isPushTracks) {
            this.pushTracks();
        }
        else {
            this.setFunctionTimeout("pushTimeout");
        }
    };
    return Tracker;
}());
window.tracker = new Tracker();
window.tracker.init();
