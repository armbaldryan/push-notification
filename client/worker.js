console.log("Service Worker Loaded...");

self.addEventListener("push", event => {
  const data = event.data.json();
  console.log("Push Recieved...");
  event.waitUntil(self.registration.showNotification(data.title, {
    body: "Notified by HexActData",
    icon: "/tmlogo.png",
  }));
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  console.log('onClick event');
  console.log(clients)
  event.waitUntil(clients.openWindow("https://youtu.be/PAvHeRGZ_lA"));
});
