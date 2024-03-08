# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.10.0

FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV production

WORKDIR /backend

COPY ./package*.json /backend

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
