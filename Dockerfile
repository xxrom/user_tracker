# Select base image
FROM node:20-alpine

# Create app directory in Docker
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
COPY yarn.lock ./

COPY ./frontend/package*.json ./frontend/
COPY ./backend/package*.json ./backend/

# Install app dependencies
RUN yarn install --pure-lockfile 
# --production=false

# Bundle app source
COPY . .

# After copying your application code into the image
#RUN chown -R node:node /app

# Switch user
#USER node

ARG PORT
ARG PORT0
ARG PORT1
ENV PORT=$PORT
ENV PORT0=$PORT0
ENV PORT1=$PORT1

# Disable Next telemetry
ENV NEXT_TELEMETRY_DISABLED=1
# EXPOSE instruction to have it mapped by the docker daemon
EXPOSE $PORT
EXPOSE $PORT0
EXPOSE $PORT1

# Define the command to run app
CMD yarn prod 