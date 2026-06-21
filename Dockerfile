# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

ARG BASE_API_URL="https://api-dev-phoenix.monnykapin.com/api/v1"
ARG VITE_LOGIN_URL=""
ENV BASE_API_URL=$BASE_API_URL
ENV VITE_LOGIN_URL=$VITE_LOGIN_URL

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine AS runner

COPY --from=builder /app/dist /usr/share/nginx/html

# Handle client-side routing (React Router)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
