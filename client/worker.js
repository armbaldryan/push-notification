console.log("Service Worker Loaded...");

/**
 * event.waitUntil is for asynchronous.
 */
self.addEventListener("push", event => {
  const data = event.data.json();
  console.log("Push Recieved...");
  event.waitUntil(self.registration.showNotification(data.title, {
    body: "Notified by HexActData",
    icon: "/tmlogo.png",
  }));
});

self.addEventListener('notificationclick', function (event) {
  /**
   * We are closing notification window and open a link
   */
  event.notification.close();
  console.log('onClick event');
  event.waitUntil(clients.openWindow("https://hexometer.com"));
});
