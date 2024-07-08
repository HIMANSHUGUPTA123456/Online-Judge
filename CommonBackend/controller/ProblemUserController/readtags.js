import Tags from "../../models/Tags.js";
export const readtags = async (req, res) => {
  try {
    const tags = await Tags.find({}, { _id: 1, value: 1 });
    res.status(200).json({
      success: true,
      data: tags,
    });
  } catch (error) {
    console.error("Error fetching tags:", error);
    return res.status(500).json({
      success: false,
      message: "[SERVER ERROR] Unable to fetch tags",
      error: error.message,
    });
  }
};
