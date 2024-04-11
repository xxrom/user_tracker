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
var SERVER_URL = "http://localhost:8888/track";
var THROTTLE_SECONDS = 10;
var BUFFER_MAX_SIZE = 3;
var Tracker = /** @class */ (function () {
    function Tracker() {
        var _this = this;
        var _a, _b, _c, _d;
        this.throttleInterval = THROTTLE_SECONDS * 1000;
        this.pushBufferMaxSize = BUFFER_MAX_SIZE;
        this.resetBuffer();
        this.resetIssueBuffer();
        this.resetLastPushTime();
        if (((_b = (_a = window === null || window === void 0 ? void 0 : window.nc) === null || _a === void 0 ? void 0 : _a.q) === null || _b === void 0 ? void 0 : _b.length) > 0) {
            var q = (_c = window === null || window === void 0 ? void 0 : window.nc) === null || _c === void 0 ? void 0 : _c.q;
            var t = (_d = window === null || window === void 0 ? void 0 : window.nc) === null || _d === void 0 ? void 0 : _d.t;
            q.forEach(function (a) {
                var _a = __spreadArray([], a, true), t = _a[0], tags = _a.slice(1);
                _this.track.apply(_this, __spreadArray([t], tags, false));
            });
            this.track("userInitTime", t);
        }
        this.beforeCloseBrowser = function () {
            if (_this.buffer.length > 0) {
                _this.pushTracks("text/plain"); // to avoid additional "OPTIONS" requests
            }
        };
        this.beforeHiddenBrowser = function () {
            if (document.visibilityState === "hidden") {
                _this.beforeCloseBrowser();
            }
        };
        document.addEventListener("visibilitychange", this.beforeHiddenBrowser);
        window.addEventListener("beforeunload", this.beforeCloseBrowser);
    }
    Tracker.prototype.remove = function () {
        document.removeEventListener("visibilitychange", this.beforeHiddenBrowser);
        window.removeEventListener("beforeunload", this.beforeCloseBrowser);
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
    Tracker.prototype.resetPushTimeout = function () {
        clearTimeout(this.pushTimeout);
        this.pushTimeout = undefined;
    };
    Tracker.prototype.resetIssueTimeout = function () {
        clearTimeout(this.issueTimeout);
        this.issueTimeout = undefined;
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
        return __awaiter(this, arguments, void 0, function (contentType) {
            var res, error_1;
            var _a;
            if (contentType === void 0) { contentType = "application/json"; }
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.info(">>> pushTracks ".concat(contentType), this.buffer.length, this.buffer);
                        if (this.buffer.length === 0) {
                            return [2 /*return*/];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fetch(SERVER_URL, {
                                body: JSON.stringify({
                                    tracks: this.buffer,
                                }),
                                headers: {
                                    "Content-Type": contentType,
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
                        (_a = this.issueBuffer).push.apply(_a, this.buffer);
                        this.setIssuePushTimeout();
                        return [3 /*break*/, 4];
                    case 4:
                        this.resetLastPushTime();
                        this.resetBuffer();
                        this.resetPushTimeout();
                        return [2 /*return*/];
                }
            });
        });
    };
    Tracker.prototype.setIssuePushTimeout = function () {
        var _this = this;
        console.log("IssueBuffer size: ".concat(this.issueBuffer.length));
        if (typeof this.issueTimeout !== "undefined") {
            return;
        }
        this.issueTimeout = setTimeout(function () {
            var _a;
            (_a = _this.buffer).push.apply(_a, _this.issueBuffer);
            _this.resetIssueBuffer();
            _this.resetIssueTimeout();
            _this.pushTracks();
        }, this.throttleInterval);
    };
    Tracker.prototype.setPushTimeout = function () {
        var _this = this;
        console.log("buffer size: ".concat(this.buffer.length));
        if (typeof this.pushTimeout !== "undefined") {
            return;
        }
        this.pushTimeout = setTimeout(function () { return _this.pushTracks(); }, this.throttleInterval);
    };
    Tracker.prototype.track = function (event) {
        var tags = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            tags[_i - 1] = arguments[_i];
        }
        var track = this.prepareObject.apply(this, __spreadArray([event], tags, false));
        var currentTime = new Date().getTime();
        var isFirstTrack = this.buffer.length === 0;
        if (isFirstTrack) {
            this.lastPushTime = currentTime;
        }
        this.buffer.push(track);
        var isBufferFull = this.buffer.length >= this.pushBufferMaxSize;
        var isTimeoutForPush = currentTime - this.lastPushTime >= this.throttleInterval;
        var isPushTracks = isBufferFull || isTimeoutForPush;
        if (isPushTracks) {
            this.pushTracks();
        }
        else {
            this.setPushTimeout();
        }
    };
    return Tracker;
}());
window.tracker = new Tracker();
