# Select base image
FROM node:21-alpine as builder

WORKDIR /app

COPY package.json ./

RUN yarn install --frozen-lockfile --production=false

# Clear the Yarn cache to free up space
RUN yarn cache clean
#RUN rm -rf /usr/local/share/.cache/yarn

# Production stage
FROM node:21-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules

COPY package.json ./
COPY src ./src
COPY init ./init
COPY scripts ./scripts
COPY public ./public
COPY tsconfig.json ./
COPY next.config.mjs ./
COPY tailwind.config.js ./
COPY postcss.config.js ./

# After copying your application code into the image
#RUN chown -R node:node /app

# Switch user
#USER node

ARG PORT
ARG NEXT_PUBLIC_SERVER_PORT0
ARG NEXT_PUBLIC_SERVER_PORT1
ARG NEXT_PUBLIC_SERVER_URL
ENV PORT=$PORT
ENV NEXT_PUBLIC_SERVER_PORT0=$NEXT_PUBLIC_SERVER_PORT0
ENV NEXT_PUBLIC_SERVER_PORT1=$NEXT_PUBLIC_SERVER_PORT1
ENV NEXT_PUBLIC_SERVER_PORT1=$NEXT_PUBLIC_SERVER_URL

# Disable Next telemetry
ENV NEXT_TELEMETRY_DISABLED=1
# EXPOSE instruction to have it mapped by the docker daemon
EXPOSE $PORT

# Define the command to run app
CMD yarn prod
