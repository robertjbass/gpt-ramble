import express from "express";
import { Configuration, OpenAIApi } from "openai";
import { IGPT3Response } from "./types/openAiTypes";
import { textCompleteSample, tldrSample } from "./samples/samplePrompts";
import * as dotenv from "dotenv";
dotenv.config();
const { PORT, OPENAI_API_KEY } = process.env;
const app = express();

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const promptGPT = async (
  promptValue: string,
  type: "tldr" | "complete"
): Promise<string> => {
  const append = type === "tldr" ? "\n\nTl;dr" : "\n";
  const prompt = [promptValue, append].join("");

  const response: IGPT3Response = (await openai.createCompletion({
    model: "text-davinci-002",
    prompt,
    temperature: 0.9,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.6,
    // stop: [" Human:", " AI:"],
  })) as any;

  console.log(response.data.choices);

  return response.data.choices[0].text;
};

//! DEBUG
console.log(typeof [textCompleteSample, tldrSample]);
//! DEBUG

(async () => {
  // const value = await promptGPT(textCompleteSample, "complete");
  const value = await promptGPT(tldrSample, "tldr");
  console.log({ value });
})();

app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
