import mongoose, { Schema } from "mongoose";

const questionsSchema = new Schema({
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
      topic: {
        type: String,
        required: true,
      },
    },
  ],
});

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  questions: [questionsSchema],
});

export default mongoose.model("User", userSchema);
