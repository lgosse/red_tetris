FROM  node:alpine

WORKDIR /var/html/app/red_tetris

ENV   CHOKIDAR_USEPOLLING=true RED_TETRIS_SERVER_HOST='0.0.0.0' RED_TETRIS_SERVER_PORT=3004 RED_TETRIS_DB_HOST='database' RED_TETRIS_ENV='correction'

COPY  . .

# Copying params file
COPY ./params.${RED_TETRIS_ENV}.js ./params.js

# Getting yarn & installing dependencies
RUN		apk update && apk add yarn && chmod 770 . && yarn

CMD   yarn client-dist && yarn srv-dist && node dist/server/main.js

# It requires your app to listen on the port 3004
EXPOSE  3004
