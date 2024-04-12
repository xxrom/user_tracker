import { Schema, model } from "mongoose";

const trackSchema = new Schema({
  event: { type: String, required: [true, '"event" is required'] },
  tags: {
    type: [String],
    required: [true, '"tags" is required'],
    validate: {
      validator: function (v: Array<String>) {
        return v.length >= 0;
      },
      message: () => '"tags" should a list',
    },
  },
  url: { type: String, required: [true, '"url" is required'] },
  title: { type: String, required: [true, '"title" is required'] },
  ts: { type: Number, required: [true, '"ts" is required'] },
});

export const Track = model("Track", trackSchema);
