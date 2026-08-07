"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true },
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner',
    },
    durationMinutes: { type: Number, default: 30, min: 1 },
    createdAt: { type: Date, default: Date.now },
});
exports.default = (0, mongoose_1.model)('Workout', workoutSchema);
//# sourceMappingURL=workout.js.map