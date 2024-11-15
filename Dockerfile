FROM mcr.microsoft.com/playwright:v1.39.0-focal

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Install Playwright browsers
RUN npx playwright install

# Set the command to run tests
CMD ["npx", "playwright", "test"]