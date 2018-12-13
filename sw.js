const urls = ['/styles.css', '/', 'https://fonts.googleapis.com/icon?family=Material+Icons']

self.addEventListener('install', async event => {
  console.log('The SW is now installed')
  const cache = await caches.open('activityCache')
  event.waitUntil(cache.addAll(urls))
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        // The request is in the cache
        return response
      } else {
        // We need to go to the network
        return fetch(event.request)
      }
    })
  )
})
