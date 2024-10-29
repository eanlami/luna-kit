"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./OrSwitch.scss");
var OrSwitch = function (_a) {
    var checked = _a.checked, onChange = _a.onChange;
    return (react_1.default.createElement("div", { className: "or-switch" },
        react_1.default.createElement("span", { className: 'b1-strong' }, " Fill "),
        react_1.default.createElement("label", { className: "switch" },
            react_1.default.createElement("input", { type: "checkbox", checked: checked, onChange: function (e) { return onChange(e.target.checked); } }),
            react_1.default.createElement("span", { className: "slider-switch" }))));
};
exports.default = OrSwitch;
