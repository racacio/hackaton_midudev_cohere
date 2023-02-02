import {
  COHERE_LABEL_ECONOMY,
  COHERE_LABEL_TECHNOLOGY,
} from "@/common/constants/cohereai";
import {
  COHERE_API_DETECT_LANGUAGE_URL,
  COHERE_API_KEY,
  COHERE_API_GENERATE_URL,
  COHERE_API_CLASSIFY_URL,
  COHERE_LABEL_HEALTH,
} from "@/common/constants/cohereai";

import { iResultClassify } from "@/common/interfaces/cohereia";

export const checkIsEnglish = async (input: string): Promise<boolean> => {
  const data = {
    texts: [input],
  };

  const { results } = await fetch(COHERE_API_DETECT_LANGUAGE_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `BEARER ${COHERE_API_KEY}`,
      "Content-Type": "application/json",
      "Cohere-Version": "2022-12-06",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

  const [{ language_code }] = results;
  return language_code === "en";
};

export const correctTranscription = async (input: string): Promise<string> => {
  const data = {
    model: "xlarge",
    prompt: `This is voice-to-text transcription corrector. Given a transcribed excerpt with errors, the model responds with the correct version of the excerpt.
  --
  Incorrect transcription: I am balling into hay to read port missing credit card. I lost by card when I what's at the grocery store and I need to see sent a new one.
  Correct transcription: I am calling in today to report a missing credit card. I lost my card when I was at the grocery store and I need to be sent a new one.
  --
  Incorrect transcription: I am calling in today to report a missing credit card. I lost my card when I was at the grocery store and I need to be sent a new one.
  Correct transcription: Can you repeat the dates for the three and five dear fixed mortgages? I want to compare them a gain the dates I was quoted by a other broker.
  --
  Incorrect transcription: "${input}"
  Correct transcription:`,
    max_tokens: 40,
    temperature: 0.5,
    k: 0,
    p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop_sequences: ["--"],
    return_likelihoods: "NONE",
  };

  const response = await fetch(COHERE_API_GENERATE_URL, {
    method: "POST",
    headers: {
      Authorization: `BEARER ${COHERE_API_KEY}`,
      "Content-Type": "application/json",
      "Cohere-Version": "2022-12-06",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

  const { text } = response.generations[0];
  return text.replace("--", "").replaceAll('"', "").trim();
};

export const emailCopy = async (input: string): Promise<string> => {
  const data = {
    model: "xlarge",
    prompt: `This email writing program can generate full emails from simple commands. Here are some examples:
  --
  Command: Thank Sid for the gift cards
  Email: Hey Sid, Thank you so much for the gift cards. I really appreciate it. I hope to see you soon. Best, Aidan.
  --
  Command: Invoice Nicole $500 for financial modeling
  Email: Dear Nicole, This is my invoice for $500 for the financial modeling. It was a pleasure to work with you. Sincerely, Dustin.
  --
  Command: Tell Kiyan that they made it to the next round
  Email: Hey Kiyan, You've moved forward to the next round of interviews. The team is looking forward to seeing you again. Sincerely, Nora.
  --
  Command: Ask Adrien for a coffee chat
  Email: Hey Adrien, Long time no see! Let's catch up and grab coffee. What's your schedule look like? Regards, Amr
  --
  Command: "${input}"
  Email:`,
    max_tokens: 100,
    temperature: 0.7,
    k: 0,
    p: 0.75,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop_sequences: ["--"],
    return_likelihoods: "NONE",
  };

  const response = await fetch(COHERE_API_GENERATE_URL, {
    method: "POST",
    headers: {
      Authorization: `BEARER ${COHERE_API_KEY}`,
      "Content-Type": "application/json",
      "Cohere-Version": "2022-12-06",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

  const { text } = response.generations[0];
  return text.replace("--", "").replaceAll('"', "").trim();
};

export const headlineMarketAnalysis = async (
  inputs: string[]
): Promise<iResultClassify[]> => {
  const data = {
    model: "large",
    inputs: inputs,
    examples: [
      {
        label: COHERE_LABEL_TECHNOLOGY,
        text: "New Era Begins at Warner Bros. Tinged with Nostalgia",
      },
      {
        label: COHERE_LABEL_TECHNOLOGY,
        text: "As Gas Prices Went Up, So Did the Hunt for Electric Vehicles",
      },
      {
        label: COHERE_LABEL_TECHNOLOGY,
        text: "Facial Recognition Goes to War",
      },
      {
        label: COHERE_LABEL_TECHNOLOGY,
        text: "US Says It Secretly Removed Malware Worldwide",
      },
      {
        label: COHERE_LABEL_TECHNOLOGY,
        text: "The Old-Timers Are Chasing Netflix",
      },
      {
        label: COHERE_LABEL_ECONOMY,
        text: "Few Cars, Lots of Customers: Why Autos Are an Inflation Risk",
      },
      {
        label: COHERE_LABEL_ECONOMY,
        text: "Supply Chains Widely Tainted by Forced Labour in China",
      },
      {
        label: COHERE_LABEL_ECONOMY,
        text: "The US Economy is Booming. Why are Economists Worrying About a Recession?",
      },
      {
        label: COHERE_LABEL_ECONOMY,
        text: "Industries hit hard by the pandemic continued their rebound",
      },
      {
        label: COHERE_LABEL_ECONOMY,
        text: "Energy prices in Europe soar 45 percent as inflation hits another record",
      },
      {
        label: COHERE_LABEL_HEALTH,
        text: "New Drug Slashed Deaths Among Patients With Severe Covid, Maker Claims",
      },
      { label: "Health", text: "Is 30 minutes of Exercise a Day Enough?" },
      {
        label: COHERE_LABEL_HEALTH,
        text: "With a $2.1 Million Cure Their Only Hope, Parents Plead for Help Online",
      },
      {
        label: COHERE_LABEL_HEALTH,
        text: "The FDA suspends use of a Glaxo antibody drug in the US as an Omnicron subvariant spreads",
      },
      { label: "Health", text: "What to know about the Bird Flu Outbreak" },
    ],
  };

  const response = await fetch(COHERE_API_CLASSIFY_URL, {
    method: "POST",
    headers: {
      Authorization: `BEARER ${COHERE_API_KEY}`,
      "Content-Type": "application/json",
      "Cohere-Version": "2022-12-06",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

  const { classifications } = response;
  const result: iResultClassify[] = classifications;

  return result;
};
