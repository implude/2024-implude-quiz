import * as mongoose from 'mongoose';

export const DevRankSchema = new mongoose.Schema({
  name: String,
  score: Number,
  same_name: Number,
});

export const DesignRankSchema = new mongoose.Schema({
  name: String,
  score: Number,
  same_name: Number,
});
