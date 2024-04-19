# Select base image
FROM node:21-alpine as builder

# Create app directory in Docker
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN yarn install --pure-lockfile --production=false --no-cache

# Clear the Yarn cache to free up space
RUN yarn cache clean

# Production stage
FROM node:21-alpine
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules

# Bundle app source
COPY package*.json ./
COPY ./src ./src
COPY ./scripts ./scripts
COPY ./tsconfig* ./

# After copying your application code into the image
#RUN chown -R node:node /app

# Switch user
#USER node

ARG PORT0
ARG PORT1
ENV PORT0=$PORT0
ENV PORT1=$PORT1

# Disable Next telemetry
ENV NEXT_TELEMETRY_DISABLED=1
# EXPOSE instruction to have it mapped by the docker daemon
EXPOSE $PORT0
EXPOSE $PORT1

# Define the command to run app
CMD yarn prod 