FROM node:16

WORKDIR /usr/src/app

COPY package-lock.json package-lock.json

COPY package.json package.json

# Change npm ci to npm install since we are going to be in development mode
RUN npm install
ENV DANGEROUSLY_DISABLE_HOST_CHECK=true

# npm start is the command to start the application in development mode
CMD ["npm", "start"]