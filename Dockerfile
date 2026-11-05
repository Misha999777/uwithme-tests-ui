FROM joseluisq/static-web-server:2.44-alpine
EXPOSE 8091

ENV SERVER_PORT=8091
ENV SERVER_ROOT=/app
ENV SERVER_FALLBACK_PAGE=/app/index.html

COPY ./dist /app
