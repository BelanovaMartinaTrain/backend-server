"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatTimestamp24hFormat = (date) => {
    const modifiedDate = date.toLocaleTimeString([], { hourCycle: "h23", hour: "2-digit", minute: "2-digit" });
    return modifiedDate;
};
exports.default = formatTimestamp24hFormat;
