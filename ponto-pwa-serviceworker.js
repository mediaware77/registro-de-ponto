const CACHE_NAME = 'registro-ponto-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo.svg',
  '/favicon.ico',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png'
];

// Instalação do Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Erro ao abrir cache:', error);
      })
  );
});

// Ativação do Service Worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Deletar caches antigos
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Estratégia de cache: Network First, fallback para cache
self.addEventListener('fetch', event => {
  // Não interceptar requisições para APIs
  if (event.request.url.includes('/api/') || 
      event.request.url.includes('exemplo.com')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Verificar se a resposta é válida
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clonar a resposta para armazenar no cache
        const responseToCache = response.clone();
        caches.open(CACHE_NAME)
          .then(cache => {
            cache.put(event.request, responseToCache);
          })
          .catch(error => {
            console.error('Erro ao armazenar em cache:', error);
          });

        return response;
      })
      .catch(() => {
        // Se falhar, tentar do cache
        return caches.match(event.request)
          .then(response => {
            if (response) {
              return response;
            }
            
            // Se não estiver no cache e não houver rede, retornar página offline
            if (event.request.mode === 'navigate') {
              return caches.match('/offline.html');
            }
            
            // Para outros recursos, retornar 404
            return new Response('Not found', {
              status: 404,
              statusText: 'Not found'
            });
          });
      })
  );
});

// Lidar com notificações push (se implementadas no futuro)
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body || 'Nova notificação recebida.',
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-72x72.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: '1'
      },
      actions: [
        {
          action: 'explore',
          title: 'Ver Detalhes'
        },
        {
          action: 'close',
          title: 'Fechar'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title || 'Registro de Ponto', options)
    );
  }
});

// Lidar com cliques em notificações
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'explore') {
    // Abrir o aplicativo
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});