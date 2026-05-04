import { GoogleGenAI } from "@google/genai";
import cosineSimilarity from "compute-cosine-similarity";

export function initGoogleGenAI() {
  const apiKey = process.env.GOOGLE_API_KEY;
  const ai = new GoogleGenAI({ apiKey: apiKey! });
  return ai;
}

export async function generateEmbedding(text: string) {
  const ai = initGoogleGenAI();
  const embeddingModel = process.env.EMBEDDING_MODEL || "gemini-embedding-2";

  const response = await ai.models.embedContent({
    model: embeddingModel,
    contents: text,
  });

  console.log(response.embeddings);
  return response.embeddings?.[0]?.values;
}

export function computeCosineSimilarity(
  embedding1: number[],
  embedding2: number[],
) {
  const similarity = cosineSimilarity(embedding1, embedding2);
  console.log(`Similarity: ${similarity!.toFixed(4)}`);

  return similarity;
}

export async function rewriteContent(text: string) {
    const prompt = `
Rewrite the following text into a more engaging and polished social media post.

- Keep it concise
- Make it sound natural and human
- Improve clarity and flow
- Do not change the original meaning

Text:
"${text}"
`;
  const ai = initGoogleGenAI();
  const genreativeModel = process.env.GENERATIVE_MODEL || "gemini-2.5-flash";
  const response = await ai.models.generateContent({
    model: genreativeModel,
    contents: prompt,
  });
  console.log(response.text);
  return response.text;
}
