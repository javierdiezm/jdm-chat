if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./swaux.js')
    .then(reg => console.log('Successful ServiceWorker registration', reg))
    .catch(err => console.warn('Error trying to register ServiceWorker', err))
}