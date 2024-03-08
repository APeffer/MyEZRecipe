# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.10.0

FROM node:${NODE_VERSION}-alpine as development

ENV NODE_ENV development

WORKDIR /frontend

COPY ./package*.json /frontend

RUN npm install

COPY . .

CMD ["npm","start"]
