# Select base image
FROM node:20-alpine

# Create app directory in Docker
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
#COPY yarn.lock ./

ARG PORT
ENV PORT=$PORT

# Disable Next telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Install app dependencies
RUN yarn install --pure-lockfile --production

# Bundle app source
COPY . .

# After copying your application code into the image
RUN chown -R node:node /app

# Switch user
USER node

# EXPOSE instruction to have it mapped by the docker daemon
EXPOSE $PORT

# Define the command to run app
CMD yarn build && yarn start -p ${PORT}