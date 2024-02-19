import QuestionsModel from "./questions.model.js";
import QuestionsRepository from "./questions.repository.js";
import OptionsModel from "../options/options.model.js";

export default class QuestionsController {
  constructor() {
    this.questionsRepository = new QuestionsRepository();
  }

  // view question by it's id

  async viewQuestion(req, res, next) {
    try {
      const id = req.params.id;

      const question = await this.questionsRepository.findQuestionById(id);

      if (!question) {
        return res.status(404).send("Question not found");
      }

      const result = await this.questionsRepository.view(id);
      if (result) {
        return res.status(200).send(result);
      } else {
        return res.status(500).send("Something went wrong");
      }
    } catch (error) {
      next(error);
    }
  }

  // create question

  async createQuestion(req, res, next) {
    try {
      const title = req.body.title;

      if (!title) {
        return res.status(400).send("Please provide a title for the question.");
      }

      const question = new QuestionsModel(title);

      const result = await this.questionsRepository.add(question);

      if (result) {
        return res.status(201).send(result);
      } else {
        return res.status(400).send("Error creating question");
      }
    } catch (error) {
      next(error);
    }
  }

  // create option by question id

  async createOption(req, res, next) {
    try {
      const questionId = req.params.id;

      const text = req.body.text;

      if (!text) {
        return res.status(400).send("Please provide a option.");
      }

      const option = new OptionsModel(questionId, text);

      const result = await this.questionsRepository.addOption(option);

      if (result) {
        return res.status(201).send(result);
      } else {
        return res.status(400).send("Error creating option");
      }
    } catch (error) {
      next(error);
    }
  }

  // delete question if no option exists

  async deleteQuestion(req, res, next) {
    try {
      const id = req.params.id;

      const question = await this.questionsRepository.findQuestionById(id);

      if (!question) {
        return res.status(404).send("Question not found");
      }

      if (question.options.length > 0) {
        return res
          .status(400)
          .send("Question cannot be deleted because it has option(s)");
      }

      const result = await this.questionsRepository.delete(id);

      if (result) {
        return res.status(200).send("Deleted Successfully");
      } else {
        return res.status(500).send("Something went wrong");
      }
    } catch (error) {
      next(error);
    }
  }
}
