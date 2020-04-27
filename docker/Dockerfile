FROM node:13.13.0-alpine AS base
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
EXPOSE 80
CMD ["node", "main.js"]