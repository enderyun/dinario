# Dinario

**Dinario** es un proyecto personal que consiste en una aplicación Web Progresiva (PWA) para la gestión financiera personal, diseñada con un enfoque absoluto en la **privacidad**. Permite a los usuarios configurar sus ingresos, calcular impuestos automáticamente y rastrear sus gastos fijos y deudas, todo desde una interfaz moderna y rápida.

---

## Características Principales

- **100% Privado & Local**: Sin bases de datos externas ni servidores.
- **Funciona Offline**: Puedes gestionar tus finanzas sin conexión a internet.
- **Ingresos Flexibles**:
  - **Mensual**: Configura un salario fijo recurrente.
  - **Diario**: Registra ingresos variables día a día y visualiza tu acumulado mensual.
- **Impuestos Configurables**: Define tu propia tasa de impuestos (%) para calcular tu ingreso neto real.
- **Gestión de Deudas**: Registra gastos fijos y deudas con fechas de pago para tener claridad sobre tus compromisos.

---

## Stack Tecnológico

### Core

- **[Vite](https://vitejs.dev/)**: Build tool ultrarrápido para desarrollo moderno.
- **[React](https://react.dev/)**: Biblioteca para construir interfaces de usuario declarativas.
- **[TypeScript](https://www.typescriptlang.org/)**: JavaScript con tipado estático para un código más robusto y mantenible.

### Estilos & UI

- **[Tailwind CSS (v4)](https://tailwindcss.com/)**: Framework de utilidades para un diseño rápido, responsive y moderno.
- **[Lucide React](https://lucide.dev/)**: Set de iconos limpio y consistente.

### Datos & Estado

- **[Dexie.js](https://dexie.org/)**: Wrapper minimalista para IndexedDB que permite una persistencia local potente y fácil de usar.
- **React Router**: Enrutamiento SPA (Single Page Application) para una navegación fluida entre vistas.

### PWA

- **[vite-plugin-pwa](https://vite-pwa-org.netlify.app/)**: Conversión automática a PWA (Service Workers, Manifest, Instalación).

---

## Instalación y Uso

1.  **Clonar el repositorio**:

    ```bash
    git clone https://github.com/enderyun/dinario.git
    cd dinario
    ```

2.  **Instalar dependencias**:

    ```bash
    pnpm install
    ```

3.  **Iniciar servidor de desarrollo**:

    ```bash
    pnpm dev
    ```

    Abre `http://localhost:5173` en tu navegador.

4.  **Construir para producción**:
    ```bash
    pnpm build
    ```
    Esto generará los archivos optimizados en la carpeta `dist`.


