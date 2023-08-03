import Prompt from "@models/Prompt";
import { connectToDatabase } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDatabase();

    const id = params.id;

    const posts = await Prompt.find({ creator: id }).populate("creator");
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to get user's posts", { status: 500 });
  }
};
