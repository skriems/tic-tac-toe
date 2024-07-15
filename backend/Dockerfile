FROM node:20-alpine AS base

FROM base as deps
WORKDIR /app
COPY . .
RUN npm install

FROM deps AS dev
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules /app/node_modules

FROM deps AS build
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules /app/node_modules
RUN npm run build

EXPOSE 8000
CMD [ "npm", "start" ]
