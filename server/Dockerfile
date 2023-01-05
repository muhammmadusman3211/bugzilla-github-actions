FROM node:13-alpine



RUN mkdir -p /Documents/bugzilla/server

WORKDIR  /Documents/bugzilla/server

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8000

CMD ["node", "/Documents/bugzilla/server/app.js"]
