FROM node:10

COPY . /usr/src/app
WORKDIR /usr/src/app

RUN npm install

ENTRYPOINT [ "npm", "run", "dev" ]
# RUN npm install pm2 -g

# # Create app directory
# WORKDIR /usr/src/app

# # Install app dependencies
# COPY package*.json ./
# RUN npm install

# # Bundle app source
# COPY . .

# CMD [ "pm2-runtime", "start", "npm", "--", "start" ]