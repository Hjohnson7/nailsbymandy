# Dockerfile for React Frontend

# Use the official Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application into the container
COPY . .

# Build the React app
RUN npm run build

# Serve the build using an HTTP server
RUN npm install -g serve

# Expose port 3000 (or whichever port you're serving the frontend on)
EXPOSE 3000

# Serve the app
CMD ["serve", "-s", "build"]
