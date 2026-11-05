FROM nginx:1.27-alpine

EXPOSE 8091

COPY ./image/nginx.conf /etc/nginx/conf.d/default.conf

RUN rm /usr/share/nginx/html/index.html
COPY ./dist /usr/share/nginx/html

WORKDIR /usr/share/nginx/html
