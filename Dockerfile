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
RUN apk update && apk add bash

COPY --from=build_app /app/dist/ /app
COPY --from=build_app /app/entrypoint.sh /

WORKDIR /app
EXPOSE 8080

RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]