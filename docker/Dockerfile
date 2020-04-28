FROM node:14.0.0-slim AS base
RUN apt-get update && \
    apt-get -qy install openssl

WORKDIR /app
COPY package.json ./

#
# ----- Installing Dependecies ----- #
FROM base AS dependencies
RUN yarn install --production
RUN cp -R node_modules node_modules_production
RUN yarn

#
# ----- Building Application ----- #
FROM base AS builder
COPY --from=dependencies /app/node_modules ./node_modules
COPY babel.config.js ./
COPY src ./src
COPY libs ./libs
RUN yarn build

#
# ----- Launching Release ----- #
FROM base AS release
COPY --from=dependencies /app/node_modules_production ./node_modules
COPY --from=builder /app/.dist ./
COPY prisma ./prisma
RUN yarn generate:prisma
EXPOSE 80
CMD ["node", "main.js"]