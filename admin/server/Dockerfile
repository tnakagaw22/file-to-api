FROM node:10

ENV NODE_ENV=development
ENV PORT=5000

COPY . /var/www
WORKDIR /var/www

RUN npm install

# VOLUME [ "/var/www" ]

EXPOSE $PORT

ENTRYPOINT [ "npm", "start" ]