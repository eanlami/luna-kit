"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Loading.tsx
var react_1 = __importDefault(require("react"));
require("./OrLoading.scss");
var Loading = function () {
    return (react_1.default.createElement("div", { className: "loading-overlay" },
        react_1.default.createElement("div", { className: "loading-content" }, "Loading...")));
};
exports.default = Loading;
