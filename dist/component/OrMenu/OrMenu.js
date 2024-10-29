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
var React = __importStar(require("react"));
require("./OrMenu.scss");
var OrMenu = function (_a) {
    var itemMenu = _a.itemMenu, _b = _a.isOpen, isOpen = _b === void 0 ? true : _b, handleToggle = _a.handleToggle;
    return (React.createElement("div", null,
        React.createElement("div", { className: "menu ".concat(isOpen ? 'open' : '') },
            React.createElement("div", { className: "menu-body" }, itemMenu.map(function (item, index) { return (React.createElement("div", { className: "b2-strong menu-item", key: index },
                item.icon && React.createElement("span", { className: "menu-icon" }, item.icon),
                React.createElement("a", { href: item.link }, item.name))); }))),
        React.createElement("div", { className: "".concat(isOpen ? 'backdrop' : ''), onClick: handleToggle })));
};
exports.default = OrMenu;
