import User from "../models/User";

export const getAllQuestions = async function (req, res) {
  const userId = req.params.userid;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User Not Found" });
    }

    const { questions } = user;

    res.status(200).json({ questions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve questions" });
  }
};

export const createQuestion = async function (req, res) {
  const userId = req.params.userid;
  const { question, answer, topic } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User Not Found" });
    }

    user.questions.push({
      question: question,
      answer: answer,
      topic: topic,
    });

    await user.save();

    res.status(201).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create question" });
  }
};
