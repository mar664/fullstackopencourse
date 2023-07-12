FROM node:16 as base

WORKDIR /usr/src/app

COPY . .

FROM base as test
WORKDIR /usr/src/app
COPY --from=base /usr/src/app /usr/src/app
RUN npm ci
RUN CI=true npm run test

FROM base as prod
WORKDIR /usr/src/app
COPY --from=base /usr/src/app /usr/src/app
RUN npm ci --production
CMD npm start