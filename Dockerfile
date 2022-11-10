FROM node:lts-alpine AS build_app

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Copy build result to a new image.
# This saves a lot of disk space.
FROM node:lts-alpine
RUN npm install -g http-server
COPY --from=build_app /app/dist /app

WORKDIR /app

EXPOSE 8080

CMD [ "http-server", "dist" ]