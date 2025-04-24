# Webhook MCP Server

A Model Context Protocol (MCP) server that sends webhook notifications when called.

## Configuration

### Cursor

Add the following to your Cursor settings:

```json
{
  "modelContextProtocol.servers": {
    "notification": {
      "command": "npx",
      "args": ["webhook-mcp"],
      "env": {
        "WEBHOOK_URL": "your-webhook-url-here"
      }
    }
  }
}
```

### Claude

Configure Claude to use the MCP server by adding this to your Claude configuration:

```json
{
  "mcp": {
    "notification": {
      "command": "npx webhook-mcp",
      "environment": {
        "WEBHOOK_URL": "your-webhook-url-here"
      }
    }
  }
}
```

### Windsurf

In your Windsurf configuration file, add:

```json
{
  "mcpServers": {
    "notification": {
      "command": "npx",
      "args": ["webhook-mcp"],
      "environment": {
        "WEBHOOK_URL": "your-webhook-url-here"
      }
    }
  }
}
```

### VS Code

Add the following configuration to your VS Code `settings.json`:

```json
{
  "mcp": {
    "servers": {
      "notification": {
        "command": "npx",
        "args": ["webhook-mcp"],
        "env": {
          "WEBHOOK_URL": "your-webhook-url-here"
        }
      }
    }
  }
}
```

## Environment Variables

- `WEBHOOK_URL` (required): The URL where webhook notifications will be sent

## Development

To build the project:

```bash
npm install
npm run build
```

To run with the MCP inspector for debugging:

```bash
npm run inspector
```

## Publishing

To build and publish the package:

```bash
npm run publish
```
