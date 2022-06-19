FROM node:alpine
ENV PORT=8000
WORKDIR /SIGEQ_SQLIZE_POSTGRES
COPY . .
RUN npm install bcryptjs dotenv express jsonwebtoken pg sequelize
CMD [ "node", "src/app.js" ]