import { Agentica } from "@agentica/core";
import dotenv from "dotenv";
import { OpenAI } from "openai";
import typia from "typia";

import { GoogleShoppingService } from "@wrtnlabs/connector-google-shopping";

dotenv.config();

export const agent = new Agentica({
  model: "chatgpt",
  vendor: {
    api: new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    }),
    model: "gpt-4o-mini",
  },
  controllers: [
    {
      name: "GoogleShopping Connector",
      protocol: "class",
      application: typia.llm.application<GoogleShoppingService, "chatgpt">(),
      execute: new GoogleShoppingService({
        serpApiKey: process.env.SERP_API_KEY!,
      }),
    },
  ],
});

const main = async () => {
  console.log(await agent.conversate("What can you do?"));
};

main();
