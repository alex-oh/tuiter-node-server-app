import mongoose from "mongoose";
const tuitsSchema = mongoose.Schema(
    {
        tuit: String,
        likes: Number,
        liked: Boolean,
    },
    { collection: "tuits" }
);
export default tuitsSchema;
