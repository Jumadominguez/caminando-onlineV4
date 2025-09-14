# 📁 Home Component - Estructura Modular

**Componente principal de la página de inicio de Caminando Online V4**

## 📂 Estructura Modular de Archivos

```
home/
├── home.html                    # 📄 Template principal del componente
├── styles/
│   ├── home.scss               # 🎨 Estilos generales del componente
│   └── selectSupermarket.scss  # 🏪 Estilos específicos de selectSupermarket
└── scripts/
    ├── home.ts                 # 🔧 Lógica principal del componente
    └── selectSupermarket.ts    # 🏪 Lógica específica de selectSupermarket
```

## 📋 Descripción de Módulos

### home.html
- **Ubicación**: Raíz de la carpeta
- **Propósito**: Template HTML del componente Home
- **Contenido**: Estructura de la página de inicio con secciones de supermercados, categorías y productos

### styles/home.scss
- **Ubicación**: `styles/`
- **Propósito**: Estilos generales del componente
- **Contenido**: Header, layout general, secciones de categorías, productos y carrito

### styles/selectSupermarket.scss
- **Ubicación**: `styles/`
- **Propósito**: Estilos específicos de la sección selectSupermarket
- **Contenido**:
  - `.selectSupermarket` - Contenedor principal
  - `.supermarket-btn` - Estilos de botones
  - `.supermarket-logo` - Estilos de logos
  - `.supermarket-name` - Estilos de nombres

### scripts/home.ts
- **Ubicación**: `scripts/`
- **Propósito**: Lógica principal del componente
- **Contenido**:
  - Component class principal
  - Integración con servicios de secciones
  - Navegación entre secciones
  - Gestión del carrito

### scripts/selectSupermarket.ts
- **Ubicación**: `scripts/`
- **Propósito**: Lógica específica de selección de supermercados
- **Contenido**:
  - `Supermarket` interface
  - `SelectSupermarketService` - Servicio para manejar supermercados
  - `SelectSupermarketUtils` - Utilidades para validación y formato

## 🔧 Arquitectura Modular

### Principios de Diseño
- **Separación de responsabilidades**: Cada módulo tiene una función específica
- **Reutilización**: Servicios pueden ser usados por otros componentes
- **Mantenibilidad**: Cambios en una sección no afectan otras
- **Escalabilidad**: Fácil agregar nuevas secciones siguiendo el patrón

### Patrón de Servicios
```typescript
// Servicio específico para cada sección
export class SelectSupermarketService {
  private supermarkets: Supermarket[] = [...];
  private selectedSupermarket: Supermarket | null = null;

  selectSupermarket(supermarket: Supermarket): Supermarket {
    // Lógica específica
  }
}
```

### Integración en Componente Principal
```typescript
@Component({
  styleUrls: [
    '../styles/home.scss',
    '../styles/selectSupermarket.scss'
  ]
})
export class Home {
  private selectSupermarketService = new SelectSupermarketService();

  get selectedSupermarket(): Supermarket | null {
    return this.selectSupermarketService.getSelectedSupermarket();
  }
}
```

## 🎯 Beneficios de la Arquitectura Modular

- **🔧 Mantenimiento**: Cambios localizados en módulos específicos
- **🧪 Testing**: Cada módulo puede ser probado independientemente
- **👥 Colaboración**: Diferentes desarrolladores pueden trabajar en módulos distintos
- **📦 Reutilización**: Servicios pueden ser reutilizados en otros componentes
- **🎨 Estilos**: CSS organizado por funcionalidad
- **📈 Escalabilidad**: Fácil agregar nuevas secciones

## 🚀 Próximas Secciones a Modularizar

- [ ] **categories.ts/scss** - Lógica y estilos de selección de categorías
- [ ] **products.ts/scss** - Lógica y estilos de lista de productos
- [ ] **cart.ts/scss** - Lógica y estilos del carrito de compras
- [ ] **main.ts/scss** - Estilos y lógica generales (header, footer, etc.)

## 📚 Convenciones de Nomenclatura

### Archivos
- `home.ts/scss` - Componente principal
- `{section}.ts/scss` - Módulos específicos de sección
- `main.ts/scss` - Utilidades generales

### Servicios
- `{Section}Service` - Servicio principal de la sección
- `{Section}Utils` - Utilidades de la sección
- `{Section}Types` - Interfaces y tipos

---

**Última actualización**: Septiembre 2024
**Versión**: 1.1.0 - Arquitectura Modular
