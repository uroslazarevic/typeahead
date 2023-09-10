FROM node:18-alpine

# Set work directory
WORKDIR /app

# Add package.json and yarn.lock before anything else (improves caching)
COPY package.json yarn.lock /app/

# Install packages
RUN yarn install --pure-lockfile

# Copy files
COPY . .