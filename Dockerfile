FROM node:18-alpine
WORKDIR /src
COPY ..
RUN npm install
EXPOSE 8080
CMD ['npm', 'run', 'start']