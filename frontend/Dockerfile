from node:18

WORKDIR /usr/src/app

COPY /frontend/. /usr/src/app

RUN npm install -g @angular/cli

RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0"]