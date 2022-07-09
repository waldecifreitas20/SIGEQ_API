FROM node:alpine
<<<<<<< HEAD
ENV PORT=8000
WORKDIR /SIGEQ_SQLIZE_POSTGRES
COPY . .
RUN npm install bcryptjs dotenv express jsonwebtoken pg sequelize
CMD [ "node", "src/app.js" ]
=======
WORKDIR /usr/api
COPY package*.json ./
RUN npm install
COPY . .
>>>>>>> 56f930ba52b5691020ec8e80f73ffd1113c55bc8
