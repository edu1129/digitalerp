// Yeh code service worker ko browser me register karta hai.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(registration => {
        console.log('Digital ERP Service Worker registered successfully with scope: ', registration.scope);
      })
      .catch(error => {
        console.log('Digital ERP Service Worker registration failed: ', error);
      });
  });
}
