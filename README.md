# 🌍 Global Base Profile

Mapa global interactivo donde los usuarios de Farcaster pueden fijar su ubicación y descubrir otros usuarios worldwide.

## 🚀 Cómo usar la Mini App

### ⚠️ IMPORTANTE: Esta es una Farcaster Mini App

**Esta aplicación SOLO funciona cuando se abre desde Warpcast u otro cliente de Farcaster.** No funcionará correctamente si la abres directamente desde un navegador web normal.

### 📱 Método 1: Abrir desde Warpcast (Recomendado)

1. Abre la app **Warpcast** en tu móvil
2. Publica un nuevo cast con esta URL:
   ```
   https://global-profile-map.vercel.app
   ```
3. Haz clic en tu cast para abrir la Mini App
4. ¡La app detectará automáticamente tu perfil de Farcaster!

### 🖼️ Método 2: Usar como Frame

La Mini App también funciona como un Farcaster Frame. Simplemente comparte la URL en un cast y los usuarios podrán interactuar directamente desde su feed.

## ✨ Características

- **🗺️ Mapa interactivo global**: Basado en Mapbox con diseño iOS-style
- **📍 Perfiles automáticos**: Tu información de Farcaster se obtiene automáticamente
- **💰 Pago simple**: Solo 1 USDC en Base para fijar tu pin
- **👥 Descubre usuarios**: Ve perfiles de otros usuarios y síguelos
- **🔒 Seguro**: Pagos on-chain en Base L2

## 🎯 Flujo de uso

1. **Abre la app desde Warpcast**
2. **Haz clic en el botón "Place pin"** (botón + en la esquina)
3. **Selecciona tu ubicación** en el mapa
4. **Verifica tu perfil** (se carga automáticamente desde Farcaster)
5. **Paga 1 USDC** para fijar tu pin
6. **¡Listo!** Tu perfil aparece en el mapa global

## 🔧 Desarrollo Local

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

### Variables de entorno necesarias

Crea un archivo `.env.local`:

```env
NEXT_PUBLIC_MAPBOX_TOKEN=tu_token_de_mapbox
```

## 🏗️ Stack Técnico

- **Framework**: Next.js 15 + React 19
- **Blockchain**: Base L2 (Optimism)
- **Wallet**: Wagmi + Farcaster SDK
- **Pagos**: USDC (ERC-20)
- **Mapa**: Mapbox GL
- **Estilos**: Tailwind CSS
- **Deploy**: Vercel

## 💳 Contrato USDC en Base

```
Dirección: 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
Billetera destino: 0x0b4244568b58dd0ffcb30ee4f9a6652feab06a8b
Cantidad: 1 USDC (1000000 wei)
```

## 📝 Próximas características

- [ ] API backend para persistir pins
- [ ] Base de datos para almacenar ubicaciones
- [ ] Sistema de búsqueda de usuarios
- [ ] Filtros por ubicación
- [ ] Chat entre usuarios cercanos
- [ ] NFT badges por ubicaciones visitadas

## 🐛 ¿Problemas?

### "No puedo vincular mi billetera"

**Solución**: Asegúrate de abrir la app desde Warpcast, NO desde un navegador normal. Las Mini Apps de Farcaster requieren el contexto de la aplicación.

### "El mapa no carga"

**Solución**: Verifica que Mapbox esté correctamente configurado en las variables de entorno.

### "Error al pagar"

**Solución**: Asegúrate de tener al menos 1 USDC en tu wallet de Base.

## 📄 Licencia

MIT

## 🤝 Contribuir

¡Pull requests son bienvenidos! Para cambios mayores, por favor abre un issue primero.

---

**Hecho con ❤️ para la comunidad de Farcaster**
