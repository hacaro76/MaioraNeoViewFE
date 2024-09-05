# ab-neo-view

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run electron:serve
```

### Compiles and minifies for production
```
npm run electron:build
```

### Publish for production
```
npm run electron:publish
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Version 0.2.6

- downgrade Electron version to 21.4.4 due to local video streaming bug

### Version 0.2.5

- ripristinato logo nero
- plugin upgrade

### Novità in versione 0.2

Settings:

- implementato User login al primo accesso
- richiesta nuovo login dopo 1 mese
- dati di accesso pre-compilati se è memorizzato un solo user
- possibilità di modifica username / password
- memorizzazione criptata dei dati di accesso
- selezione monitor di proiezione (se più di 1)
- implementata vista fullscreen / non fullscreen
- implementato il caricamento su CMS degli screensaver

Home page:

- nuova immagine Home page
- icona settings in alto a destra

    La prima volta che si avvia l'app viene effettuato un controllo delle modifiche e avvisa se ce ne sono.
    A partire dal secondo avvio nello stesso giorno, l'app si avvia senza mostrare la pagina setting.
    Volendo si può impostare un intervallo di controllo diverso (tot ore anzichè 1 giorno)

Yachts:

- visualizzazione barche in base ai permessi utente
- aggiunti Virtual Tour esterni
- aggiunto pulsante virtual tour
- aggiunta linea "Delivered Custom Yacht"
- documenti Yachts non su Dropbox

    implementato il caricamento su CMS dei documenti relativi alle barche e lo scaricamento in locale
    caricato tutti i documenti dei vari Yacht, esclusi gli scafi aggiuntivi e gli Yacht Concept utilizzati per la versione cliente (di questi ho caricato solo Project ORO)

Heritage:

- sezione Heritage: pagina con scelta tra Book e video
- sezione Heritage: contenuto offline
- vista fullscreen di Heritage book (solo su schermi HD)
- touch swipe su Heritage book

Varie:

- implementato auto-aggiornamento applicazione
- implementato controllo aggiornamenti prima di lancio applicazione => avvio diretto se aggiornato
- salvataggio log per data
- controllato funzionamento offline
- implementato scaricamento documenti offline
- corretta visualizzazione offline
