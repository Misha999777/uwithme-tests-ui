FROM nginx:1.23.3

RUN rm -r /usr/share/nginx/html/*

COPY ./dist /usr/share/nginx/html

COPY ./image/nginx.conf /etc/nginx/conf.d/default.conf
