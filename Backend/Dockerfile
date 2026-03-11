FROM node:18-alpine

WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Expose backend port
EXPOSE 5000

# Start server
CMD ["npm", "start"]
