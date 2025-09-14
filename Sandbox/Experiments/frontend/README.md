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

## Sistema de Filtros Avanzados

### 🎯 Arquitectura Modular de Filtros

La aplicación implementa un sistema de filtrado avanzado y modular que permite a los usuarios refinar su búsqueda de productos de manera intuitiva y eficiente.

### 📁 Estructura de Filtros

```
src/public/app/home/
├── scripts/
│   ├── selectSupermarket.ts    # 🏪 Servicio de selección de supermercado
│   └── filterProducts.ts       # 🔍 Servicio de filtrado de productos
├── styles/
│   ├── selectSupermarket.scss  # 🎨 Estilos de selección de supermercado
│   └── filterProducts.scss     # 🎨 Estilos de filtros de productos
├── home.html                   # 📄 Template principal
├── home.scss                   # 🎨 Estilos principales
└── home.ts                     # ⚙️ Lógica del componente
```

### 🔧 Funcionalidades de Filtrado

#### Filtros por Categoría
- **Frutas y Verduras** 🥕
- **Carnes y Pescados** 🥩
- **Lácteos** 🥛
- **Panadería** 🍞
- **Bebidas** 🥤
- **Limpieza** 🧼
- **Perfumería** 🧴

#### Tipos de Producto por Categoría
Cada categoría tiene tipos específicos:
- **Frutas y Verduras**: Frutas Frescas, Verduras Frescas, Frutas Congeladas
- **Carnes y Pescados**: Carne Vacuna, Aves, Pescados, Cerdo
- **Lácteos**: Leche, Quesos, Yogures, Mantequilla
- **Panadería**: Pan, Pastelería, Galletas
- **Bebidas**: Gaseosas, Jugos, Agua, Café y Té
- **Limpieza**: Detergentes, Limpiadores, Productos de Papel
- **Perfumería**: Shampoos, Jabones, Desodorantes

#### Subfiltros Dinámicos
Los subfiltros se generan automáticamente según el tipo de producto seleccionado:

##### Para Productos Frescos:
- **Origen**: Nacional, Importado, Orgánico
- **Temporada**: De estación, Fuera de temporada
- **Rango de Precio**: Control deslizante

##### Para Carnes:
- **Corte**: Para guisar, Para asar, Para milanesa, Especial
- **Peso**: Control deslizante de 0.5kg a 5kg
- **Calidad**: Premium, Standard, Económico

##### Para Lácteos:
- **Tipo**: Entera, Descremada, Semi-descremada
- **Marca**: La Serenísima, Sancor, Otro
- **Tamaño**: 1L, 500ml, 200ml

##### Para Panadería:
- **Tipo de Pan**: Blanco, Integral, Centeno, Sin gluten
- **Peso**: Control deslizante de 200g a 1000g

##### Para Bebidas:
- **Sabor**: Cola, Naranja, Limón, Otro
- **Tamaño**: 500ml, 1.5L, 2.25L, 3L
- **Marca**: Coca-Cola, Pepsi, Otro

### 🎨 Características de la Interfaz

#### Diseño Responsive
- ✅ **Desktop**: Layout completo con múltiples columnas
- ✅ **Tablet**: Adaptación a 2 columnas
- ✅ **Mobile**: Diseño de una sola columna

#### Estados Interactivos
- ✅ **Hover effects** en todos los elementos
- ✅ **Transiciones suaves** entre estados
- ✅ **Feedback visual** en selecciones
- ✅ **Estados de carga** y vacío

#### Controles de Usuario
- ✅ **Botón "Limpiar Filtros"** para resetear selecciones
- ✅ **Botón "Aplicar Filtros"** para ejecutar búsqueda
- ✅ **Navegación intuitiva** con breadcrumbs
- ✅ **Indicador de progreso** del flujo de compra

### 🔄 Integración con el Flujo de Compra

1. **Selección de Supermercado** → Usuario elige tienda
2. **Selección de Categoría** → Usuario elige tipo de producto
3. **Aplicación de Filtros** → Usuario refina búsqueda ← **NUEVO**
4. **Selección de Productos** → Usuario agrega al carrito
5. **Carrito de Compras** → Usuario finaliza compra

### 📊 Beneficios del Sistema

✅ **Experiencia de Usuario Mejorada**: Filtros intuitivos y rápidos  
✅ **Performance Optimizada**: Filtrado del lado del cliente  
✅ **Escalabilidad**: Fácil agregar nuevas categorías y filtros  
✅ **Mantenibilidad**: Código modular y bien estructurado  
✅ **Accesibilidad**: Diseño inclusivo con navegación por teclado  

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
