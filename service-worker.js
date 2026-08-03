/* =========================================================
   KICKBASE LEAGUE – SERVICE WORKER
========================================================= */

const CACHE_VERSION = "kickbase-league-v1";

const OFFLINE_CACHE = [
    "/kickbase-league/",
    "/kickbase-league/index.html",
    "/kickbase-league/style.css",
    "/kickbase-league/script.js",
    "/kickbase-league/animations.js",
    "/kickbase-league/manifest.json",
    "/kickbase-league/kickbase-league-logo.png",
    "/kickbase-league/app-icon-192.png",
    "/kickbase-league/app-icon-512.png",
    "/kickbase-league/app-icon-maskable-512.png"
];


/* =========================================================
   INSTALLATION
========================================================= */

self.addEventListener("install", event => {

    event.waitUntil(

        caches
            .open(CACHE_VERSION)
            .then(cache => cache.addAll(OFFLINE_CACHE))
            .then(() => self.skipWaiting())

    );

});


/* =========================================================
   ALTE CACHE-VERSIONEN LÖSCHEN
========================================================= */

self.addEventListener("activate", event => {

    event.waitUntil(

        caches
            .keys()
            .then(cacheNames => {

                return Promise.all(

                    cacheNames
                        .filter(cacheName => {
                            return cacheName !== CACHE_VERSION;
                        })
                        .map(cacheName => {
                            return caches.delete(cacheName);
                        })

                );

            })
            .then(() => self.clients.claim())

    );

});


/* =========================================================
   ANFRAGEN
   Zuerst aktuelle Datei aus dem Internet laden.
   Nur bei fehlendem Internet auf den Cache zurückgreifen.
========================================================= */

self.addEventListener("fetch", event => {

    const request = event.request;

    if (request.method !== "GET") {
        return;
    }


    const requestUrl = new URL(request.url);


    /*
    Fremde Internetseiten und externe Dienste werden nicht
    dauerhaft durch diesen Service Worker gespeichert.
    */

    if (requestUrl.origin !== self.location.origin) {
        return;
    }


    event.respondWith(

        fetch(request)

            .then(networkResponse => {

                /*
                Nur erfolgreiche Antworten speichern.
                */

                if (
                    !networkResponse ||
                    networkResponse.status !== 200 ||
                    networkResponse.type === "opaque"
                ) {
                    return networkResponse;
                }


                const responseCopy =
                    networkResponse.clone();


                caches
                    .open(CACHE_VERSION)
                    .then(cache => {

                        cache.put(
                            request,
                            responseCopy
                        );

                    });


                return networkResponse;

            })

            .catch(() => {

                return caches
                    .match(request)
                    .then(cachedResponse => {

                        if (cachedResponse) {
                            return cachedResponse;
                        }


                        /*
                        Falls eine noch nie besuchte HTML-Seite offline
                        geöffnet wird, wird die Startseite angezeigt.
                        */

                        if (
                            request.headers
                                .get("accept")
                                ?.includes("text/html")
                        ) {

                            return caches.match(
                                "/kickbase-league/index.html"
                            );

                        }


                        return new Response(
                            "Inhalt ist momentan nicht verfügbar.",
                            {
                                status: 503,
                                statusText: "Offline",
                                headers: {
                                    "Content-Type":
                                        "text/plain; charset=utf-8"
                                }
                            }
                        );

                    });

            })

    );

});
