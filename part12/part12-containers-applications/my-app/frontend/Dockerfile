FROM node:16 as base

WORKDIR /usr/src/app

COPY package-lock.json package-lock.json
COPY package.json package.json
COPY src src
COPY public public

FROM base as test
WORKDIR /usr/src/app
COPY --from=base /usr/src/app /usr/src/app
RUN npm ci
RUN CI=true npm run test

FROM base as prod
WORKDIR /usr/src/app
COPY --from=base /usr/src/app /usr/src/app
RUN npm ci --production
RUN npm run build

FROM nginx:alpine

WORKDIR /app

COPY --from=prod /usr/src/app/build /app/static

COPY ./nginx.conf /etc/nginx/nginx.conf