# 🧪 Guía de Pruebas - API de Tareas

## 📋 Índice
1. [Iniciar el Servidor](#iniciar-el-servidor)
2. [Probar con Swagger UI](#probar-con-swagger-ui)
3. [Probar con Postman](#probar-con-postman)
4. [Probar con cURL](#probar-con-curl)
5. [Endpoints Disponibles](#endpoints-disponibles)

---

## 🚀 Iniciar el Servidor

```bash
pnpm start:dev
```

El servidor se iniciará en: **http://localhost:3000**

---

## 📚 Probar con Swagger UI

### 1. Acceder a Swagger
Abre tu navegador y ve a:
```
http://localhost:3000/api/docs
```

### 2. Interfaz de Swagger
- Verás todos los endpoints documentados
- Puedes expandir cada endpoint para ver detalles
- Cada endpoint tiene un botón **"Try it out"** para probarlo

### 3. Probar Endpoints en Swagger

#### **Crear una Tarea (POST /api/tasks)**
1. Expande el endpoint `POST /api/tasks`
2. Haz clic en **"Try it out"**
3. Modifica el JSON en el campo "Request body":
```json
{
  "title": "Mi primera tarea",
  "description": "Esta es una descripción de ejemplo para mi tarea"
}
```
4. Haz clic en **"Execute"**
5. Verás la respuesta con el código de estado y el cuerpo

#### **Listar Tareas (GET /api/tasks)**
1. Expande el endpoint `GET /api/tasks`
2. Haz clic en **"Try it out"**
3. Haz clic en **"Execute"**
4. Verás todas las tareas creadas

#### **Obtener una Tarea (GET /api/tasks/{id})**
1. Expande el endpoint `GET /api/tasks/{id}`
2. Haz clic en **"Try it out"**
3. Ingresa el ID de una tarea (ej: `1`)
4. Haz clic en **"Execute"**

#### **Completar una Tarea (PATCH /api/tasks/{id}/complete)**
1. Expande el endpoint `PATCH /api/tasks/{id}/complete`
2. Haz clic en **"Try it out"**
3. Ingresa el ID de la tarea
4. Haz clic en **"Execute"**

#### **Eliminar una Tarea (DELETE /api/tasks/{id})**
1. Expande el endpoint `DELETE /api/tasks/{id}`
2. Haz clic en **"Try it out"**
3. Ingresa el ID de la tarea
4. Haz clic en **"Execute"**

---

## 📮 Probar con Postman

### 1. Importar la Colección
Puedes crear una colección manualmente o importar desde Swagger:

**Opción A: Importar desde Swagger**
1. Abre Postman
2. Haz clic en **"Import"**
3. Selecciona **"Link"**
4. Ingresa: `http://localhost:3000/api/docs-json`
5. Postman importará todos los endpoints

**Opción B: Crear Manualmente**
Crea una nueva colección llamada "API de Tareas"

### 2. Configurar Variables de Entorno (Opcional)
1. Crea un nuevo Environment
2. Agrega la variable:
   - `base_url`: `http://localhost:3000/api`

### 3. Crear las Peticiones

#### **POST - Crear Tarea**
- **Method**: `POST`
- **URL**: `http://localhost:3000/api/tasks`
- **Headers**:
  ```
  Content-Type: application/json
  ```
- **Body** (raw JSON):
```json
{
  "title": "Tarea desde Postman",
  "description": "Esta tarea fue creada usando Postman"
}
```

#### **GET - Listar Tareas**
- **Method**: `GET`
- **URL**: `http://localhost:3000/api/tasks`
- **Headers**: No necesarios

#### **GET - Obtener Tarea por ID**
- **Method**: `GET`
- **URL**: `http://localhost:3000/api/tasks/1`
- **Headers**: No necesarios

#### **PATCH - Completar Tarea**
- **Method**: `PATCH`
- **URL**: `http://localhost:3000/api/tasks/1/complete`
- **Headers**: No necesarios

#### **DELETE - Eliminar Tarea**
- **Method**: `DELETE`
- **URL**: `http://localhost:3000/api/tasks/1`
- **Headers**: No necesarios

### 4. Probar Validaciones
Intenta crear una tarea con datos inválidos para ver los mensajes de error:

**Ejemplo de Error (título muy corto):**
```json
{
  "title": "AB",
  "description": "Descripción válida"
}
```

**Respuesta esperada:**
```json
{
  "statusCode": 400,
  "message": ["El título debe tener al menos 3 caracteres"],
  "error": "Bad Request"
}
```

---

## 💻 Probar con cURL

### Crear una Tarea
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Tarea desde cURL",
    "description": "Esta tarea fue creada usando cURL"
  }'
```

### Listar Todas las Tareas
```bash
curl -X GET http://localhost:3000/api/tasks
```

### Obtener una Tarea por ID
```bash
curl -X GET http://localhost:3000/api/tasks/1
```

### Completar una Tarea
```bash
curl -X PATCH http://localhost:3000/api/tasks/1/complete
```

### Eliminar una Tarea
```bash
curl -X DELETE http://localhost:3000/api/tasks/1
```

### Ver Respuesta con Formato (jq - opcional)
```bash
curl -X GET http://localhost:3000/api/tasks | jq
```

---

## 📡 Endpoints Disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/api/tasks` | Crear una nueva tarea |
| `GET` | `/api/tasks` | Obtener todas las tareas |
| `GET` | `/api/tasks/:id` | Obtener una tarea por ID |
| `PATCH` | `/api/tasks/:id/complete` | Completar una tarea |
| `DELETE` | `/api/tasks/:id` | Eliminar una tarea |
| `GET` | `/api/docs` | Documentación Swagger UI |
| `GET` | `/api/docs-json` | Documentación Swagger JSON |

---

## 🧪 Casos de Prueba Recomendados

### 1. Flujo Completo
1. Crear una tarea
2. Listar todas las tareas (verificar que aparece)
3. Obtener la tarea por ID
4. Completar la tarea
5. Verificar que `completed: true`
6. Eliminar la tarea
7. Verificar que ya no aparece en la lista

### 2. Validaciones
- ✅ Crear tarea con título muy corto (< 3 caracteres)
- ✅ Crear tarea con descripción muy corta (< 5 caracteres)
- ✅ Crear tarea sin título
- ✅ Crear tarea sin descripción
- ✅ Obtener tarea con ID inexistente (debe retornar 404)
- ✅ Completar tarea inexistente (debe retornar 404)
- ✅ Eliminar tarea inexistente (debe retornar 404)

### 3. Límites
- ✅ Título con más de 100 caracteres
- ✅ Descripción con más de 500 caracteres

---

## 🔍 Ver Logs en Tiempo Real

El servidor muestra logs de todas las peticiones. Observa la terminal donde ejecutaste `pnpm start:dev` para ver:
- Método HTTP
- URL
- Código de estado
- Tiempo de respuesta
- Errores (si los hay)

---

## 📝 Notas Importantes

1. **Base URL**: Todos los endpoints tienen el prefijo `/api`
2. **Content-Type**: Para POST/PATCH, siempre usa `application/json`
3. **IDs**: Los IDs son strings generados automáticamente (1, 2, 3, ...)
4. **Almacenamiento**: Los datos se guardan en memoria, se pierden al reiniciar el servidor
5. **CORS**: Está habilitado para todas las rutas

---

## 🐛 Solución de Problemas

### Swagger no carga
- Verifica que el servidor esté corriendo
- Asegúrate de acceder a `http://localhost:3000/api/docs`
- Revisa la consola del navegador para errores

### Error 404 en endpoints
- Verifica que estés usando el prefijo `/api`
- Revisa que el servidor esté corriendo
- Verifica los logs en la terminal

### Error de validación
- Revisa que el JSON esté bien formado
- Verifica que todos los campos requeridos estén presentes
- Revisa los mensajes de error en la respuesta

---

¡Listo para probar! 🎉

