const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Task = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
    priority: {
      type: Number,
    },
    status: {
      type: Boolean,
    }
  },
  {
    collection: "Tasks",
  }
);

module.exports = mongoose.model("Task", Task);
