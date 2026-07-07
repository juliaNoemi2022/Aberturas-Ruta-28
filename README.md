# 🚪 Aberturas Ruta 28 - Tienda con Carrito de Compras

Este es un proyecto web desarrollado con tecnologías nativas (**HTML5, CSS3 y JavaScript Vanilla**) para la empresa **Aberturas Ruta 28**. La aplicación cuenta con una página principal (catálogo de productos) y una página dedicada exclusivamente a la gestión del carrito de compras, comunicadas dinámicamente a través del almacenamiento local del navegador.

## 🚀 Características Principales

*   **Persistencia de Datos:** Uso de `localStorage` para que los productos no se borren al recargar la página o al navegar entre secciones.
*   **Diseño Responsive:** Adaptabilidad garantizada para celulares, tablets y computadoras de escritorio mediante CSS Media Queries.
*   **UI Dinámica:** El contador del carrito en la barra de navegación se actualiza en tiempo real desde cualquier sección.
*   **Layout Moderno (Sticky Footer):** Implementación de Flexbox en la estructura global para asegurar que el pie de página (`footer`) permanezca siempre en la base de la pantalla, incluso si el carrito está vacío.

---

## 📂 Estructura del Proyecto

```text
├── index.html                   # Página de inicio y catálogo de productos
├── carrito.html                 # Interfaz de gestión del carrito de compras
├── styles.css                   # Estilos generales, animaciones y diseño responsive
├── script.js                    # Lógica central del carrito (Tienda + Carrito)
└── imagenes/                    # Directorio para los fondos y fotos de productos
    ├── option1.jpg
    ├── acerca-de.jpg
    ├── ventana-aluminio.jpg
    ├── Puerta-madera.jpg
    ├── ventana-madera.jpg
    └── puerta-chapa.jpg

**Desarrollo Técnico**
1. Interfaz y Maquetación (HTML5)
index.html: Contiene las secciones de Hero, Nosotros, Productos, Reseñas y Contacto. Cada tarjeta de producto incluye un botón con atributos personalizados (data-id, data-nombre, data-precio) esenciales para que JavaScript procese el contenido.

carrito.html: Muestra una estructura limpia que renderiza dinámicamente los elementos mediante una lista inyectada desde el DOM (#lista-carrito).

2. Estilos y Layout (CSS3)
El diseño visual utiliza la fuente Poppins y una paleta de colores moderna. Se destacan dos soluciones estructurales:

Header Fijo: Se utilizó position: fixed para mantener la navegación siempre al alcance del usuario.

Solución al "Footer Volador": Para evitar que el footer flote a mitad de pantalla cuando hay pocos productos, se aplicó un modelo de caja flexible en el cuerpo del documento:
body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
main {
    flex: 1; /* Empuja el footer hacia el fondo de la pantalla */
}
footer {
    margin-top: auto;
}

**Lógica de Negocio**
El archivo script.js unifica el comportamiento de ambas páginas controlando el estado mediante el ciclo de vida del DOM (DOMContentLoaded):

Detección de Pantalla: El script detecta de forma inteligente en qué página se encuentra el usuario buscando la existencia del nodo #lista-carrito. Si existe, inicializa las funciones del carrito; si no, configura los escuchadores de eventos para los botones de la tienda.

Eventos Robustos: Se reemplazó el uso de e.target por e.currentTarget en los manejadores de clicks. Esto previene errores de captura cuando el usuario hace click en los bordes internos de los botones o en el caracter &times; (X) de eliminación.

Formateo de Moneda: Para una experiencia de usuario localizada, los precios se muestran utilizando .toLocaleString('es-AR'), formateando correctamente los miles y decimales según la región.

**Cómo Ejecutar el Proyecto Localmente**
Descargá o cloná este repositorio en tu computadora.

Asegurate de incluir las imágenes correspondientes dentro de una carpeta llamada imagenes/ para que los fondos de las tarjetas carguen correctamente.

Abrí el archivo index.html en cualquier navegador web moderno (Chrome, Edge, Firefox, Brave).

¡Listo! Ya podés interactuar con la tienda, añadir productos y procesar tu compra.