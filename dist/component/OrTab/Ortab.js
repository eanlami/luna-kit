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
require("./OrTab.scss");
var OrTab = function (_a) {
    var tabs = _a.tabs, onTabChange = _a.onTabChange, _b = _a.isSegmentControl, isSegmentControl = _b === void 0 ? true : _b, initialTab = _a.initialTab;
    var _c = (0, react_1.useState)(initialTab || tabs[1]), activeTab = _c[0], setActiveTab = _c[1];
    var handleTabClick = function (tab) {
        setActiveTab(tab);
        onTabChange(tab);
    };
    return (react_1.default.createElement("div", { className: "b2 or-tab ".concat(isSegmentControl ? 'segment-control' : 'tabs') }, tabs.map(function (tab) { return (react_1.default.createElement("button", { key: tab, className: "b2-strong tab-button ".concat(activeTab === tab ? 'active' : ''), onClick: function () { return handleTabClick(tab); } }, tab)); })));
};
exports.default = OrTab;
