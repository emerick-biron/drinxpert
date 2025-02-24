################ Build stage ################
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --legacy-peer-deps 

COPY . .

RUN npm run build

############## Production stage ##############
FROM nginx:1.26-alpine

WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist .
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
