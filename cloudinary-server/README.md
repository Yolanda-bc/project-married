# Servidor de Cloudinary para la Boda

Este servidor maneja la obtención de imágenes desde Cloudinary para la galería de fotos de la boda.

## Configuración

1. **Crear archivo `.env`** en esta carpeta (`cloudinary-server/.env`) con el siguiente contenido:

```env
# Configuración de Cloudinary
# Obtén estos valores desde tu dashboard de Cloudinary: https://cloudinary.com/console

CLOUDINARY_CLOUD_NAME=dsnngazeg
CLOUDINARY_API_KEY=tu_api_key_aqui
CLOUDINARY_API_SECRET=tu_api_secret_aqui

# Puerto del servidor (opcional, por defecto 4000)
PORT=4000
```

2. **Obtener las credenciales de Cloudinary:**

   - Ve a https://cloudinary.com/console
   - Inicia sesión en tu cuenta
   - En el Dashboard verás:
     - Cloud name: `dsnngazeg` (ya configurado)
     - API Key: cópialo al archivo .env
     - API Secret: cópialo al archivo .env (¡mantén esto en secreto!)

3. **Instalar dependencias:**

```bash
cd cloudinary-server
npm install
```

4. **Ejecutar el servidor:**

```bash
npm start
```

El servidor estará disponible en http://localhost:4000

## Endpoints

- `GET /images` - Obtiene todas las imágenes de la boda con el tag "boda-javi-jessi"

## Notas importantes

- ⚠️ **NUNCA** subas el archivo `.env` a Git (ya está en .gitignore)
- Las imágenes se filtran por el tag "boda-javi-jessi"
- El servidor devuelve máximo 30 imágenes, ordenadas por fecha de creación
