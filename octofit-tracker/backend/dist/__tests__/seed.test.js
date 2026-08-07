"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const seed_1 = require("../scripts/seed");
const user_1 = __importDefault(require("../models/user"));
const team_1 = __importDefault(require("../models/team"));
const activity_1 = __importDefault(require("../models/activity"));
const leaderboard_1 = __importDefault(require("../models/leaderboard"));
const workout_1 = __importDefault(require("../models/workout"));
describe('database seeding', () => {
    jest.setTimeout(20000);
    afterEach(async () => {
        await mongoose_1.default.disconnect();
    });
    it('creates sample users, teams, activities, leaderboard entries, and workouts', async () => {
        const result = await (0, seed_1.seedDatabase)();
        expect(result.users).toBeGreaterThan(0);
        expect(result.teams).toBeGreaterThan(0);
        expect(result.activities).toBeGreaterThan(0);
        expect(result.leaderboardEntries).toBeGreaterThan(0);
        expect(result.workouts).toBeGreaterThan(0);
        await mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db');
        const users = await user_1.default.countDocuments();
        const teams = await team_1.default.countDocuments();
        const activities = await activity_1.default.countDocuments();
        const leaderboardEntries = await leaderboard_1.default.countDocuments();
        const workouts = await workout_1.default.countDocuments();
        expect(users).toBe(result.users);
        expect(teams).toBe(result.teams);
        expect(activities).toBe(result.activities);
        expect(leaderboardEntries).toBe(result.leaderboardEntries);
        expect(workouts).toBe(result.workouts);
    });
});
//# sourceMappingURL=seed.test.js.map