# bodegas-frontend

Interfaz web en Angular 20 para registrar bodegas y ver los productos de cada una.

## Requisitos

- Node.js 20.19 o superior
- [bodegas-backend](https://github.com/Mundolel/bodegas-backend) corriendo en `http://localhost:8080`

## Ejecución

```bash
npm install
npm start
```

Abrir `http://localhost:4200`. Las peticiones a `/bodegas` se envían al backend mediante `proxy.conf.json`.
