// 全站 PWA Service Worker 離線快取與離線瀏覽處理器
const CACHE_NAME = 'hanjohn-profile-pwa-v1'

// 預先快取的基礎核心檔案
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './favicon.ico'
]

// Service Worker 安裝事件：預先快取核心資源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS)
    }).then(() => {
      return self.skipWaiting()
    })
  )
})

// Service Worker 激活事件：清理舊版本快取
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache)
          }
        })
      )
    }).then(() => {
      return self.clients.claim()
    })
  )
})

// Service Worker 請求攔截事件：優先從網路獲取，失敗時回退至本地快取 (Network-First with Cache Fallback)
self.addEventListener('fetch', (event) => {
  // 僅處理同源 GET 請求，忽略 API 與外連 HTTP 請求
  if (event.request.method !== 'GET') return
  if (!event.request.url.startsWith(self.location.origin)) return

  event.respondWith(
    fetch(event.request).then((networkResponse) => {
      // 網路請求成功，複製一份存入快取並返回
      if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
        const responseToCache = networkResponse.clone()
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache)
        })
      }
      return networkResponse
    }).catch(() => {
      // 網路斷線或請求失敗，從快取讀取
      return caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse
        }
        // 若為頁面導向請求，返回 index.html
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html')
        }
      })
    })
  )
})
