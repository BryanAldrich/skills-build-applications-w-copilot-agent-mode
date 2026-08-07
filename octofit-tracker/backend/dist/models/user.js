"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    age: { type: Number, min: 1 },
    fitnessLevel: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner',
    },
    team: { type: String, default: 'unassigned' },
    points: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});
exports.default = (0, mongoose_1.model)('User', userSchema);
//# sourceMappingURL=user.js.map