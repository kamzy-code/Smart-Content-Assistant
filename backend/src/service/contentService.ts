import { ContentSchema } from "../models/content.js";
import { computeCosineSimilarity } from "../utils/gemini.js";

class ContentService {
  public async getAllContent() {
    const content = await ContentSchema.find();
    return content;
  }

  public async findSimilarContent(queryEmbedding: number[], queryText: string) {
    const allContent = await this.getAllContent();

    const similarities = allContent.map((content) => {
      const score = computeCosineSimilarity(queryEmbedding, content.embedding);

      return {
        text: content.text,
        score,
      };
    });

    const sorted = similarities.sort((a, b) => b.score! - a.score!);

    const topResults = sorted.slice(0, 5);

    const filtered = topResults.filter((item) => item.score! >= 0.6);

    // fallback if nothing passes threshold
    return filtered.length > 0
      ? filtered
      : topResults.filter((item) => item.score! >= 0.5);
  }
}

const contentService = new ContentService();
export default contentService;
