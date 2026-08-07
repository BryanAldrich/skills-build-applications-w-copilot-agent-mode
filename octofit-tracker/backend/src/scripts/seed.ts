import mongoose from 'mongoose';
import User from '../models/user';
import Team from '../models/team';
import Activity from '../models/activity';
import LeaderboardEntry from '../models/leaderboard';
import Workout from '../models/workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
export async function seedDatabase() {
  await mongoose.connect(connectionString);

  console.log('Connected to octofit_db');

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const teams = await Team.create([
    {
      name: 'Storm Squad',
      description: 'A high-energy team focused on endurance and community challenges.',
      goal: 'Complete 500km collectively this month',
    },
    {
      name: 'Peak Builders',
      description: 'Strength-focused athletes building consistency and power.',
      goal: 'Hit 100 strength sessions this quarter',
    },
  ]);

  const users = await User.create([
    {
      name: 'Maya Chen',
      email: 'maya@example.com',
      age: 29,
      fitnessLevel: 'advanced',
      team: teams[0].name,
      points: 320,
    },
    {
      name: 'Liam Ortiz',
      email: 'liam@example.com',
      age: 34,
      fitnessLevel: 'intermediate',
      team: teams[0].name,
      points: 240,
    },
    {
      name: 'Ava Brooks',
      email: 'ava@example.com',
      age: 27,
      fitnessLevel: 'beginner',
      team: teams[1].name,
      points: 185,
    },
  ]);

  const activities = await Activity.create([
    {
      userId: users[0]._id.toString(),
      type: 'run',
      durationMinutes: 35,
      distanceKm: 6.2,
      notes: 'Morning tempo run',
      pointsEarned: 47,
    },
    {
      userId: users[1]._id.toString(),
      type: 'walk',
      durationMinutes: 45,
      notes: 'Lunch walk',
      pointsEarned: 9,
    },
    {
      userId: users[2]._id.toString(),
      type: 'strength',
      durationMinutes: 30,
      notes: 'Full body routine',
      pointsEarned: 30,
    },
  ]);

  const leaderboardEntries = await LeaderboardEntry.create(
    users.map((user, index) => ({
      userId: user._id.toString(),
      name: user.name,
      points: user.points,
      rank: index + 1,
    })),
  );

  const workouts = await Workout.create([
    {
      name: 'Starter Run',
      description: 'A short run for beginners',
      difficulty: 'beginner',
      durationMinutes: 20,
    },
    {
      name: 'Tempo Walk',
      description: 'A brisk walk to build endurance',
      difficulty: 'intermediate',
      durationMinutes: 30,
    },
    {
      name: 'Strength Circuit',
      description: 'A full-body strength workout',
      difficulty: 'advanced',
      durationMinutes: 40,
    },
  ]);

  console.log('Database seeding complete');
  await mongoose.disconnect();

  return {
    users: users.length,
    teams: teams.length,
    activities: activities.length,
    leaderboardEntries: leaderboardEntries.length,
    workouts: workouts.length,
  };
}

if (require.main === module) {
  seedDatabase().catch((error) => {
    console.error('Error seeding database:', error);
    process.exit(1);
  });
}
