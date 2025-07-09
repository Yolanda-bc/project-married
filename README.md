# 💕 Aplicación de Boda - Javier & Jessica

Una aplicación web para que los invitados de la boda puedan **subir y compartir fotos** de forma fácil y elegante.

## 🏗️ Arquitectura de la Aplicación

### **🌐 Frontend (React) - Puerto 5173**

**¿Qué es?** La aplicación web que ven los invitados

- ✅ Landing page elegante de la boda
- ✅ **Subir fotos DIRECTAMENTE a Cloudinary**
- ✅ Galería de fotos responsive
- ✅ Interfaz bonita con música de fondo

### **🖥️ Backend (Node.js) - Puerto 4000**

**¿Qué es?** Un mini-servidor para funciones avanzadas

- ✅ **Listar imágenes** desde Cloudinary
- ✅ Crear thumbnails optimizados automáticamente
- ✅ Estadísticas de la galería
- ✅ Mejor performance y seguridad

### **☁️ Cloudinary (Servicio en la nube)**

**¿Qué es?** Donde se almacenan las fotos realmente

- ✅ **Almacenamiento permanente** de fotos
- ✅ Optimización automática de imágenes
- ✅ URLs globales accesibles

## 🔄 Flujo de la Aplicación

```
1. 👤 Invitado sube foto → 📤 DIRECTO a Cloudinary ☁️
2. ☁️ Cloudinary guarda foto → 💾 Almacenamiento permanente
3. 👤 Invitado ve galería → 🖥️ Backend obtiene lista de fotos
4. 🖥️ Backend devuelve URLs → 🌐 Frontend muestra galería
```

## 🚀 Cómo Ejecutar la Aplicación

### **Paso 1: Configurar Cloudinary**

1. Crea cuenta en https://cloudinary.com
2. Ve al Dashboard y copia tus credenciales
3. Crea archivo `cloudinary-server/.env`:

```env
CLOUDINARY_CLOUD_NAME=dsnngazeg
CLOUDINARY_API_KEY=tu_api_key_aqui
CLOUDINARY_API_SECRET=tu_api_secret_aqui
PORT=4000
```

### **Paso 2: Instalar Dependencias**

```bash
# Frontend
npm install

# Backend
cd cloudinary-server
npm install
```

### **Paso 3: Ejecutar Ambos Servicios**

⚠️ **IMPORTANTE: Necesitas AMBOS servicios corriendo simultáneamente**

**Terminal 1 - Backend:**

```bash
cd cloudinary-server
npm start
```

✅ Servidor corriendo en http://localhost:4000

**Terminal 2 - Frontend (nueva terminal):**

```bash
# Desde la carpeta principal project-married/
npm run dev
```

✅ Aplicación corriendo en http://localhost:5173

### **🤔 ¿Por qué necesito ambos?**

- **🌐 Solo Frontend**: ✅ Puedes subir fotos ❌ La galería estará vacía
- **🖥️ Solo Backend**: ❌ No tienes interfaz de usuario
- **✨ Ambos juntos**: ✅ **Aplicación completa funcionando**

### **📋 Funcionalidades por servicio:**

**Frontend (React)**:

- ✅ Subir fotos **directo a Cloudinary**
- ✅ Interfaz de usuario bonita
- ✅ Landing page y navegación

**Backend (Node.js)**:

- ✅ **Obtener lista de fotos** para la galería
- ✅ Thumbnails optimizados
- ✅ Estadísticas

## 🎯 Funcionalidades

### **Para los Invitados:**

- 📱 **Subir fotos** desde cualquier dispositivo
- 🖼️ **Ver galería** de todas las fotos compartidas
- 📥 **Descargar fotos** de otros invitados
- 🎵 **Música de fondo** opcional
- 📱 **Completamente responsive** (móvil y desktop)

### **Características Técnicas:**

- ✅ **Validación de archivos** (JPG, PNG, GIF, WebP - máx 10MB)
- ✅ **Barra de progreso** durante subida
- ✅ **Thumbnails optimizados** automáticamente
- ✅ **Lazy loading** para mejor performance
- ✅ **Estados de carga y error** elegantes
- ✅ **Fallback methods** si algo falla

## 📁 Estructura del Proyecto

```
project-married/
├── src/
│   ├── components/
│   │   ├── App.jsx              # Componente principal
│   │   ├── Landing.jsx          # Página de inicio
│   │   ├── Header.jsx           # Subida de fotos
│   │   ├── Gallery.jsx          # Galería de fotos
│   │   └── BackgroundMusic.jsx  # Música de fondo
│   ├── styles/                  # Estilos SCSS
│   └── images/                  # Imágenes locales
├── cloudinary-server/
│   ├── index.js                 # Servidor Node.js
│   ├── package.json            # Dependencias del servidor
│   └── .env                    # Credenciales (no en git)
├── public/                      # Archivos estáticos
└── README.md                   # Esta documentación
```

## 🛠️ Scripts Disponibles

### **Frontend:**

```bash
npm run dev      # Desarrollo
npm run build    # Construcción para producción
npm run preview  # Vista previa de build
npm run deploy   # Despliegue a GitHub Pages
```

### **Backend:**

```bash
npm start        # Ejecutar servidor
npm run dev      # Desarrollo con nodemon
```

## 🌐 Endpoints de la API

- `GET /health` - Estado del servidor
- `GET /images` - Lista de fotos de la boda
- `GET /stats` - Estadísticas de la galería

## ⚠️ Solución de Problemas

### **Error: "El servidor no está disponible"**

```bash
cd cloudinary-server && npm start
```

### **Error: "Faltan variables de entorno"**

Verifica que el archivo `.env` tenga las credenciales correctas

### **Error al subir imagen**

- ✅ Verifica conexión a internet
- ✅ Comprueba que el archivo sea válido (imagen, <10MB)
- ✅ Revisa las credenciales de Cloudinary

## 🎨 Personalización

### **Cambiar información de la boda:**

- Edita `src/components/Landing.jsx` y `Header.jsx`
- Cambia nombres, textos y fechas

### **Modificar estilos:**

- Los estilos están en `src/styles/core/`
- Usa la fuente "Fleur De Leah" para mantener consistencia

### **Cambiar upload preset:**

- En Cloudinary dashboard crea nuevo preset
- Actualiza `upload_preset` en `Header.jsx`

## 📞 Soporte

Si hay problemas:

1. Revisa logs del servidor
2. Verifica consola del navegador
3. Comprueba credenciales de Cloudinary
4. Consulta `GUIA_CLOUDINARY.md` para más detalles

---

## 🏷️ Tags y Organización

Todas las fotos se etiquetan automáticamente con `boda-javi-jessi` en Cloudinary para:

- ✅ Fácil organización
- ✅ Filtrado automático
- ✅ Separación de otros eventos

---

💕 **¡Que los invitados disfruten compartiendo los recuerdos más especiales de vuestra boda!** 📸✨
