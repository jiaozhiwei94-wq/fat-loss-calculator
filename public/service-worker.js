// 缓存名称
const CACHE_NAME = 'rock-fat-loss-calculator-v1';

// 需要缓存的静态资源列表
const STATIC_ASSETS = [
  '/manifest.json',
  '/body_fatrate_man.jpg',
  '/body_fatrate_woman.jpg',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// 安装事件 - 缓存静态资源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('缓存已打开');
        return cache.addAll(STATIC_ASSETS);
      })
  );
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// fetch 事件 - 网络优先策略
self.addEventListener('fetch', (event) => {
  // 对于 index.html 和动态资源，优先从网络获取
  if (event.request.url.includes('index.html') || event.request.url.includes('/assets/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // 检查响应是否有效
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          return response;
        })
        .catch(() => {
          // 网络失败时，尝试从缓存获取
          return caches.match(event.request);
        })
    );
  } else {
    // 对于静态资源，优先从缓存获取
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) {
            return response;
          }
          // 缓存中没有时，从网络获取
          return fetch(event.request)
            .then((response) => {
              // 检查响应是否有效
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
              
              // 克隆响应，因为响应流只能使用一次
              const responseToCache = response.clone();
              
              // 将新的响应添加到缓存
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
              
              return response;
            });
        })
    );
  }
});