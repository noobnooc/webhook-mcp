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
server.tool("call-webhook", {}, async ({}) => {
  const webhookUrl = process.env.WEBHOOK_URL;

  await fetch(webhookUrl!);

  return {
    content: [],
  };
});

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
