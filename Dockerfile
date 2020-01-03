FROM node:lts-alpine

RUN rm -f package-lock.json \
    ; rm -rf node_modules \
    ; npm config set registry "https://registry.npm.taobao.org/" \
    && npm install

EXPOSE 8000
