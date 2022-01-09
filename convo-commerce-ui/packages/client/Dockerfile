# Build
FROM node:16-alpine3.11 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . ./
ARG CUSTOM_ENV
ARG SERVER_URL
RUN yarn install --silent
RUN SERVER_URL=$SERVER_URL CUSTOM_ENV=$CUSTOM_ENV yarn run build

#Run
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

