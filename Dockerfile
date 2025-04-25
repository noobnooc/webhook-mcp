# Stage 1: Build the project
FROM node:22-slim AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies, ignoring scripts to avoid running prepare early
RUN npm install --ignore-scripts

# Copy the rest of the source code
COPY src ./src
COPY tsconfig.json ./

# Now run the build
RUN npm run build

# Stage 2: Set up production environment
FROM node:22-slim

# Set working directory
WORKDIR /app

# Copy the build output and package files from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

# Install only production dependencies
RUN npm install --omit=dev --ignore-scripts

# Define environment variable for webhook URL
ENV WEBHOOK_URL="your-webhook-url"

# Command to run the MCP server
ENTRYPOINT ["node", "dist/index.js"]