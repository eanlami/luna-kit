"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
require("./OrSlider.scss");
var OrSlider = function (_a) {
    var value = _a.value, onChange = _a.onChange;
    var _b = (0, react_1.useState)(false), showTooltip = _b[0], setShowTooltip = _b[1];
    (0, react_1.useEffect)(function () {
        var sliderElement = document.querySelector('.slider');
        if (sliderElement) {
            sliderElement.style.setProperty('--value', "".concat((value - 0.5) / (1.5 - 0.5) * 100, "%"));
        }
    }, [value]);
    var handleMouseEnter = function () {
        setShowTooltip(true);
    };
    var handleMouseLeave = function () {
        setShowTooltip(false);
    };
    return (react_1.default.createElement("div", { className: "slider-container" },
        react_1.default.createElement("span", { className: 'b1-strong' }, "Stroke"),
        react_1.default.createElement("div", { className: "tooltip", style: { display: showTooltip ? 'block' : 'none', left: "".concat((value - 0.5) / (1.5 - 0.5) * 100, "%") } }, value),
        react_1.default.createElement("input", { type: "range", min: "0.5", max: "1.5", step: "0.1", value: value, onChange: function (e) {
                var newValue = Number(e.target.value);
                onChange(newValue);
                e.target.style.setProperty('--value', "".concat((newValue - 0.5) / (1.5 - 0.5) * 100, "%"));
            }, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, className: "slider" }),
        react_1.default.createElement("div", { className: "labels" },
            react_1.default.createElement("span", null, "Light (0.5)"),
            react_1.default.createElement("span", null, "Bold (1.5)"))));
};
exports.default = OrSlider;
