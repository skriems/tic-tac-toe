FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS deps
COPY . /app
WORKDIR /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install

FROM deps AS dev
WORKDIR /app
COPY --from=deps /app /app

FROM deps as build
WORKDIR /app
COPY --from=deps /app /app
RUN pnpm run build

EXPOSE 5173
CMD [ "pnpm", "start" ]
