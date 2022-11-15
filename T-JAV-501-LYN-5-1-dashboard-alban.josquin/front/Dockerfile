FROM node:18
WORKDIR /app
COPY package.json .
RUN npm install
WORKDIR /app/front
COPY . .
RUN ls
CMD npm start
