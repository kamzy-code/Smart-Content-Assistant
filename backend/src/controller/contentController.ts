import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/httpError.js";
import { generateEmbedding, rewriteContent } from "../utils/gemini.js";
import { ContentSchema } from "../models/content.js";
import contentService from "../service/contentService.js";

class ContentController {
  public async saveContent(req: Request, res: Response, next: NextFunction) {
    // Implementation for saving content
    const { text } = req.query;

    if (!text) {
      throw new HttpError(400, "submit a valid input sentence");
    }

    try {
      const embedding = await generateEmbedding(text as string);

      await ContentSchema.create({ text: text as string, embedding });
      res.status(200).json({ message: "Content saved successfully" });
    } catch (error) {
      next(error);
    }
  }

  public async searchContent(req: Request, res: Response, next: NextFunction) {
    // Implementation for semantic search
    const { query } = req.query;

    if (!query) {
      throw new HttpError(400, "submit a valid search query");
    }

    try {
      const queryEmbedding = await generateEmbedding(query as string);

      const similarities = await contentService.findSimilarContent(
        queryEmbedding!,
        query as string,
      );

      console.log(similarities);
      res.status(200).json({ content: similarities });
    } catch (error) {
      next(error);
    }
  }

  public async rewriteContent(req: Request, res: Response, next: NextFunction) {
    const { text } = req.query;

    if (!text) {
      throw new HttpError(400, "submit a valid input sentence");
    }

    try {
      const rewrite = await rewriteContent(text as string);
      res.status(200).json({ content: rewrite });
    } catch (error) {
      next(error);
    }
  }
}

const contentController = new ContentController();
export default contentController;
