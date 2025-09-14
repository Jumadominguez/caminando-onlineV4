# Caminando Online V4

## Versionado

Este proyecto utiliza **Conventional Commits** para mantener un historial de cambios organizado y facilitar la generación automática de changelogs.

### Formato de Commits

Todos los commits deben seguir el formato:

```
<type>[scope opcional]: <descripción>
```

**Ejemplos:**
- `feat: agregar autenticación de usuarios`
- `fix(auth): corregir validación de contraseña`
- `docs: actualizar documentación de API`
- `refactor(ui): mejorar diseño de componentes`

### Tipos de Commit

- **feat**: Nueva funcionalidad
- **fix**: Corrección de bugs
- **docs**: Cambios en documentación
- **style**: Cambios de estilo (formateo, etc.)
- **refactor**: Refactorización de código
- **test**: Agregar o modificar tests
- **chore**: Cambios de mantenimiento

### Versionado Semántico

El proyecto sigue [Semantic Versioning](https://semver.org/):

- **MAJOR**: Cambios incompatibles (ej: 1.0.0 → 2.0.0)
- **MINOR**: Nuevas funcionalidades compatibles (ej: 1.0.0 → 1.1.0)
- **PATCH**: Correcciones de bugs (ej: 1.0.0 → 1.0.1)

### Flujo de Trabajo

1. **Antes de commitear**: Asegúrate de que tu commit siga el formato conventional
2. **Mensaje descriptivo**: Describe claramente qué cambios introduces
3. **Commits atómicos**: Cada commit debe contener un cambio lógico completo
4. **Pull Request**: Usa PRs para cambios significativos

### Ejemplos de Buenas Prácticas

```bash
# ✅ Bueno
git commit -m "feat: implementar sistema de login con JWT"
git commit -m "fix: corregir error de validación en formulario"
git commit -m "docs: agregar guía de instalación"

# ❌ Malo
git commit -m "cambios varios"
git commit -m "fix bug"
git commit -m "update"
```

## Instalación

### Prerrequisitos
- Node.js 18+
- MongoDB 6+
- Angular CLI 20+

### Instalación del Frontend
```bash
cd Sandbox/Experiments/frontend
npm install
npm start
```

### Instalación del Backend
```bash
cd Sandbox/Experiments/backend
npm install
npm run dev
```

## Arquitectura

- **Frontend**: Angular 20 con TypeScript y SCSS
- **Backend**: Node.js con Express y MongoDB
- **Base de datos**: MongoDB con Mongoose

## Puertos

- Frontend: http://localhost:4200
- Backend: http://localhost:3000
- MongoDB: localhost:27017

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios siguiendo las convenciones
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request
