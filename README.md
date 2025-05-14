# 📱 MyApp

Aplicación móvil desarrollada con **React Native** usando **Expo**. Esta app está diseñada para ser multiplataforma (iOS y Android) y ofrece una experiencia de usuario moderna y fluida.

---

## 🚀 Características

- Desarrollo con **Expo** para una configuración rápida y sencilla.
- Navegación usando **React Navigation**.
- Arquitectura modular para facilitar el mantenimiento y escalabilidad.
- Soporte para temas claro/oscuro.
- Consumo de APIs externas.

---

## 📁 Estructura del Proyecto

```
MyApp/
├── assets/             → Imágenes, fuentes y otros recursos estáticos
├── components/         → Componentes reutilizables
├── constants/          → Constantes globales (colores, estilos, config)
├── hooks/              → Custom Hooks
├── navigation/         → Configuración de navegación
│ └── AppNavigator.js
├── screens/            → Vistas principales (pantallas)
│ ├── HomeScreen.js
│ ├── ProfileScreen.js
│ └── ...
├── services/           → Lógica para conectarse con APIs externas
├── context/            → Contextos globales (ej: autenticación, tema)
├── utils/              → Funciones utilitarias
├── App.js              → Entrada principal de la app
├── app.json            → Configuración de Expo
└── package.json
```

---

## 🛠️ Requisitos Previos

- Node.js
- Expo CLI
- Android Studio (emulador) o dispositivo físico
- Yarn o npm

---

## Dependencias principales

- react-native
- expo
- react-navigation
- axios
- react-native-paper o native-base (opcional, para UI)
- @react-navigation/native
- @react-navigation/stack
