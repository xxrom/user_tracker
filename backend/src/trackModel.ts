import { Schema, model } from "mongoose";

const trackSchema = new Schema({
  event: { type: String, required: [true, '"event" is required'] },
  tags: [String],
  url: { type: String, required: [true, '"url" is required'] },
  title: { type: String, required: [true, '"title" is required'] },
  ts: { type: Number, required: [true, '"ts" is required'] },
});

export const Track = model("Track", trackSchema);
