const C='rk-v11',A=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin)return;
const nav=r.mode==='navigate'||u.pathname.endsWith('/')||u.pathname.endsWith('index.html');
e.respondWith(nav?fetch(r).then(n=>{const c=n.clone();caches.open(C).then(x=>x.put(r,c));return n}).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))):caches.match(r).then(m=>m||fetch(r).then(n=>{if(n.ok){const c=n.clone();caches.open(C).then(x=>x.put(r,c))}return n})))});
