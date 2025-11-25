# ---------- 1. BASE IMAGE ----------
FROM node:20-alpine AS base

# PNPM installation
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# ---------- 2. DEPENDENCIES LAYER ----------
FROM base AS deps

# Copy root manifests
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./

# Copy workspace package.json files only
COPY mf-shell/package.json ./mf-shell/
COPY mf-home-profile/package.json ./mf-home-profile/

# Install ALL workspace deps
RUN pnpm install --frozen-lockfile

# ---------- 3. BUILDER LAYER ----------
FROM deps AS builder

# Copy all project sources
COPY . .

# Build all workspaces
RUN pnpm build:all

# ---------- 4. RUNTIME LAYER ----------
FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy built apps + node_modules only
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/mf-shell/.next ./mf-shell/.next
COPY --from=builder /app/home-profile/.next ./home-profile/.next
COPY --from=builder /app/mf-shell ./mf-shell
COPY --from=builder /app/mf-home-profile ./mf-home-profile

EXPOSE 3000

# Default command – run Shell
CMD ["pnpm", "--filter", "mf-shell", "start"]
