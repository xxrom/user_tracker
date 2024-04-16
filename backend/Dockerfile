# Select base image
FROM node:20-alpine

# Create app directory in Docker
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
#COPY yarn.lock ./

ARG MONGO_URL 
ARG PORT0
ARG PORT1
ENV MONGO_URL=$MONGO_URL
ENV PORT0=$PORT0
ENV PORT1=$PORT1

# Install app dependencies
RUN yarn install --pure-lockfile --production
RUN yarn global add typescript@latest -g
RUN tsc --init

# Bundle app source
COPY . .

# After copying your application code into the image
RUN chown -R node:node /app

# Switch user
USER node

# EXPOSE instruction to have it mapped by the docker daemon
EXPOSE $PORT0
EXPOSE $PORT1

# Define the command to run app
CMD ["yarn", "prod"]