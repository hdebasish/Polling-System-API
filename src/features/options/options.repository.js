import mongoose from "mongoose";
import optionSchema from "./options.schema.js";
import questionSchema from "../questions/questions.schema.js";

const OptionModel = mongoose.model("Option", optionSchema);
const QuestionModel = mongoose.model("Question", questionSchema);

export default class OptionsRepository {
  // add vote to the database

  async vote(id) {
    try {
      return await OptionModel.findByIdAndUpdate(
        id,
        { $inc: { votes: 1 } },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }

  // find option by id

  async findOptionById(id) {
    try {
      return await OptionModel.findById(id);
    } catch (error) {
      throw error;
    }
  }

  // delete option by id

  async delete(id) {
    try {
      const result = await OptionModel.findByIdAndDelete(id);

      return await QuestionModel.findByIdAndUpdate(result.questionId, {
        $pull: { options: id },
      });
    } catch (error) {
      throw error;
    }
  }
}
