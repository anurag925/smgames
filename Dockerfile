# ============================
# Stage 1: Dependencies
# ============================
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci && npm cache clean --force

# ============================
# Stage 2: Builder
# ============================
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

# Generate Next.js build with standalone output
RUN npm run build

# ============================
# Stage 3: Runner (Production)
# ============================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy all node_modules from builder (includes tsx for WebSocket server)
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules

# Copy built artifacts from builder stage
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy WebSocket server files and source
COPY --from=builder --chown=nextjs:nodejs /app/server.ts ./
COPY --from=builder --chown=nextjs:nodejs /app/src ./src

# Set ownership and switch user
USER nextjs

# Expose ports
EXPOSE 3000 3001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

# Start both servers using the entrypoint script
ENTRYPOINT ["sh", "docker-entrypoint.sh"]
