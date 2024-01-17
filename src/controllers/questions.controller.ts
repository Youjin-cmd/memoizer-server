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
