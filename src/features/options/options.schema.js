import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
    questionId: { type: mongoose.Schema.Types.ObjectId, required: true},
    text: { type: String, required: true },
    votes: { type: Number, default: 0 },
    link_to_vote: { type: String },
}).pre('save', function (next) {
    this.link_to_vote = `http://localhost:3001/api/options/${this._id}/add_vote`;
    next();
});

export default optionSchema; 