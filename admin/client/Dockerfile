FROM node:10

COPY . /var/www
WORKDIR /var/www

RUN npm install

ENTRYPOINT [ "npm", "start" ]