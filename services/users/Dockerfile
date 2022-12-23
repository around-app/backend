FROM node:14-alpine

COPY ./libs ./build/libs

COPY ./services/users ./build/services/users

WORKDIR /build/services/users

RUN npm install --no-package-lock

CMD ["npm", "run", "start"]
