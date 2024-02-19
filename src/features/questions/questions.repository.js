import mongoose from "mongoose";
import questionSchema from "./questions.schema.js";
import optionSchema from "../options/options.schema.js";

const QuestionModel = mongoose.model("Question", questionSchema);
const OptionModel = mongoose.model("Option", optionSchema);

export default class QuestionsRepository {
  // add question to the database

  async add(question) {
    try {
      const newQuestion = new QuestionModel(question);
      return await newQuestion.save();
    } catch (error) {
      throw error;
    }
  }

  // add option to the database

  async addOption(option) {
    try {
      let question = await QuestionModel.findById(option.questionId);
      if (!question) {
        return;
      }

      const newOption = new OptionModel(option);
      const result = await newOption.save();
      await QuestionModel.findByIdAndUpdate(option.questionId, {
        $push: { options: result._id },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  // find question by id from the database

  async findQuestionById(id) {
    try {
      return await QuestionModel.findById(id);
    } catch (error) {
      throw error;
    }
  }

  // delete question by id in the database

  async delete(id) {
    try {
      return await QuestionModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }

  // get question by id with options

  async view(id) {
    try {
      const question = await QuestionModel.findById(id).populate({
        path: "options",
        select: "text votes link_to_vote",
      });

      return question;
    } catch (error) {
      throw error;
    }
  }
}
