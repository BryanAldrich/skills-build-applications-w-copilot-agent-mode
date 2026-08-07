import { Schema, model, type Document } from 'mongoose';

export interface IWorkoutDocument extends Document {
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  createdAt: Date;
}

const workoutSchema = new Schema<IWorkoutDocument>({
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

export default model<IWorkoutDocument>('Workout', workoutSchema);
