import { Schema, model, type Document } from 'mongoose';

export interface IUserDocument extends Document {
  name: string;
  email: string;
  age?: number;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  team?: string;
  points: number;
  createdAt: Date;
}

const userSchema = new Schema<IUserDocument>({
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

export default model<IUserDocument>('User', userSchema);
