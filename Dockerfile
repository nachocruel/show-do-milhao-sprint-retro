FROM node:lts as dependencies
WORKDIR /show_milhao
COPY package.json package-lock.json ./
COPY .env ./
RUN npm ci

FROM node:lts as builder
WORKDIR /show_milhao
COPY . .
COPY --from=dependencies /show_milhao/node_modules ./node_modules
RUN npm run build

FROM node:lts as runner
WORKDIR /show_milhao
ENV NODE_ENV production
# If you are using a custom next.config.js file, uncomment this line.
# COPY --from=builder /my-project/next.config.js ./
COPY --from=builder /show_milhao/public ./public
COPY --from=builder /show_milhao/.next ./.next
COPY --from=builder /show_milhao/node_modules ./node_modules
COPY --from=builder /show_milhao/package.json ./package.json
COPY --from=builder /show_milhao/.env ./.env
EXPOSE 3000
CMD ["npm", "start"]