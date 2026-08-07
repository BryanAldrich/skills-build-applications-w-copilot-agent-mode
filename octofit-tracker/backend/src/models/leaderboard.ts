import { Schema, model, type Document } from 'mongoose';

export interface ILeaderboardEntryDocument extends Document {
  userId: string;
  name: string;
  points: number;
  rank: number;
  updatedAt: Date;
}

const leaderboardEntrySchema = new Schema<ILeaderboardEntryDocument>({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true, trim: true },
  points: { type: Number, default: 0 },
  rank: { type: Number, default: 1 },
  updatedAt: { type: Date, default: Date.now },
});

export default model<ILeaderboardEntryDocument>('LeaderboardEntry', leaderboardEntrySchema);
