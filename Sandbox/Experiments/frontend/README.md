# Caminando Online V4 - Frontend

## Estructura Simplificada del Proyecto

```
src/
├── public/                    # 🏪 Entorno Público
│   └── app/                   # Componentes públicos
│       ├── home/             # home.html, home.scss, home.ts
│       ├── login/            # login.html, login.scss, login.ts
│       └── register/         # register.html, register.scss, register.ts
│
├── private/                   # 🔐 Entorno Privado (Admin)
│   └── app/                   # Componentes de administración
│       ├── login/            # login.html, login.scss, login.ts
│       └── dashboard/        # dashboard.html, dashboard.scss, dashboard.ts
│
├── environments/              # 🌍 Configuración de entorno
│   ├── environment.ts        # Desarrollo
│   └── environment.prod.ts   # Producción
│
├── shared/                    # 🔄 Componentes y servicios compartidos
├── app/                       # ⚙️ Configuración principal
│   ├── app.routes.ts         # Definición de rutas
│   └── app.html              # Template principal
├── main.ts                    # 🚀 Punto de entrada
├── index.html                 # 🌐 HTML principal
└── styles.scss                # 🎨 Estilos globales
```

## Entornos

### Público (`/public/*`)
- **Propósito**: Sitio web accesible a todos los usuarios
- **Rutas**:
  - `/public/home` - Página principal con selección de supermercados
  - `/public/login` - Inicio de sesión para usuarios
  - `/public/register` - Registro de nuevos usuarios
- **Características**:
  - Interfaz moderna y atractiva
  - Responsive design
  - Navegación intuitiva

### Privado (`/private/*`)
- **Propósito**: Panel de administración para gestores del sistema
- **Rutas**:
  - `/private/login` - Autenticación de administradores
  - `/private/dashboard` - Panel de control principal
- **Características**:
  - Interfaz profesional para administración
  - Gestión de usuarios, productos y pedidos
  - Reportes y estadísticas
  - Seguridad avanzada

## Desarrollo

### Comandos principales

```bash
# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm start
# o
ng serve

# Construir para producción
npm run build
# o
ng build

# Ejecutar tests
npm test
# o
ng test

# Ejecutar linting
npm run lint
# o
ng lint
```

### Agregar nuevos componentes

Para el entorno público:
```bash
ng generate component src/public/app/nombre-componente
```

Para el entorno privado:
```bash
ng generate component src/private/app/nombre-componente
```

## Configuración

### Variables de entorno

Configuración centralizada en `src/environments/`:

- **Desarrollo**: `src/environments/environment.ts`
- **Producción**: `src/environments/environment.prod.ts`

### Estilos

- **Globales**: `src/styles.scss`
- **Por componente**: Cada componente tiene su propio archivo `.scss`

### Generación de componentes

Para el entorno público:
```bash
ng generate component src/public/app/nombre-componente
```

Para el entorno privado:
```bash
ng generate component src/private/app/nombre-componente
```

## Arquitectura Simplificada

- **Standalone Components**: Cada componente es independiente y autocontenido
- **Estructura por componente**: HTML, SCSS y TS en la misma carpeta
- **Separación por entornos**: Público y privado claramente diferenciados
- **Configuración centralizada**: Variables de entorno en un solo lugar
- **Estilos modulares**: Cada componente maneja sus propios estilos
- **Secciones Dinámicas**: Las páginas se generan dinámicamente según el flujo del usuario

## Funcionalidad Dinámica del Home

El componente `home` implementa un flujo de 4 secciones que se generan dinámicamente:

### Flujo de Secciones:
1. **Selección de Supermercado** → Aparece por defecto
2. **Selección de Categoría** → Aparece al seleccionar supermercado
3. **Selección de Productos** → Aparece al seleccionar categoría
4. **Carrito de Compras** → Aparece al agregar productos o hacer clic en carrito

### Características:
- ✅ **Navegación intuitiva** con botones de "volver"
- ✅ **Estado persistente** durante la navegación
- ✅ **Animaciones suaves** entre secciones
- ✅ **Responsive design** para móviles
- ✅ **Carrito dinámico** con total en tiempo real
- ✅ **Interfaz modular** fácil de extender

## Beneficios de la Estructura Actual

✅ **Sin duplicación**: Eliminadas carpetas innecesarias  
✅ **Mantenibilidad**: Cada componente es autocontenido  
✅ **Escalabilidad**: Fácil agregar nuevos componentes  
✅ **Claridad**: Estructura intuitiva y predecible  
✅ **Performance**: Compilación optimizada  

## Rutas Disponibles

### Público (`/public/*`)
- `/public/home` - Página principal con selección de supermercados
- `/public/login` - Inicio de sesión para usuarios
- `/public/register` - Registro de nuevos usuarios

### Privado (`/private/*`)
- `/private/login` - Autenticación de administradores
- `/private/dashboard` - Panel de control administrativo
