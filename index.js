const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

const publicVapidKey =
  "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
const privateVapidKey = "3KzvKasA2SoCxsp0iIG_o9B0Ozvl1XDwI63JRKNIWBM";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

// Subscribe Route
/**
 * We can do a query in postman, and service worker will work if browser is opened,
 * if not it will be in queue and will work when first time opening browser. and also it is required to send
 * request body before sending post query, it will be like this.
 * {"endpoint":"https://fcm.googleapis.com/fcm/send/eTsVtgv0QdE:APA91bHPWUmgl2qYx7rYJ53xeiNyWcnGWHVuOmrl03TWNBmD_rgajnhu52Mi-uAwggfHhqhlyHxnfViVEthFc3njADhJLgWp8LcKNPdL3Jr9RQY_gv2NDP-MTJDwmMHAjb_U6ZzvdI3f","expirationTime":null,"keys":{"p256dh":"BL-sOHjOJyF4wYU8wROaDclmQAcRWe3YinS6_cDEUKb3gV8FmqWMRUwZCIG4LkV5NTSRMXuFSnBlGh0v3obyURw","auth":"Zjjjt52PqVlsFAsSkKVnWQ"}}
 */
app.post("/subscribe", (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: "Push Test" });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
