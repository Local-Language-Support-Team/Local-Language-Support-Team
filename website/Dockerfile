FROM node:19.4.0
WORKDIR /app
COPY package.json /app

COPY package-lock.json /app
RUN npm install
#COPY src /app/src
#COPY public /app/public
COPY . /app
EXPOSE 3000
CMD ["yarn", "start"]