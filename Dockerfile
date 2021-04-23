FROM node:14

# Create app directory
WORKDIR /kilani/aostest

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json package-lock.json /kilani/aostest/

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . /kilani/aostest

EXPOSE 4000
CMD [ "npm", "start" ]
