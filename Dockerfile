FROM node

RUN mkdir /app
WORKDIR /app
RUN npm install -g yarn
RUN yarn global add nodemon
COPY ./server/package.json /app/package.json
RUN yarn install

COPY ./server/server.js /app/server.js
COPY ./server/bin /app/bin
COPY ./server/routes /app/routes
COPY ./frontend/dist /app/public

EXPOSE 3000
CMD [ "npm", "start" ]