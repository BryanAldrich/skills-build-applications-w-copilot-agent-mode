"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const leaderboardEntrySchema = new mongoose_1.Schema({
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    points: { type: Number, default: 0 },
    rank: { type: Number, default: 1 },
    updatedAt: { type: Date, default: Date.now },
});
exports.default = (0, mongoose_1.model)('LeaderboardEntry', leaderboardEntrySchema);
//# sourceMappingURL=leaderboard.js.map