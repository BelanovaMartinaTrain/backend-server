"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const changeData27days = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield params.text();
    const newLines = [];
    data.split("\n").forEach((line, index) => {
        if (index > 10 && index < 38)
            newLines.push({
                date: `${line.slice(0, 15).trim()}`,
                flux: `${line.slice(16, 25).trim()}`,
                AKp: `${line.slice(26, 38).trim()}`,
                Kp: `${line.slice(39, line.length).trim()}`,
            });
    });
    return newLines;
});
exports.default = changeData27days;
