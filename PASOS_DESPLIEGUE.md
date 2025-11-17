# 🚀 Guía Paso a Paso - Desplegar en Render

## 📋 PASO 1: Preparar el Código en GitHub

### 1.1 Verificar que tienes Git inicializado

Abre tu terminal en la carpeta del proyecto y ejecuta:

```bash
git status
```

Si ves errores, inicializa Git:

```bash
git init
```

### 1.2 Agregar todos los archivos

```bash
git add .
```

### 1.3 Hacer el primer commit

```bash
git commit -m "Initial commit: API de Tareas con NestJS y Fastify"
```

### 1.4 Crear repositorio en GitHub

1. Ve a [github.com](https://github.com)
2. Inicia sesión (o crea cuenta)
3. Haz clic en el botón **"+"** (arriba derecha) → **"New repository"**
4. Completa:
   - **Repository name**: `po-pun-project-back` (o el nombre que prefieras)
   - **Description**: "API de Tareas con NestJS"
   - **Visibility**: Público o Privado (tu elección)
   - **NO marques** "Add a README file" (ya tienes uno)
   - **NO marques** "Add .gitignore" (ya tienes uno)
5. Haz clic en **"Create repository"**

### 1.5 Conectar tu código local con GitHub

GitHub te mostrará comandos. Ejecuta estos (reemplaza `TU_USUARIO` con tu usuario de GitHub):

```bash
git remote add origin https://github.com/TU_USUARIO/po-pun-project-back.git
git branch -M main
git push -u origin main
```

Te pedirá usuario y contraseña/token de GitHub.

**Si te pide autenticación:**
- Usa un **Personal Access Token** (no tu contraseña)
- Crea uno en: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
- Permisos: marca `repo`

### 1.6 Verificar que se subió

Ve a tu repositorio en GitHub y verifica que todos los archivos estén ahí.

---

## 🌐 PASO 2: Crear Cuenta en Render

1. Ve a [render.com](https://render.com)
2. Haz clic en **"Get Started for Free"**
3. Elige **"Sign up with GitHub"** (recomendado) o crea cuenta con email
4. Autoriza Render para acceder a tus repositorios de GitHub

---

## 🚀 PASO 3: Crear el Servicio Web en Render

### 3.1 Ir al Dashboard

1. Una vez dentro de Render, verás el dashboard
2. Haz clic en el botón **"New +"** (arriba derecha)
3. Selecciona **"Web Service"**

### 3.2 Conectar Repositorio

1. Render te mostrará tus repositorios de GitHub
2. Busca y selecciona: `po-pun-project-back` (o el nombre que pusiste)
3. Haz clic en **"Connect"**

### 3.3 Configurar el Servicio

Ahora verás un formulario. Completa así:

#### **Configuración Básica:**

- **Name**: `api-tareas` (o el nombre que prefieras)
- **Region**: Elige la más cercana (ej: `Oregon (US West)`)
- **Branch**: `main` (debe estar seleccionado automáticamente)
- **Root Directory**: **DEJAR VACÍO** (si tu proyecto está en la raíz del repo)

#### **Configuración de Build y Deploy:**

- **Environment**: `Node` (debe detectarse automáticamente)
- **Build Command**: 
  ```bash
  pnpm install && pnpm run build
  ```
- **Start Command**: 
  ```bash
  pnpm run start:prod
  ```

#### **Variables de Entorno:**

Haz clic en **"Advanced"** para expandir opciones avanzadas.

Luego haz clic en **"Add Environment Variable"** y agrega estas 3 variables (una por una):

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `10000` |
| `CORS_ORIGIN` | `*` |

**Cómo agregar cada variable:**
1. Haz clic en **"Add Environment Variable"**
2. En **"Key"** escribe: `NODE_ENV`
3. En **"Value"** escribe: `production`
4. Haz clic en **"Add"**
5. Repite para las otras dos variables

### 3.4 Crear el Servicio

1. Revisa que todo esté correcto
2. Haz clic en el botón **"Create Web Service"** (abajo)
3. Render comenzará a construir tu aplicación

---

## ⏳ PASO 4: Esperar el Despliegue

### 4.1 Ver el Progreso

Verás una pantalla con el progreso del despliegue:

1. **Building** - Render está instalando dependencias y compilando
2. **Deploying** - Render está iniciando tu aplicación
3. **Live** - ¡Tu aplicación está funcionando!

**Tiempo estimado:** 5-10 minutos la primera vez

### 4.2 Revisar los Logs

Mientras esperas, puedes ver los logs:

1. Haz clic en la pestaña **"Logs"** (arriba)
2. Verás el progreso en tiempo real
3. Busca mensajes como:
   ```
   🚀 Aplicación corriendo en: https://api-tareas-xxxx.onrender.com
   📚 Documentación Swagger: https://api-tareas-xxxx.onrender.com/api/docs
   ```

### 4.3 Si hay Errores

Si ves errores en los logs:

- **"Build failed"**: Revisa que el Build Command sea correcto
- **"Module not found"**: Verifica que todas las dependencias estén en `package.json`
- **"Port already in use"**: Verifica que `PORT` esté en las variables de entorno

---

## ✅ PASO 5: Verificar que Funciona

### 5.1 Obtener la URL

Una vez que el estado sea **"Live"**, Render te dará una URL como:
```
https://api-tareas-xxxx.onrender.com
```

Esta URL estará visible en la parte superior del dashboard.

### 5.2 Probar Swagger

Abre en tu navegador:
```
https://api-tareas-xxxx.onrender.com/api/docs
```

Deberías ver la documentación de Swagger.

### 5.3 Probar un Endpoint

Abre en tu navegador:
```
https://api-tareas-xxxx.onrender.com/api/tasks
```

Deberías ver: `[]` (array vacío, porque no hay tareas aún)

---

## 📮 PASO 6: Compartir con tu Amigo

### 6.1 Información para Compartir

Comparte con tu amigo esta información:

**Base URL de la API:**
```
https://api-tareas-xxxx.onrender.com/api
```

**Swagger UI (Documentación):**
```
https://api-tareas-xxxx.onrender.com/api/docs
```

**Endpoints disponibles:**
- `POST /tasks` - Crear tarea
- `GET /tasks` - Listar todas las tareas
- `GET /tasks/:id` - Obtener una tarea por ID
- `PATCH /tasks/:id/complete` - Completar una tarea
- `DELETE /tasks/:id` - Eliminar una tarea

### 6.2 Importar en Postman

Tu amigo puede importar todos los endpoints automáticamente:

1. Abre Postman
2. Haz clic en **"Import"** (arriba izquierda)
3. Selecciona la pestaña **"Link"**
4. Pega esta URL:
   ```
   https://api-tareas-xxxx.onrender.com/api/docs-json
   ```
5. Haz clic en **"Continue"** → **"Import"**
6. ¡Listo! Tendrá todos los endpoints listos para probar

---

## 🔄 PASO 7: Actualizaciones Futuras

Cada vez que quieras actualizar la API en Render:

1. Haz cambios en tu código local
2. Ejecuta:
   ```bash
   git add .
   git commit -m "Descripción de los cambios"
   git push
   ```
3. Render detectará automáticamente los cambios
4. Comenzará un nuevo despliegue automáticamente
5. Espera 3-5 minutos
6. ¡Listo! Tu API estará actualizada

---

## 🐛 Solución de Problemas Comunes

### Problema: "Build failed"

**Solución:**
1. Ve a la pestaña **"Logs"** en Render
2. Busca el error específico
3. Prueba localmente: `pnpm run build`
4. Si funciona localmente, verifica que el Build Command sea: `pnpm install && pnpm run build`

### Problema: "Application failed to respond"

**Solución:**
1. Verifica que la variable `PORT` esté configurada como `10000`
2. Verifica que `NODE_ENV` esté como `production`
3. Revisa los logs para ver qué error específico hay

### Problema: La API se "duerme" (plan free)

**Explicación:**
- En el plan gratuito, si no hay peticiones por 15 minutos, la API se "duerme"
- La primera petición después de dormirse puede tardar ~30 segundos
- Esto es normal en el plan gratuito

**Solución:**
- Espera ~30 segundos en la primera petición
- O actualiza al plan Starter ($7/mes) para que esté siempre activa

### Problema: CORS errors en Postman

**Solución:**
- Verifica que `CORS_ORIGIN` esté configurado como `*`
- Si sigue fallando, revisa los logs en Render

---

## 📝 Checklist Final

Antes de considerar que todo está listo, verifica:

- [ ] Código subido a GitHub
- [ ] Cuenta creada en Render
- [ ] Servicio web creado
- [ ] Build Command: `pnpm install && pnpm run build`
- [ ] Start Command: `pnpm run start:prod`
- [ ] Variables de entorno configuradas (NODE_ENV, PORT, CORS_ORIGIN)
- [ ] Despliegue completado (estado "Live")
- [ ] Swagger accesible en `/api/docs`
- [ ] Endpoint `/api/tasks` responde correctamente
- [ ] URL compartida con tu amigo

---

## 🎉 ¡Listo!

Tu API está desplegada y tu amigo puede probarla desde Postman.

**Recuerda:**
- La URL de tu API es: `https://api-tareas-xxxx.onrender.com`
- Swagger está en: `https://api-tareas-xxxx.onrender.com/api/docs`
- Cada `git push` actualiza automáticamente la API

¡Felicitaciones! 🚀

