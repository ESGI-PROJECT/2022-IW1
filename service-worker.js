console.log("Service Worker loaded !");

const CACHE_NAME = "v1";

const excludeFromCache = ["localhost:3000", "www.google.com"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      cache.addAll([
        "/",
        "/src/views/app-product.js",
        "/src/assets/css/product.css",
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (excludeFromCache.includes(url.host)) return;

  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).then((response) => {
          const clonedResponse = response.clone();
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(event.request, clonedResponse));

          return response;
        })
      );
    })
  );
});
