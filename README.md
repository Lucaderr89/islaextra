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

## Questionario operativo

In `questionario/` c'è un questionario in 12 parti (55 domande) usato per raccogliere
le informazioni operative necessarie a impostare la costruzione della piattaforma.

Le risposte restano nel browser di chi compila (`localStorage`, si può interrompere
e riprendere) e alla fine si esportano in tre modi: copia negli appunti, download di
un file di testo e di un JSON, oppure apertura di WhatsApp con il testo già copiato.
Non c'è nessun server: nulla viene inviato automaticamente.

## Come aprirla

**In locale** — basta aprire `index.html` con un doppio clic. Nessun server,
nessuna installazione, nessuna dipendenza esterna.

**Online** — è una pagina statica, funziona su GitHub Pages così com'è.

## Struttura

    index.html                pagina della demo
    questionario/index.html   questionario operativo
    assets/img/logo.png       marchio (magenta, nero, calce)
    assets/css/style.css      stili della demo
    assets/css/quiz.css       stili del questionario
    assets/js/i18n.js         traduzioni ES / EN / IT
    assets/js/data.js         dati dimostrativi
    assets/js/app.js          matching, feed, wizard, calendario
    assets/js/quiz-data.js    domande del questionario
    assets/js/quiz.js         logica del questionario

Il matching lavora davvero sui dati: incrocia l'orario esatto richiesto con la
finestra di disponibilità di ogni lavoratore (turni che scavallano la mezzanotte
compresi), poi filtra per ruolo, zona e zone limitrofe, lingua, livello di fiducia
ed esperienza, e ordina per affidabilità.

## Identità

Direzione **CALÇ**: colori campionati dalla luce reale delle isole (calce, inchiostro,
terra rossa ferrosa, bougainvillea), tipografia Zodiak e Switzer, bordi netti e ombre
tagliate al posto di gradienti e angoli arrotondati. Il marchio è un cerchio tracciato
a mano con il segmento che rientra — il posto vuoto che viene coperto — con dentro la
figura di chi lo occupa.

Il magenta è riservato al marchio: nella pagina non compare altrove, così il logo
resta riconoscibile.

## Lingue

Spagnolo (predefinito), inglese e italiano, con selettore in alto a destra.

## Nota sui dati

Tutti i dati sono **dimostrativi**. Le persone e le attività sono di fantasia; le
zone di Eivissa e Formentera sono reali. Nessun dato appartiene a persone o
aziende esistenti.
