import mongoose from 'mongoose';
import { seedDatabase } from '../scripts/seed';
import User from '../models/user';
import Team from '../models/team';
import Activity from '../models/activity';
import LeaderboardEntry from '../models/leaderboard';
import Workout from '../models/workout';

describe('database seeding', () => {
  jest.setTimeout(20000);
  afterEach(async () => {
    await mongoose.disconnect();
  });

  it('creates sample users, teams, activities, leaderboard entries, and workouts', async () => {
    const result = await seedDatabase();

    expect(result.users).toBeGreaterThan(0);
    expect(result.teams).toBeGreaterThan(0);
    expect(result.activities).toBeGreaterThan(0);
    expect(result.leaderboardEntries).toBeGreaterThan(0);
    expect(result.workouts).toBeGreaterThan(0);

    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db');

    const users = await User.countDocuments();
    const teams = await Team.countDocuments();
    const activities = await Activity.countDocuments();
    const leaderboardEntries = await LeaderboardEntry.countDocuments();
    const workouts = await Workout.countDocuments();

    expect(users).toBe(result.users);
    expect(teams).toBe(result.teams);
    expect(activities).toBe(result.activities);
    expect(leaderboardEntries).toBe(result.leaderboardEntries);
    expect(workouts).toBe(result.workouts);
  });
});
