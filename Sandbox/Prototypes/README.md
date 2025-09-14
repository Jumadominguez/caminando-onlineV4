# 🏗️ Sandbox/Prototypes

**Carpeta para prototipos validados y versiones estables - PERMANENTE**

Esta carpeta contiene prototipos que han sido validados y están listos para ser integrados al proyecto principal de Caminando Online V4.

## ⚠️ **IMPORTANTE: NO BORRAR ESTA CARPETA**

**🚫 Esta carpeta NO se puede eliminar bajo ninguna circunstancia.**
- Es parte esencial de la estructura del proyecto
- Debe existir siempre en `Sandbox/Prototypes/`
- Contiene versiones validadas críticas para el proyecto

## 📋 Propósito

Los prototipos en esta carpeta han pasado por:
- ✅ Desarrollo inicial en `Sandbox/Experiments/`
- ✅ Validación funcional
- ✅ Testing básico
- ✅ Documentación completa
- ✅ Revisión de código

## 🗂️ Estructura Recomendada

```
Sandbox/Prototypes/
├── frontend-v1.0/          # Versión validada del frontend
├── backend-v1.0/           # Versión validada del backend
├── api-v1.0/              # APIs validadas
├── database-v1.0/         # Esquemas de BD validados
└── docs/                  # Documentación de prototipos
```

## 🔄 Flujo de Trabajo

1. **Desarrollo**: Crear prototipo en `Sandbox/Experiments/`
2. **Validación**: Probar exhaustivamente
3. **Documentación**: Crear docs completa
4. **Movimiento**: Mover a `Sandbox/Prototypes/` cuando esté listo
5. **Integración**: Integrar al proyecto principal desde aquí

## 📚 Contenido Actual

### Próximos Prototipos a Validar:
- [ ] Arquitectura de base de datos multi-supermercado
- [ ] Sistema de filtros avanzados
- [ ] API REST completa
- [ ] Frontend con componentes validados

## ⚠️ Importante

- Los prototipos aquí están **versionados** (v1.0, v2.0, etc.)
- Cada prototipo debe tener su **README.md** con documentación
- Se mantienen como **referencia** para futuras integraciones
- **NO modificar** prototipos validados sin crear nueva versión

## 🏷️ Convenciones de Nombres

- `frontend-v1.0/` - Frontend versión 1.0
- `backend-api-v2.1/` - Backend API versión 2.1
- `database-schema-v1.5/` - Esquema de BD versión 1.5

## 📋 Checklist para Mover a Prototypes

Antes de mover un prototipo desde Experiments:

- [ ] ✅ Funcionalidad completa implementada
- [ ] ✅ Tests básicos pasan
- [ ] ✅ Documentación completa
- [ ] ✅ Código revisado
- [ ] ✅ Versión asignada (v1.0, v1.1, etc.)
- [ ] ✅ README.md creado
- [ ] ✅ Dependencias documentadas

## 🔗 Integración

Para integrar un prototipo al proyecto principal:

1. Copiar archivos desde `Prototypes/` a ubicación final
2. Actualizar dependencias en `package.json`
3. Ejecutar tests de integración
4. Actualizar documentación principal
5. Crear commit con versión correspondiente
