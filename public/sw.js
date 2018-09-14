//This is the "Offline page" service worker

importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-database.js');

firebase.initializeApp({
    databaseURL: "https://professor-oak-1b6bc.firebaseio.com",
});


//Install stage sets up the offline page in the cache and opens a new cache
self.addEventListener('install', function(event) {
  var offlinePage = new Request('offline.html');
  event.waitUntil(
    fetch(offlinePage).then(function(response) {
      return caches.open('pwabuilder-offline').then(function(cache) {
        console.log('[PWA Builder] Cached offline page during Install'+ response.url);
        return cache.put(offlinePage, response);
      });
  }));
});

//If any fetch fails, it will show the offline page.
//Maybe this should be limited to HTML documents?
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function(error) {
      console.error( '[PWA Builder] Network request Failed. Serving offline page ' + error );
      return caches.open('pwabuilder-offline').then(function(cache) {
        return cache.match('offline.html');
      });
    }
  ));
});

//This is a event that can be fired from your page to tell the SW to update the offline page
self.addEventListener('refreshOffline', function(response) {
  return caches.open('pwabuilder-offline').then(function(cache) {
    console.log('[PWA Builder] Offline page updated from refreshOffline event: '+ response.url);
    return cache.put(offlinePage, response);
  });
});

self.addEventListener('sync', event => {
    if (event.tag === 'updatePokedex') {
        event
            .waitUntil(persistLocalChanges()
            .then(() => self.registration.showNotification("Pokedex was updated"))
            .catch(() => {
                console.log("Error syncing pokedex");
            })
        );
    }
});

function getLocalRecords() {
    const request = indexedDB.open( 'oak-db', 1 );

     return new Promise((resolve, reject) => {
         request.onsuccess = function() {
             const db = this.result;
             const text = db.transaction( 'pokedex' ).objectStore( 'pokedex' ).getAll();
             text.onsuccess = () => resolve(text.result);
         };
    });
}

function persistLocalChanges() {
    return getLocalRecords()
        .then(records => {
            const firebaseDb = firebase.database();
            return records.forEach(pokemon => {
                const ref = firebaseDb
                    .ref(`pokedex/${pokemon.id}`);

                if (pokemon.add) {
                    return firebaseDb
                        .ref(`pokedex/${pokemon.id}`)
                        .set({
                                name: pokemon.name
                            },
                            (error) => {
                                if (error) {
                                    console.log("Update firebase db failed", error);
                                }
                            });
                } else {
                    return ref.remove();
                }
            });
        })
        .catch(error => console.log(error));
}
