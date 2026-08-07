# Isla Extra — demo interattiva

Prototipo navigabile del funzionamento di **Isla Extra**, piattaforma di matching
per il lavoro non fisso a Eivissa e Formentera.

Serve a far vedere **come funziona il servizio**, non a presentarlo: chi apre la
pagina trova un servizio già in movimento e può provare le due parti del prodotto.

## Cosa si può provare

**Lato azienda**
1. Pubblicazione guidata: cosa serve, quando, dove, requisiti facoltativi.
2. Un contatore mostra in tempo reale quanti profili restano compatibili mentre si
   aggiungono requisiti.
3. Il motore avvisa i profili adatti, raccoglie le conferme e presenta solo chi ha
   già detto di sì. La scelta finale resta all'azienda.
4. Se nessuno corrisponde, la ricerca si allarga da sola; se ancora nulla, la
   richiesta passa alla persona di riferimento sull'isola.

**Lato lavoratore**
1. Profilo con livello di fiducia, punteggio, storico e competenze — distinte fra
   dichiarate e confermate sul lavoro.
2. Calendario a un tocco: settimana tipo più eccezioni sui prossimi giorni.
3. Proposta in arrivo, con accettazione o rifiuto. Rifiutare non incide mai sul
   punteggio.

## Come aprirla

**In locale** — basta aprire `index.html` con un doppio clic. Nessun server,
nessuna installazione, nessuna dipendenza esterna.

**Online** — è una pagina statica, funziona su GitHub Pages così com'è.

## Struttura

    index.html              pagina unica
    assets/css/style.css    stili
    assets/js/i18n.js       traduzioni ES / EN / IT
    assets/js/data.js       dati dimostrativi
    assets/js/app.js        matching, feed, wizard, calendario

Il matching lavora davvero sui dati: filtra per ruolo, zona, disponibilità reale,
lingua, livello di fiducia ed esperienza, poi ordina per affidabilità.

## Lingue

Spagnolo (predefinito), inglese e italiano, con selettore in alto a destra.

## Nota sui dati

Tutti i dati sono **dimostrativi**. Le persone e le attività sono di fantasia; le
zone di Eivissa e Formentera sono reali. Nessun dato appartiene a persone o
aziende esistenti.
