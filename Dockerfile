FROM node:20-alpine

WORKDIR /app

# Copy package.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application files
COPY . .

# Expose the port 
EXPOSE 5174

# Command to run app
CMD ["npm", "run", "dev"]