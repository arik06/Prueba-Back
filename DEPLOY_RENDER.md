# 🚀 Guía de Despliegue en Render

Esta guía te ayudará a desplegar tu API de Tareas en Render para que tu amigo pueda probarla desde Postman.

## 📋 Requisitos Previos

1. **Cuenta en Render**: Regístrate en [render.com](https://render.com) (es gratis)
2. **Repositorio Git**: Tu código debe estar en GitHub, GitLab o Bitbucket
3. **Node.js**: Render detectará automáticamente que es un proyecto Node.js

---

## 🔧 Paso 1: Preparar el Repositorio

### 1.1 Inicializar Git (si no lo has hecho)

```bash
git init
git add .
git commit -m "Initial commit: API de Tareas con NestJS"
```

### 1.2 Subir a GitHub

1. Crea un repositorio nuevo en GitHub
2. Conecta tu repositorio local:

```bash
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git branch -M main
git push -u origin main
```

---

## 🌐 Paso 2: Desplegar en Render

### 2.1 Crear Nuevo Servicio

1. Ve a [dashboard.render.com](https://dashboard.render.com)
2. Haz clic en **"New +"** → **"Web Service"**
3. Conecta tu repositorio de GitHub
4. Selecciona el repositorio que contiene tu API

### 2.2 Configurar el Servicio

**Configuración básica:**
- **Name**: `api-tareas` (o el nombre que prefieras)
- **Region**: Elige la región más cercana (ej: `Oregon (US West)`)
- **Branch**: `main` (o la rama que uses)
- **Root Directory**: Dejar vacío (si el proyecto está en la raíz)

**Configuración de Build:**
- **Environment**: `Node`
- **Build Command**: 
  ```bash
  pnpm install && pnpm run build
  ```
- **Start Command**: 
  ```bash
  pnpm run start:prod
  ```

**Variables de Entorno:**
Haz clic en **"Advanced"** → **"Add Environment Variable"** y agrega:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `10000` (Render usa este puerto por defecto) |
| `CORS_ORIGIN` | `*` (permite todas las peticiones) |

### 2.3 Crear el Servicio

1. Haz clic en **"Create Web Service"**
2. Render comenzará a construir y desplegar tu aplicación
3. Esto tomará unos 5-10 minutos la primera vez

---

## ✅ Paso 3: Verificar el Despliegue

### 3.1 Revisar los Logs

1. En el dashboard de Render, ve a tu servicio
2. Haz clic en la pestaña **"Logs"**
3. Deberías ver:
   ```
   🚀 Aplicación corriendo en: https://tu-api.onrender.com
   📚 Documentación Swagger: https://tu-api.onrender.com/api/docs
   ```

### 3.2 Probar la API

Una vez desplegado, Render te dará una URL como:
```
https://api-tareas-xxxx.onrender.com
```

**Prueba estos endpoints:**
- Swagger: `https://tu-api.onrender.com/api/docs`
- Health check: `https://tu-api.onrender.com/api/tasks`

---

## 📮 Paso 4: Compartir con tu Amigo

### 4.1 Información para Postman

Comparte con tu amigo:

**Base URL:**
```
https://tu-api.onrender.com/api
```

**Endpoints disponibles:**
- `POST /tasks` - Crear tarea
- `GET /tasks` - Listar tareas
- `GET /tasks/:id` - Obtener tarea
- `PATCH /tasks/:id/complete` - Completar tarea
- `DELETE /tasks/:id` - Eliminar tarea

**Swagger UI:**
```
https://tu-api.onrender.com/api/docs
```

### 4.2 Colección de Postman

Tu amigo puede:
1. Abrir Postman
2. Ir a **"Import"** → **"Link"**
3. Ingresar: `https://tu-api.onrender.com/api/docs-json`
4. Postman importará todos los endpoints automáticamente

---

## 🔄 Paso 5: Actualizaciones Futuras

Cada vez que hagas `git push` a la rama `main`:
1. Render detectará automáticamente los cambios
2. Reconstruirá y redesplegará la aplicación
3. El proceso toma unos 3-5 minutos

**Para ver el progreso:**
- Ve al dashboard de Render
- Revisa la pestaña **"Events"** para ver el estado del despliegue

---

## ⚙️ Configuración Avanzada

### Auto-Deploy

Por defecto, Render despliega automáticamente cuando haces push. Puedes:
- Desactivarlo en **Settings** → **Auto-Deploy**
- Configurar deploys manuales

### Health Checks

Render puede verificar que tu API esté funcionando:
1. Ve a **Settings** → **Health Check Path**
2. Ingresa: `/api/tasks`
3. Render verificará cada minuto que tu API responda

### Planes de Render

- **Free**: Perfecto para desarrollo y pruebas
  - Se "duerme" después de 15 minutos de inactividad
  - Tarda ~30 segundos en despertar
  - 750 horas gratis al mes
  
- **Starter ($7/mes)**: Para producción
  - Siempre activo
  - Sin tiempo de espera

---

## 🐛 Solución de Problemas

### Error: "Build failed"

**Causa común**: Dependencias faltantes o errores de compilación

**Solución:**
1. Revisa los logs de build en Render
2. Prueba localmente: `pnpm run build`
3. Asegúrate de que todas las dependencias estén en `package.json`

### Error: "Application failed to respond"

**Causa común**: El puerto no está configurado correctamente

**Solución:**
1. Verifica que `PORT` esté en las variables de entorno
2. Asegúrate de que el código use `process.env.PORT`
3. Revisa que el servidor escuche en `0.0.0.0`

### La API se "duerme" (plan free)

**Solución:**
- La primera petición después de 15 min puede tardar ~30 segundos
- Considera usar un servicio de "ping" para mantenerla activa
- O actualiza al plan Starter ($7/mes)

### CORS Errors

**Solución:**
- Verifica que `CORS_ORIGIN` esté configurado como `*` o la URL específica
- Revisa que `app.enableCors()` esté en `main.ts`

---

## 📝 Checklist de Despliegue

- [ ] Código subido a GitHub/GitLab/Bitbucket
- [ ] Cuenta creada en Render
- [ ] Servicio web creado en Render
- [ ] Repositorio conectado
- [ ] Build command configurado: `pnpm install && pnpm run build`
- [ ] Start command configurado: `pnpm run start:prod`
- [ ] Variables de entorno configuradas
- [ ] Despliegue exitoso
- [ ] Swagger accesible en `/api/docs`
- [ ] Endpoints funcionando
- [ ] URL compartida con tu amigo

---

## 🎉 ¡Listo!

Una vez desplegado, tu amigo podrá:
- Acceder a Swagger UI desde cualquier lugar
- Probar todos los endpoints desde Postman
- Ver la documentación completa de la API

**URLs importantes:**
- API Base: `https://tu-api.onrender.com/api`
- Swagger: `https://tu-api.onrender.com/api/docs`
- JSON Schema: `https://tu-api.onrender.com/api/docs-json`

---

## 💡 Tips Adicionales

1. **Monitoreo**: Render muestra métricas básicas (CPU, memoria, requests)
2. **Logs**: Revisa los logs en tiempo real desde el dashboard
3. **Rollback**: Puedes volver a versiones anteriores desde **"Manual Deploy"**
4. **Custom Domain**: Puedes agregar tu propio dominio en **Settings** → **Custom Domain**

¡Buena suerte con tu despliegue! 🚀

