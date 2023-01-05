FROM node:13-alpine

RUN mkdir -p /Documents/bugzilla/client

WORKDIR  /Documents/bugzilla/client

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
