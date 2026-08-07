import { Schema, model, type Document } from 'mongoose';

export interface IActivityDocument extends Document {
  userId: string;
  type: 'run' | 'walk' | 'strength';
  durationMinutes: number;
  distanceKm?: number;
  notes?: string;
  pointsEarned: number;
  createdAt: Date;
}

const activitySchema = new Schema<IActivityDocument>({
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

export default model<IActivityDocument>('Activity', activitySchema);
