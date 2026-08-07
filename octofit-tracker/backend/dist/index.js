"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./config/database"));
exports.db = database_1.default;
const PORT = Number(process.env.PORT) || 8000;
app_1.default.listen(PORT, () => {
    console.log(`Backend server listening on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map