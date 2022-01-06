const cacheName = 'jdm-chat-v1';
const urlsToCache = [
    '../',
    '../public/css/style.css',

    '../public/js/main.js',

    './chat.html',
    './index.html',

    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css',
    
    'https://cdnjs.cloudflare.com/ajax/libs/qs/6.9.2/qs.min.js',

    '../public/icons/icon-16x16.png',
    '../public/icons/icon-32x32.png',
    '../public/icons/icon-64x64.png',
    '../public/icons/icon-128x128.png',
    '../public/icons/icon-144x144.png',
    '../public/icons/icon-256x256.png',
    '../public/icons/icon-512x512.png',
    '../public/icons/icon-1024x1024.png'
]

//  almacenar en cache 
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName) .then(cache => {
            return cache.addAll(urlsToCache)
            .then(() => self.skipWaiting())
        })
        .catch(err => console.log('Error trying to register cache'))
    )
});

//  una vez instalado, se activa y busca los recursos para que funcione sin conexion
self.addEventListener('activate', e => {
    const cacheWhiteList = [cacheName];
    e.waitUntil(
        caches.keys()
        .then(cachesNames => {
            cachesNames.map(cName => {
            //  se elimina lo que ya no necesita el cache
                if(cacheWhiteList.indexOf(cName) === -1){
                    return caches.delete(cName);
                }
            })
        })
        .then(() => self.clients.claim())
    )
});

//  responder con el objeto de la cache y buscar la url
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
        .then(res => {
            if(res){
                //  recupera del cache
                return res
            }
            return fetch(e.request)
        })
    )
});