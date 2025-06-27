# 👘👚 Proyecto CRUD con JSON Server – E-commerce

# Tienda ADAMY

## 🛠️ Tecnologías utilizadas

- HTML y CSS
- JavaScript (sin frameworks)
- `json-server` (para simular un backend con una API REST)
- Git & GitHub para control de versiones
- Tailwind CSS

---

## 🚀 Funcionalidades del proyecto

- ✅ Ver lista de productos (`GET`)
- ➕ Agregar un nuevo productos (`POST`)
- ✏️ Editar productos existente (`PUT`)
- 🗑️ Eliminar productos (`DELETE`)
- 🧠 Cargar datos al formulario para editar
- 🔄 Recargar la lista tras cada acción
- 📦 Comunicación con el servidor mediante `fetch` y `async/await`
- 📁Filtrar productos por categoría, color,género, temporada.
- 🔎Buscador de productos en todas las páginas
- 🛒Añadir productos al carrito de compra
- 🙍‍♂️Login del administrador para Editar, Crear y Eliminar productos
- 🗺🚩Consumo de API externa de google maps

---

## 🧑‍💻 Instrucciones para comenzar

### 1. Clona este repositorio
```
git clone...
```

### 2. Instala JSON Server

```bash
npm install -g json-server
```

### 3. Inicia el servidor local con nuestro script

```bash
npm run api
```

Esto creará una API en:
📍 `http://localhost:3000/products`

### 4. Abre el archivo `public/index.html` en tu navegador

Puedes hacerlo con Live Server en VSCode o simplemente arrastrando el archivo al navegador.

### Estructura del proyecto

```bash
adamy/
├── server/
│   └── db.json                 # Base de datos simulada (mock) para json-server
├── src/
│   ├── api/
│   │   └── productApi.js       # Todas las llamadas a la API: GET, POST, PUT, DELETE
│   ├── components/
│   │   ├── ProductCard.js      # Componente reutilizable para mostrar un producto
│   │   ├── ProductForm.js      # Formulario para crear o editar productos
│   │   └── Modal.js            # Componente de ventana modal (usado para confirmaciones o formularios)
│   ├── controllers/
│   │   └── productController.js  # Controlador que conecta la lógica de UI con la API
│   ├── models/
│   │   └── Product.js          # Modelo que define la estructura del objeto Producto
│   ├── pages/
│   │   ├── ShopPage.html       # Página pública que muestra los productos (catálogo)
│   │   └── AdminPage.html      # Vista de administración con funcionalidades CRUD
│   ├── styles/
│   │   ├── base.css            # Estilos base: tipografías, colores, variables, reset CSS
│   │   ├── layout.css          # Estilos de estructura general: grid, flex, espaciado
│   │   └── components.css      # Estilos específicos para los componentes de UI (cards, botones, modales)
│   ├── utils/
│   │   ├── formatPrice.js      # Utilidad para formatear precios según moneda
│   │   └── validateForm.js     # Validación de campos de formulario (inputs vacíos, tipos, etc.)
├── public/
│   ├── index.html              # Entrada principal del proyecto (HTML raíz)
│   └── assets/
│       └── images/             # Archivos estáticos: imágenes de productos y logotipo
├── README.md                   # Documentación del proyecto, instrucciones y dependencias
└── .gitignore                  # Archivos y carpetas que se deben excluir del repositorio (como node_modules)


```
