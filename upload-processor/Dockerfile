FROM node:10

RUN npm install pm2 -g

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

CMD [ "pm2-runtime", "start", "npm", "--", "start" ]