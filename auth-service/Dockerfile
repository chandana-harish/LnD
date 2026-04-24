# FROM node:18-alpine
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 3001
# CMD ["npm", "start"]

# -------- BUILD STAGE --------
FROM node:20-alpine AS builder
 
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
 
# -------- RUN STAGE --------
FROM node:20-alpine
 
WORKDIR /app
 
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
 
COPY --from=builder /app /app
RUN chown -R appuser:appgroup /app
 
USER appuser
 
EXPOSE 3001
CMD ["npm", "start"]