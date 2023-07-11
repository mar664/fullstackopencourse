FROM node:16 as base

WORKDIR /usr/src/app

COPY . .

ENV REACT_APP_BACKEND_URL=http://localhost:3000

FROM base as test
RUN npm ci
COPY . .
RUN CI=true npm run test

FROM base as prod
RUN npm ci --production
RUN npm run build
COPY . .
RUN npm install -g serve
CMD ["serve", "build"]