FROM node:alpine as node

RUN npm install -g @angular/cli

COPY ./ /app
WORKDIR /app
RUN npm install

RUN ng build --prod --base-href=./
#RUN mv /var/www/src/dist/* /var/www/html
#RUN rm -rf /var/www/src

WORKDIR /var/www/html

FROM nginx:alpine
COPY --from=node /app/dist/fightingHelper3/ /usr/share/nginx/html
