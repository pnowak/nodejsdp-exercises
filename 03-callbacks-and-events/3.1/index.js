"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var node_events_1 = require("node:events");
var node_fs_1 = require("node:fs");
var FindRegex = /** @class */ (function (_super) {
    __extends(FindRegex, _super);
    function FindRegex(regex) {
        var _this = _super.call(this) || this;
        _this.regex = regex;
        _this.files = [];
        return _this;
    }
    FindRegex.prototype.addFile = function (file) {
        this.files.push(file);
        return this;
    };
    FindRegex.prototype.find = function () {
        var _this = this;
        process.nextTick(function () { return _this.emit('start', _this.files); });
        var _loop_1 = function (file) {
            (0, node_fs_1.readFile)(file, 'utf8', function (err, content) {
                if (err) {
                    return _this.emit('error', err);
                }
                _this.emit('fileread', file);
                var match = content.match(_this.regex);
                if (match) {
                    match.forEach(function (elem) { return _this.emit('found', file, elem); });
                }
            });
        };
        for (var _i = 0, _a = this.files; _i < _a.length; _i++) {
            var file = _a[_i];
            _loop_1(file);
        }
        return this;
    };
    return FindRegex;
}(node_events_1["default"]));
var findRegexInstance = new FindRegex(/two \w+/);
findRegexInstance
    .addFile('fileA.txt')
    .addFile('fileB.json')
    .find()
    .on('start', function (files) { return console.log("Process start with ".concat(files)); })
    .on('found', function (file, match) { return console.log("Matched \"".concat(match, "\" in file ").concat(file)); })
    .on('error', function (err) { return console.error("Error emitted ".concat(err.message)); });
