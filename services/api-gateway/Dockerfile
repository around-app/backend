FROM node:14-alpine

COPY ./libs ./build/libs

COPY ./services/api-gateway ./build/services/api-gateway

WORKDIR /build/services/api-gateway

RUN npm install --no-package-lock

CMD ["npm", "run", "start"]
