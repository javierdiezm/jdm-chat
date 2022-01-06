const staticJDMChat = "jdm-chat-v1"
const assets = [
  "/",
  "/public/index.html",
  "/public/chat.html",
  "/public/css/style.css",
  "/public/js/main.js",
  "/utils/messages.js",
  "/utils/users.js",
  "/server.js"
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticJDMChat).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  })