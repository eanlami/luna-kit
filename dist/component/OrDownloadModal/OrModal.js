"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modal.tsx
var react_1 = __importDefault(require("react"));
require("./OrModal.scss");
var LButton_1 = __importDefault(require("../Button/LButton"));
var Modal = function (_a) {
    var title = _a.title, isOpen = _a.isOpen, onClose = _a.onClose, children = _a.children;
    if (!isOpen)
        return null;
    return (react_1.default.createElement("div", { className: "modal-overlay", onClick: onClose },
        react_1.default.createElement("div", { className: 'modal-body', onClick: function (e) { return e.stopPropagation(); } },
            react_1.default.createElement("div", { className: 't1-strong modal-title' },
                react_1.default.createElement("span", null, title),
                react_1.default.createElement(LButton_1.default, { layout: 'icon', appearance: 'outline', variant: 'secondary', size: 'md', onClick: onClose })),
            react_1.default.createElement("div", { className: "modal-content" }, children))));
};
exports.default = Modal;
