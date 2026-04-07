# Vercel Environment Setup Guide

## Setup en Vercel Dashboard

1. Ve a tu proyecto en [vercel.com](https://vercel.com)
2. Click en **Settings** → **Environment Variables**
3. Agrega estas 3 variables exactamente como están:

```
EMAILJS_SERVICE_ID = service_xnb954l
EMAILJS_TEMPLATE_ID = template_7b91tyo
EMAILJS_PUBLIC_KEY = CGWsTtrwvnr3XuUWU
```

4. Click en **Save**
5. Trigger un nuevo deploy (push a GitHub o manual)

## Cómo funciona

1. **GitHub**: Contains `environment.ts` y `environment.prod.ts` with placeholder values (safe to commit)
2. **Vercel Dashboard**: Has the real credentials in Environment Variables
3. **Build Process**: 
   - `npm run build` executes
   - `scripts/set-env.js` runs first
   - Reads env vars from Vercel
   - Generates `environment.prod.ts` with real values
   - Angular compiles with real credentials

## Setup Local (para desarrollo)

1. Actualiza los archivos con tus credenciales reales:
   - `src/environments/environment.ts`
   - `src/environments/environment.prod.ts`

2. Git no trackeará cambios en esos archivos:
   ```bash
   git update-index --assume-unchanged src/environments/environment.ts
   git update-index --assume-unchanged src/environments/environment.prod.ts
   ```

3. Para volver a trackear (si necesitas):
   ```bash
   git update-index --no-assume-unchanged src/environments/environment.ts
   git update-index --no-assume-unchanged src/environments/environment.prod.ts
   ```

## Archivos Importantes

- `scripts/set-env.js` → Script que genera env files para Vercel
- `src/environments/environment.ts` → Dev local
- `src/environments/environment.prod.ts` → Production (sobrescrito por Vercel)
- `package.json` → Build command incluye `node scripts/set-env.js`

## Build Command en Vercel

El build command ya está configurado automáticamente:
```
npm run build
```

Vercel ejecutará este comando en cada deploy.
