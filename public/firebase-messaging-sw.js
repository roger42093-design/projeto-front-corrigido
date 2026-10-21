// public/firebase-messaging-sw.js

// Importa os scripts do Firebase compatíveis com Service Workers
importScripts('https://www.gstatic.com/firebasejs/10.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.10.0/firebase-messaging-compat.js');

// Cole AQUI as mesmas credenciais do seu arquivo firebase.js
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "SEU_MESSAGING_ID",
  appId: "SEU_APP_ID"
};

// Inicializa o Firebase no Service Worker
firebase.initializeApp(firebaseConfig);

// Inicializa o Firebase Messaging
const messaging = firebase.messaging();

// Configura o recebimento de mensagens quando o app estiver em segundo plano (fechado ou em outra aba)
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Mensagem recebida em segundo plano: ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    // Você pode colocar o caminho para um ícone seu na pasta public (ex: '/logo.png')
    icon: '/vite.svg' 
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});