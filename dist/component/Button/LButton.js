"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./LButton.scss");
require("../../base/type-style.scss");
var LButton = function (_a) {
    var text = _a.text, onClick = _a.onClick, _b = _a.disabled, disabled = _b === void 0 ? false : _b, _c = _a.variant, variant = _c === void 0 ? 'primary' : _c, _d = _a.appearance, appearance = _d === void 0 ? 'fill' : _d, icon = _a.icon, _e = _a.size, size = _e === void 0 ? 'md' : _e, className = _a.className, _f = _a.layout, layout = _f === void 0 ? 'text' : _f, _g = _a.fillBlock, fillBlock = _g === void 0 ? false : _g;
    var buttonClassName = "button ".concat(layout, " ").concat(variant, " ").concat(appearance, " ").concat(size, " ").concat(fillBlock ? 'fill-block' : '', " ").concat(size === 'xs' ? 'c1' : 'b1');
    return (react_1.default.createElement("button", { className: buttonClassName, onClick: onClick, disabled: disabled },
        react_1.default.createElement("div", { className: "div-button" },
            icon && react_1.default.createElement("span", { className: 'icon' }, icon),
            text)));
};
exports.default = LButton;
