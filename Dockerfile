# Stage 1: Build
FROM node:lts-alpine AS builder

WORKDIR /app

ARG BASE_API_URL
ENV BASE_API_URL=$BASE_API_URL

# Install dependencies first (cached unless package*.json changes)
COPY package*.json ./
RUN npm ci --prefer-offline

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine AS runner

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

# Handle client-side routing (React Router)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Runtime env injection script
COPY env.sh /docker-entrypoint.d/40-env.sh

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
