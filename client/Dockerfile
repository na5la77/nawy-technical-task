# Use the official Node.js 18 image as the base
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the Next.js application
RUN npm run build

# Use a minimal base image to serve the built application
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only the built files and necessary resources from the builder stage
COPY --from=builder /app/package.json /app/package-lock.json /app/
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public
COPY --from=builder /app/next.config.ts /app/next.config.ts

# Install only production dependencies
RUN npm install --production

# Expose the application port
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
