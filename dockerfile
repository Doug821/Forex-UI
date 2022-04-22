FROM node

RUN mkdir -p /app

WORKDIR /app

COPY package*.json /app

RUN yarn install

COPY . /app

EXPOSE 3001

CMD ["yarn", "dev"]
