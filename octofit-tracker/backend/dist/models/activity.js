"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const activitySchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    type: {
        type: String,
        enum: ['run', 'walk', 'strength'],
        required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    notes: { type: String, trim: true },
    pointsEarned: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});
exports.default = (0, mongoose_1.model)('Activity', activitySchema);
//# sourceMappingURL=activity.js.map