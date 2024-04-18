# Select base image
FROM node:20-alpine

# Create app directory in Docker
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN yarn install 
# --pure-lockfile 
# --production=false

# Bundle app source
COPY ./src ./src
COPY ./public ./public
COPY ./tsconfig* ./
COPY ./next* ./
COPY ./tailwind* ./
COPY ./postcss* ./

# After copying your application code into the image
#RUN chown -R node:node /app

# Switch user
#USER node

ARG PORT
ARG NEXT_PUBLIC_SERVER_PORT0
ARG NEXT_PUBLIC_SERVER_PORT1
ENV PORT=$PORT
ENV NEXT_PUBLIC_SERVER_PORT0=$NEXT_PUBLIC_SERVER_PORT0
ENV NEXT_PUBLIC_SERVER_PORT1=$NEXT_PUBLIC_SERVER_PORT1

# Disable Next telemetry
ENV NEXT_TELEMETRY_DISABLED=1
# EXPOSE instruction to have it mapped by the docker daemon
EXPOSE $PORT

# Define the command to run app
CMD yarn prod 