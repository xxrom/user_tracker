import { Schema, model } from "mongoose";

/*
{
	"event": "pageview",
	"tags": [],
	"url": "http://localhost:50000/1.html",
	"title": "My website",
	"ts": 1675209600
}
*/
const trackSchema = new Schema({
  event: String,
  tags: [String],
  url: String,
  title: String,
  ts: Number,
});

export const Track = model("Track", trackSchema);
