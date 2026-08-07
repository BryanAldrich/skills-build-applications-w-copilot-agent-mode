import { Router } from 'express';
import User from '../models/user';
import Activity from '../models/activity';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker backend is running' });
});

router.get('/users', async (_req, res) => {
  try {
    const users = await User.find().sort({ points: -1, createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch users' });
  }
});

router.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create user' });
  }
});

router.get('/activities', async (_req, res) => {
  try {
    const activities = await Activity.find().sort({ createdAt: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch activities' });
  }
});

router.post('/activities', async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    const points = activity.pointsEarned || calculatePoints(activity);
    await User.findByIdAndUpdate(activity.userId, { $inc: { points } });
    res.status(201).json({ ...activity.toObject(), pointsEarned: points });
  } catch (error) {
    res.status(400).json({ error: 'Unable to create activity' });
  }
});

router.get('/leaderboard', async (_req, res) => {
  try {
    const users = await User.find().sort({ points: -1, createdAt: -1 }).limit(10);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch leaderboard' });
  }
});

router.get('/workouts', (_req, res) => {
  res.json([
    {
      name: 'Starter Run',
      description: 'A short run for beginners',
      difficulty: 'beginner',
    },
    {
      name: 'Tempo Walk',
      description: 'A brisk walk to build endurance',
      difficulty: 'intermediate',
    },
    {
      name: 'Strength Circuit',
      description: 'A full-body strength workout',
      difficulty: 'advanced',
    },
  ]);
});

function calculatePoints(activity: { type: string; durationMinutes: number; distanceKm?: number }) {
  switch (activity.type) {
    case 'run':
      return activity.durationMinutes + (activity.distanceKm ? Math.round(activity.distanceKm * 2) : 0);
    case 'walk':
      return Math.round(activity.durationMinutes / 5);
    case 'strength':
      return activity.durationMinutes;
    default:
      return 0;
  }
}

export default router;
