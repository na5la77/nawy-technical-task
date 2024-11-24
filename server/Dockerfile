FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine AS production

WORKDIR /app

COPY package*.json ./
COPY --from=build /app/.env ./.env

RUN npm install --only=production
COPY --from=build /app/dist ./dist

EXPOSE 5000

CMD ["node", "dist/main"]
