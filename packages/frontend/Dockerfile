# Use Bun official image
FROM oven/bun:1.2.2 AS build

WORKDIR /app

# Install required system packages
RUN apt-get update && apt-get install -y \
    procps \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package.json ./

# Install dependencies
RUN bun add -d vite
RUN bun install

# Copy project files
COPY . .

# Build the Vue application
RUN bun run build

# Expose the port to the host
EXPOSE 8080

# Run the Bun development server
CMD ["bun", "run", "dev", "--host", "0.0.0.0", "--port", "8080"]

# # Production stage
# FROM oven/bun:1.2.2-slim

# WORKDIR /app

# # Install required system packages in production
# RUN apt-get update && apt-get install -y \
#     procps \
#     && rm -rf /var/lib/apt/lists/*

# # Copy built files from build stage
# # COPY --from=build /app/.bun /app/.bun

# # Start the server
# CMD ["bun", "dev", "--port", "8080"]
