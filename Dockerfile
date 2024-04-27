# syntax=docker/dockerfile:1

FROM node:20.11.1-alpine

WORKDIR /app

# Install app dependencies by copying package files and running npm install
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy dist folder and public folder
COPY ./dist ./dist
COPY ./public/ ./public

# Set the appropriate permissions
USER root
RUN chown -R node:node /app
RUN chown -R node:node /app/public
# Use the node user
USER node

# Expose the port that the application listens on.
EXPOSE 8080

# Run the application.
CMD node dist/server.js
