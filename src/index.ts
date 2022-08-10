// import express from 'express';
// const app = express();
// const PORT = process.env.PORT || 3000;

import { Configuration, OpenAIApi } from 'openai';
import { IGPT3Response } from './types/openAiTypes';
import * as dotenv from 'dotenv';
dotenv.config();
const apiKey = process.env.OPENAI_API_KEY;

import { getUserInput } from './userInput/readline';

const configuration = new Configuration({ apiKey });
const openai = new OpenAIApi(configuration);

let promptHistory = '';

const promptModel = (question: string) => {
  getUserInput(question).then(async (answer) => {
    const response = await promptGPT((promptHistory + answer) as string);
    promptModel(`DUCK: ${response}\n> `);
  });
};

promptModel('Ask your ducky a question: ');

const promptGPT = async (promptValue: string): Promise<string> => {
  const prompt = `You: ${promptValue}\nFriend:`;
  const r: IGPT3Response = (await openai.createCompletion({
    model: 'text-davinci-002',
    prompt,
    temperature: 0.5,
    max_tokens: 60,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0,
    stop: ['You:'],
  })) as any;

  const response = r.data.choices[0].text.replace(/\n/g, '');
  promptHistory += `${prompt}${response}`;
  return response;
};

// app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
