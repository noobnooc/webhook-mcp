# Use Node.js image as the base
FROM node:22-slim

# Create and set working directory
WORKDIR /app

# Environment variable for the webhook URL will be provided at runtime
ENV WEBHOOK_URL=""

# Run the webhook-mcp server
CMD ["npx", "-y", "webhook-mcp"]