// Dono functionalities ko combine karne wali constants
const CACHE_NAME = 'digital-erp-cache-v2'; // Cache version badal dein taki naya SW install ho
const urlsToCache = [
  '/',
  '/index.html',
  '/indexphone.html',
  '/app.js', // Is file ko bhi cache karna zaroori hai
  // Agar aapke paas style.css hai to use yahan add karein, warna hata dein
  // '/style.css', 
  '/manifest.json',
  '/chatbot.html',
  // Agar aapke paas icon.png hai to use yahan add karein
  // '/icon.png'
];

const FOOTER_HTML_TO_INJECT = `
<style>
  #digital-erp-injected-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #1f2937; /* bg-slate-800 */
    color: #94a3b8; /* text-slate-400 */
    z-index: 999999999;
    padding: 8px 0;
    border-top: 1px solid #334155; /* border-slate-700 */
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    box-shadow: 0 -2px 10px rgba(0,0,0,0.3);
  }
  #digital-erp-injected-footer a {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #94a3b8;
    text-decoration: none;
    font-size: 10px;
    text-align: center;
    width: 60px;
    padding: 4px 0;
    transition: color 0.2s;
  }
  #digital-erp-injected-footer a:hover {
    color: #ffffff;
  }
  #digital-erp-injected-footer svg {
    width: 24px;
    height: 24px;
    margin-bottom: 4px;
  }
</style>
<div id="digital-erp-injected-footer">
    <a href="https://students1129.vercel.app" target="_blank" rel="noopener noreferrer" title="Student Login">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
        <span>Student</span>
    </a>
    <a href="https://admin1129.vercel.app" target="_blank" rel="noopener noreferrer" title="Teacher Login">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        <span>Teacher</span>
    </a>
    <a href="https://admin-six-puce.vercel.app/" target="_blank" rel="noopener noreferrer" title="Principal Login">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        <span>Principal</span>
    </a>
    <a href="https://agent-pi-rouge.vercel.app/" target="_blank" rel="noopener noreferrer" title="Admin Login">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-4.44a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.34"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"/></svg>
        <span>Admin</span>
    </a>
    <a href="https://premium-alpha.vercel.app" target="_blank" rel="noopener noreferrer" title="Premium Access">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <span>Premium</span>
    </a>
</div>
`;

// Install event: App shell ko cache karne ke liye
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate event: Purane cache ko saaf karne ke liye
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event: Requests ko handle karne ke liye
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // SCENARIO 1: Agar request external website ke liye hai (navigation)
  if (request.mode === 'navigate' && url.origin !== self.location.origin) {
    event.respondWith(
      (async () => {
        try {
          const networkResponse = await fetch(request);
          const contentType = networkResponse.headers.get('content-type') || '';

          // Sirf HTML pages ko modify karna hai
          if (contentType.includes('text/html')) {
            const originalHtml = await networkResponse.text();
            
            // Footer ko </body> tag se theek pehle inject karein
            const modifiedHtml = originalHtml.replace('</body>', `${FOOTER_HTML_TO_INJECT}</body>`);
            
            // Modified response return karein
            return new Response(modifiedHtml, {
              headers: networkResponse.headers,
              status: networkResponse.status,
              statusText: networkResponse.statusText,
            });
          }

          // Agar page HTML nahi hai, to original response bhej dein
          return networkResponse;
        } catch (error) {
          console.error('Service Worker: Fetching external page failed.', error);
          // Error hone par, browser ko normal request karne dein
          return fetch(request);
        }
      })()
    );
  } 
  // SCENARIO 2: Agar request aapke apne app ke assets ke liye hai
  else {
    event.respondWith(
      caches.match(request).then((response) => {
        // Cache se serve karo, agar nahi hai to network se fetch karo
        return response || fetch(request);
      })
    );
  }
});
