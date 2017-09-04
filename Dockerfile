FROM node

RUN mkdir /app
WORKDIR /app
COPY ./server/package.json /app/package.json
RUN npm install
RUN npm install -g nodemon

COPY ./server/server.js /app/server.js
COPY ./server/bin /app/bin
COPY ./server/routes /app/routes
COPY ./frontend/dist /app/public

EXPOSE 3000
CMD [ "npm", "start" ]