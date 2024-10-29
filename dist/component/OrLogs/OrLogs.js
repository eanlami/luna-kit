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
require("./OrLogs.scss");
require("../../base/style.scss");
var OrMenu = function (_a) {
    var itemLogs = _a.itemLogs;
    return (React.createElement("div", null,
        React.createElement("div", { className: "logs" }, itemLogs.map(function (item, index) { return (React.createElement("div", { className: "logs-item", key: index },
            React.createElement("div", { className: 'logs-header' },
                React.createElement("span", { className: "b2-strong" }, item.date),
                React.createElement("span", { className: "b2 logs-version" }, item.version)),
            React.createElement("div", { className: "changes-list" }, item.changes.map(function (change, idx) { return (React.createElement("div", { key: idx, className: "logs-list" },
                React.createElement("span", { className: "b2 logs-type" }, change.type),
                Array.isArray(change.text) ? (React.createElement("ul", { className: 'logs-list-item' }, change.text.map(function (textItem, textIdx) { return (React.createElement("li", { className: 't1', key: textIdx }, textItem)); }))) : (React.createElement("span", null,
                    " ",
                    change.text)))); })))); }))));
};
exports.default = OrMenu;
