# Installer
FROM node:20-alpine AS installer

WORKDIR /usr/src/app/

COPY --chown=node:node package*.json ./

RUN npm install --legacy-peer-deps

# Build
FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY --chown=node:node --from=installer /usr/src/app /usr/src/app
COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production

RUN npm ci --only=production --legacy-peer-deps && npm cache clean --force

USER node

# Run
FROM node:20-alpine AS production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

EXPOSE 3000
CMD [ "node", "dist/main.js" ]