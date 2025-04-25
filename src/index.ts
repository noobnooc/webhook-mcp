#!/usr/bin/env node

import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const webhookUrl = process.env.WEBHOOK_URL;

if (!webhookUrl) {
  throw Error("WEBHOOK_URL is not defined");
}

// Create an MCP server
const server = new McpServer({
  name: "WebhookMCP",
  version: "0.0.1",
});

// Add an addition tool
server.tool(
  "call-webhook",
  "Call a webhook with optional `message` and `url` parameters",
  {
    // In the inspector, empty values are `null`
    message: z.union([z.string().optional(), z.null()]),
    url: z.union([z.string().url(), z.string().optional(), z.null()]),
  },
  async ({ message, url }) => {
    const webhookUrl = process.env.WEBHOOK_URL;

    await fetch(webhookUrl!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...(message && { message }),
        ...(url && { externalLink: url }),
      }),
    });

    return {
      content: [{ type: "text", text: "Webhook called successfully" }],
    };
  }
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
