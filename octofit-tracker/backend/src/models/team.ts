import { Schema, model, type Document } from 'mongoose';

export interface ITeamDocument extends Document {
  name: string;
  description: string;
  goal: string;
  createdAt: Date;
}

const teamSchema = new Schema<ITeamDocument>({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String, required: true, trim: true },
  goal: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});

export default model<ITeamDocument>('Team', teamSchema);
