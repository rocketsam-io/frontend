FROM node:18-alpine as build-stage

WORKDIR /app
RUN corepack enable
RUN corepack prepare pnpm@8.6.10 --activate

RUN npm config set registry https://registry.npmmirror.com

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

ARG VITE_DEV
ARG VITE_ACTIVE_CHAINS
ARG VITE_API
ARG VITE_DEFAULT_CHAIN
ARG VITE_BOOST
ARG VITE_FUEL
ARG VITE_SEASON

ENV VITE_DEV=$VITE_DEV
ENV VITE_ACTIVE_CHAINS=$VITE_ACTIVE_CHAINS
RUN echo VITE_ACTIVE_CHAINS
ENV VITE_API=$VITE_API
ENV VITE_DEFAULT_CHAIN=$VITE_DEFAULT_CHAIN
ENV VITE_BOOST=$VITE_BOOST
ENV VITE_FUEL=$VITE_FUEL
ENV VITE_SEASON=$VITE_SEASON

RUN pnpm build

FROM nginx:stable-alpine as production-stage
RUN rm -rf /etc/nginx/conf.d
RUN mkdir -p /etc/nginx/conf.d
COPY ./default.conf /etc/nginx/conf.d/
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]