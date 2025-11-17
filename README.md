# 📋 API de Tareas - NestJS + Fastify

API REST para gestión de tareas construida con NestJS, Fastify, TypeScript, class-validator y Swagger.

## 🚀 Características

- ✅ CRUD completo de tareas
- ✅ Validaciones con class-validator
- ✅ Documentación automática con Swagger
- ✅ Logger integrado
- ✅ Filtro global de excepciones
- ✅ Interceptor de logging
- ✅ CORS configurado
- ✅ TypeScript estricto (sin `any`)

## 📦 Tecnologías

- **NestJS** - Framework Node.js
- **Fastify** - Servidor HTTP de alto rendimiento
- **TypeScript** - Tipado estático
- **class-validator** - Validación de DTOs
- **Swagger** - Documentación de API
- **pnpm** - Gestor de paquetes

## 🛠️ Instalación

```bash
# Instalar dependencias
pnpm install

# Ejecutar en desarrollo
pnpm start:dev

# Compilar
pnpm run build

# Ejecutar en producción
pnpm run start:prod
```

## 📡 Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/api/tasks` | Crear una nueva tarea |
| `GET` | `/api/tasks` | Obtener todas las tareas |
| `GET` | `/api/tasks/:id` | Obtener una tarea por ID |
| `PATCH` | `/api/tasks/:id/complete` | Completar una tarea |
| `DELETE` | `/api/tasks/:id` | Eliminar una tarea |
| `GET` | `/api/docs` | Documentación Swagger UI |

## 🧪 Probar la API

### Swagger UI
Abre tu navegador en: `http://localhost:3000/api/docs`

### Postman
Importa la colección desde: `http://localhost:3000/api/docs-json`

### cURL
```bash
# Crear tarea
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Mi tarea", "description": "Descripción"}'

# Listar tareas
curl http://localhost:3000/api/tasks
```

## 📚 Documentación

- [Guía de Pruebas](./GUIA_PRUEBAS.md) - Cómo probar la API
- [Guía de Despliegue en Render](./DEPLOY_RENDER.md) - Desplegar en producción

## 🌐 Despliegue

Ver [DEPLOY_RENDER.md](./DEPLOY_RENDER.md) para instrucciones completas de despliegue en Render.

## 📝 Estructura del Proyecto

```
src/
├── common/
│   ├── filters/          # Filtros de excepciones
│   └── interceptors/      # Interceptores
├── config/                # Configuraciones
├── tasks/
│   ├── dto/              # Data Transfer Objects
│   ├── entities/         # Entidades
│   ├── task.controller.ts
│   ├── task.service.ts
│   └── task.module.ts
└── main.ts               # Punto de entrada
```

## 🔒 Validaciones

### Crear Tarea
- `title`: Requerido, mínimo 3 caracteres, máximo 100
- `description`: Requerido, mínimo 5 caracteres, máximo 500

### Actualizar Tarea
- Todos los campos son opcionales
- Mismas reglas de validación que crear

## 🐛 Manejo de Errores

La API retorna errores estructurados:
```json
{
  "statusCode": 400,
  "message": "Error de validación",
  "errors": [...],
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/tasks"
}
```

## 📄 Licencia

UNLICENSED
