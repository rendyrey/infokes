# Use the official Bun image as the base image for the web server
FROM oven/bun:1.2.2 as bun

# Set the working directory
WORKDIR /app

# Copy package and lock files
# COPY bun.lock /app/
COPY package.json /app/
COPY entrypoint.sh /app/
RUN chmod +x /app/entrypoint.sh && chown root:root /app/entrypoint.sh

# Install dependencies using Bun
RUN bun install

# Copy the rest of the application code
COPY . /app/

# Expose the port for the Bun web server
EXPOSE 3000

# Command to run the Bun server
ENTRYPOINT ["/app/entrypoint.sh"]
