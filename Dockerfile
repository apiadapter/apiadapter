FROM node
LABEL maintainer="https://github.com/apiadapter/core"
LABEL Description="core module for API Adapter"
LABEL name="API Adapter Core"
LABEL VERSION="0.1"

COPY package.json /src/package.json
RUN cd /src && npm install --loglevel error
RUN apt-get update
COPY . /src
WORKDIR /src
EXPOSE 8080
CMD npm start