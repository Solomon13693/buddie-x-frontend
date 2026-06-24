// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: 'AIzaSyAONgpIIrP6rlHYtOiduaIYZsWBwcyLM8E',
    authDomain: 'mentorship-bx.firebaseapp.com',
    projectId: 'mentorship-bx',
    storageBucket: 'mentorship-bx.firebasestorage.app',
    messagingSenderId: '801676238794',
    appId: '1:801676238794:web:02719d35ba6e6745e8f933',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    const notificationTitle = payload.notification?.title || 'Buddie-X';
    const notificationOptions = {
        body: payload.notification?.body || '',
        icon: '/logo/BX_4.png',
        data: payload.data || {},
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
