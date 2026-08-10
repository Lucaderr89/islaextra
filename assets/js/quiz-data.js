/* ==========================================================================
   Isla Extra — questionario operativo
   Ogni domanda sta qui perche' la risposta cambia qualcosa in cio' che
   costruiamo. Se una risposta non sposta una decisione, la domanda va tolta.
   ========================================================================== */

const IE_QUIZ = {

  meta: {
    title:    'Isla Extra — domande operative',
    subtitle: 'Servono a decidere come costruire la piattaforma. Nessuna risposta è sbagliata: dove non sai, scegli l’opzione più vicina e andiamo avanti.',
    time:     '10-15 minuti',
    note:     'Le risposte restano salvate su questo telefono mentre compili: puoi chiudere e riprendere. Alla fine le scarichi o le copi e me le mandi.'
  },

  sections: [

  /* ------------------------------------------------------------------ 1 */
  {
    id: 'oggi',
    title: 'Come funziona oggi',
    intro: 'Serve a capire i ritmi reali del lavoro extra sulle isole, perché da qui dipende quanto deve essere veloce la piattaforma.',
    questions: [
      { id:'preavviso', type:'single', required:true,
        q:'Con quanto preavviso arrivano di solito le richieste dei locali?',
        hint:'Se la maggior parte arriva in poche ore, tutto il prodotto va costruito sulla velocità.',
        options:['Poche ore, stesso giorno','Il giorno prima','2-3 giorni prima','Una settimana o più','Molto variabile'] },

      { id:'durata', type:'single', required:true,
        q:'Quanto dura in media un turno extra?',
        options:['Meno di 3 ore','3-5 ore','5-8 ore','Più di 8 ore','Molto variabile'] },

      { id:'volume_alta', type:'short', required:true,
        q:'Quante richieste pensi arriveranno a settimana in alta stagione?',
        hint:'Anche una stima approssimativa va bene: serve a dimensionare il sistema.',
        placeholder:'es. 30-40' },

      { id:'volume_inverno', type:'short', required:true,
        q:'E in inverno, a settimana?',
        placeholder:'es. 5-8' },

      { id:'scoperti', type:'single', required:true,
        q:'Oggi quanto spesso capita che un locale cerchi qualcuno e non trovi nessuno?',
        hint:'È il problema che risolviamo: se capita spesso, è lì che sta il valore.',
        options:['Quasi mai','Qualche volta al mese','Ogni settimana','Più volte a settimana','Continuamente'] }
    ]
  },

  /* ------------------------------------------------------------------ 2 */
  {
    id: 'orari',
    title: 'Orari e disponibilità',
    intro: 'Hai detto che servono orari precisi, tipo 22:30-02:30. Qui definiamo esattamente come devono funzionare.',
    questions: [
      { id:'orari_esatti', type:'single', required:true,
        q:'Il locale deve indicare ora esatta di inizio e fine?',
        hint:'Le fasce mattina/pomeriggio/sera resterebbero solo come filtro veloce nella ricerca.',
        options:[
          'Sì, sempre ora esatta',
          'Ora esatta di inizio, la fine può essere indicativa',
          'Basta la fascia oraria',
          'Ora esatta, ma con possibilità di scrivere “circa”'] },

      { id:'mezzanotte', type:'single', required:true,
        q:'Quanto spesso i turni scavallano la mezzanotte?',
        hint:'Cambia il modo in cui il sistema conta i giorni e incrocia le disponibilità.',
        options:['Mai o quasi','Raramente','Spesso','Quasi sempre in alta stagione'] },

      { id:'disp_worker', type:'single', required:true,
        q:'Come deve dichiarare la propria disponibilità il lavoratore?',
        hint:'Deve incrociarsi con richieste a orario preciso, quindi va deciso bene.',
        options:[
          'Orari precisi per ogni giorno (es. lun 10:00-15:00)',
          'Da che ora in poi è libero (es. lun dalle 20 in poi)',
          'Solo fasce: mattina / pomeriggio / sera',
          'Fasce per la settimana tipo, più orari precisi quando serve'] },

      { id:'due_turni', type:'single', required:true,
        q:'Un lavoratore può accettare due turni diversi nello stesso giorno?',
        options:['Sì, se gli orari non si sovrappongono','Sì sempre, decide lui','No, uno al giorno','Da valutare caso per caso'] },

      { id:'anticipo_min', type:'single', required:true,
        q:'Fino a quanto tempo prima del turno ha senso tenere aperta una ricerca?',
        options:['Anche 30 minuti prima','Almeno 2 ore prima','La mattina per la sera','Almeno 24 ore prima','Non deve esserci un limite'] }
    ]
  },

  /* ------------------------------------------------------------------ 3 */
  {
    id: 'ruoli',
    title: 'Ruoli e mestieri',
    intro: 'Definiamo il catalogo dei lavori da coprire al lancio.',
    questions: [
      { id:'ruoli_top', type:'multi', max:5, required:true,
        q:'Quali sono i ruoli più richiesti? Scegline al massimo 5.',
        options:['Cameriere di sala','Barman','Cuoco','Aiuto cucina','Lavapiatti','Reception','Pulizie e ai piani','Elettricista','Giardiniere','Manutenzione','Autista','Animazione','Sicurezza','Hostess e promoter'] },

      { id:'ruoli_mancanti', type:'text', required:false,
        q:'Ci sono mestieri richiesti sulle isole che non abbiamo previsto?',
        placeholder:'Scrivi quelli che ti vengono in mente' },

      { id:'tecnici_come', type:'single', required:true,
        q:'I servizi tecnici (elettricista, idraulico, giardiniere) come vengono richiesti?',
        hint:'Un intervento non è un turno: cambia il modo di pubblicare e di pagare.',
        options:[
          'Come intervento: “vieni a sistemare una cosa”',
          'Come turno a ore, come in hostelería',
          'Tutti e due, dipende dal caso',
          'Per ora non li facciamo'] },

      { id:'squadre', type:'single', required:true,
        q:'Capita di dover cercare più persone insieme per lo stesso servizio?',
        hint:'Es. 3 camerieri per un matrimonio. Se capita spesso, la richiesta multipla entra nel primo lancio.',
        options:['Sì, spesso','Ogni tanto','Raramente','Quasi mai'] }
    ]
  },

  /* ------------------------------------------------------------------ 4 */
  {
    id: 'verifica',
    title: 'Iscrizione e verifica',
    intro: 'La verifica fatta da te è il cuore del progetto. Qui la trasformiamo in un processo ripetibile.',
    questions: [
      { id:'documenti', type:'multi', required:true,
        q:'Quali documenti chiediamo obbligatoriamente a un lavoratore?',
        options:['Documento di identità o passaporto','NIE','Permesso di lavoro','Numero di Seguridad Social','Curriculum','Referenze con contatto telefonico','Certificado de manipulador de alimentos','Foto del profilo'] },

      { id:'senza_nie', type:'single', required:true,
        q:'Accettiamo chi non ha ancora NIE o permesso di lavoro?',
        hint:'Domanda delicata, ma va decisa prima: cambia chi può iscriversi.',
        options:[
          'No, senza documenti in regola non entra',
          'Sì, ma resta segnalato e non riceve proposte finché non regolarizza',
          'Sì, decidiamo caso per caso',
          'Non lo so, va approfondito'] },

      { id:'chi_verifica', type:'single', required:true,
        q:'Chi fa materialmente la verifica dei profili?',
        options:['Solo io','Io e un’altra persona','Io adesso, ma va delegata presto','Da definire'] },

      { id:'tempo_verifica', type:'single', required:true,
        q:'Quanto tempo ti serve per verificare un profilo?',
        hint:'Serve a capire quanti iscritti riusciamo a smaltire al giorno.',
        options:['Meno di 5 minuti','5-15 minuti','15-30 minuti','Più di 30 minuti','Dipende da quanto lo conosco'] },

      { id:'come_provato', type:'multi', required:true,
        q:'Cosa deve succedere perché un lavoratore diventi “Provato da noi”?',
        hint:'È il livello in cui ci mettiamo la faccia: definiamo quando si guadagna.',
        options:[
          'L’ho conosciuto di persona',
          'Ha lavorato bene diverse volte tramite la piattaforma',
          'Ho parlato con chi lo ha avuto prima',
          'Ha fatto una prova pratica',
          'Ha i titoli o le abilitazioni del mestiere'] },

      { id:'rimozione', type:'multi', required:true,
        q:'Per quali motivi un lavoratore va rimosso dalla piattaforma?',
        options:[
          'Non si presenta più volte senza avvisare',
          'Comportamento grave con i clienti',
          'Ha dichiarato competenze che non ha',
          'Documenti falsi',
          'Si accorda fuori piattaforma per evitarci',
          'Indice di affidabilità troppo basso a lungo'] }
    ]
  },

  /* ------------------------------------------------------------------ 5 */
  {
    id: 'indice',
    title: 'Indice di affidabilità',
    intro: 'Hai detto: mostrare solo l’indice, mai chi ha valutato e quanto. Qui decidiamo che forma ha.',
    questions: [
      { id:'forma_indice', type:'single', required:true,
        q:'Che forma deve avere l’indice mostrato ai locali abbonati?',
        options:[
          'Un numero da 0 a 100',
          'Stelle da 1 a 5, come media',
          'Una fascia: alto / medio / da verificare',
          'Una barra colorata, senza numero'] },

      { id:'worker_vede', type:'single', required:true,
        q:'Il lavoratore vede il proprio indice?',
        hint:'Se non lo vede non può migliorarlo; se vede troppo, può risalire a chi lo ha valutato.',
        options:[
          'Sì, e vede anche cosa lo fa salire o scendere',
          'Sì, solo il numero',
          'No, lo vede solo chi cerca personale',
          'Lo vede solo se lo chiede a noi'] },

      { id:'worker_vede_giudizi', type:'single', required:true,
        q:'Il lavoratore può leggere i giudizi ricevuti, senza sapere da chi?',
        options:['Sì, in forma anonima','Solo un riassunto generale','No, soltanto l’indice','Non lo so'] },

      { id:'nuovo_iscritto', type:'single', required:true,
        q:'Un nuovo iscritto che non ha ancora lavorato, che indice ha?',
        hint:'È il problema di chi comincia: se parte da zero non lo sceglie nessuno, e non parte mai.',
        options:[
          'Nessun indice: si mostra “nuovo”',
          'Parte da un valore medio',
          'Parte alto e può solo scendere',
          'Parte dal livello di verifica che gli ho dato io'] },

      { id:'peso_noshow', type:'scale', required:true,
        q:'Quanto deve pesare un mancato arrivo senza avvisare?',
        hint:'1 = è un errore come un altro. 5 = è la cosa più grave in assoluto.',
        labels:['Poco','Moltissimo'] },

      { id:'worker_valuta', type:'single', required:true,
        q:'Anche il lavoratore valuta il locale?',
        hint:'Es. ha pagato come pattuito, ha rispettato gli orari. Serve a tenersi i lavoratori migliori.',
        options:[
          'Sì, e i lavoratori vedono l’indice dei locali',
          'Sì, ma l’indice del locale lo vediamo solo noi',
          'No, valutano solo i locali',
          'Da decidere più avanti'] }
    ]
  },

  /* ------------------------------------------------------------------ 6 */
  {
    id: 'richieste',
    title: 'Richieste e proposte',
    intro: 'Come si comporta il sistema tra la pubblicazione e la scelta finale, che resta sempre al locale.',
    questions: [
      { id:'quanti_candidati', type:'single', required:true,
        q:'Quanti candidati deve vedere il locale per ogni richiesta?',
        options:['I 3 migliori','I 5 migliori','Tutti quelli disponibili','Uno alla volta, finché non accetta'] },

      { id:'tempo_risposta', type:'single', required:true,
        q:'Quanto tempo ha il lavoratore per rispondere a una proposta?',
        hint:'Passato quel tempo la proposta passa al profilo successivo.',
        options:['15 minuti','30 minuti','1 ora','3 ore','Dipende da quanto manca al turno'] },

      { id:'ricorrenti', type:'single', required:true,
        q:'Capita che serva la stessa persona per turni che si ripetono?',
        hint:'Es. ogni sabato sera. Se sì, mettiamo il pulsante “ripeti la richiesta”.',
        options:['Sì, spesso','Ogni tanto','Raramente','Quasi mai'] },

      { id:'nome_locale', type:'single', required:true,
        q:'Il lavoratore vede il nome del locale prima di accettare?',
        hint:'Se lo vede sceglie meglio, ma potrebbe contattarlo direttamente saltandoci.',
        options:[
          'Sì, sempre',
          'No: solo zona e tipo di locale finché non c’è il match',
          'Lo vede solo chi ha già lavorato tramite noi',
          'Non lo so'] }
    ]
  },

  /* ------------------------------------------------------------------ 7 */
  {
    id: 'compenso',
    title: 'Compenso',
    intro: 'Il pagamento resta tra locale e lavoratore, ma dobbiamo decidere cosa mostriamo.',
    questions: [
      { id:'compenso_obbligatorio', type:'single', required:true,
        q:'Il compenso va sempre indicato nell’annuncio?',
        options:['Sì, sempre obbligatorio','Facoltativo, ma consigliato','No, si accordano tra loro','Obbligatorio solo per certi ruoli'] },

      { id:'compenso_come', type:'single', required:true,
        q:'Come si esprime il compenso?',
        options:['Tariffa oraria','Totale per il turno','Tutti e due','Dipende dal mestiere'] },

      { id:'tariffe_tipiche', type:'text', required:true,
        q:'Quali sono oggi le tariffe orarie reali per i ruoli principali?',
        hint:'Serve a proporre valori sensati e a non far pubblicare offerte fuori mercato.',
        placeholder:'es. cameriere 12-14 EUR/h, cuoco 15-18 EUR/h, lavapiatti 11 EUR/h' },

      { id:'tariffa_minima', type:'single', required:true,
        q:'Vuoi che la piattaforma impedisca offerte sotto una certa tariffa?',
        options:['Sì, con un minimo per ruolo','Solo un avviso, senza bloccare','No, libertà totale','Non lo so'] }
    ]
  },

  /* ------------------------------------------------------------------ 8 */
  {
    id: 'abbonamento',
    title: 'Abbonamento',
    intro: 'È l’unica fonte di ricavo: il lavoratore non paga mai e non tratteniamo nulla sui turni.',
    questions: [
      { id:'prezzo', type:'single', required:true,
        q:'Quanto pensi che un locale sia disposto a pagare al mese?',
        options:['Meno di 50 EUR','50-100 EUR','100-150 EUR','150-250 EUR','Più di 250 EUR','Dipende molto dal locale'] },

      { id:'formula', type:'single', required:true,
        q:'Quale formula funziona meglio qui?',
        hint:'Molti locali lavorano solo mezzo anno.',
        options:[
          'Stagionale, pagato in una volta (aprile-ottobre)',
          'Mensile, disdicibile quando vuoi',
          'Annuale con sconto',
          'Stagionale più una formula ridotta per l’inverno'] },

      { id:'prova', type:'single', required:true,
        q:'Serve un periodo di prova gratuito?',
        options:['Sì, un mese','Sì, ma solo le prime 2-3 richieste','No, si paga da subito','Solo per chi porta altri locali'] },

      { id:'incasso', type:'multi', required:true,
        q:'Come incassiamo l’abbonamento?',
        hint:'Qui i locali hanno abitudini precise: meglio saperlo prima di scegliere gli strumenti.',
        options:['Carta online','Bonifico','Contanti a te','Domiciliazione bancaria','Non lo so ancora'] },

      { id:'fattura', type:'single', required:true,
        q:'I locali chiederanno fattura?',
        hint:'Se sì, serve un’impresa o un autonomo che la emetta fin dal primo incasso.',
        options:['Sì, sempre','Quasi sempre','Solo alcuni','Raramente'] }
    ]
  },

  /* ------------------------------------------------------------------ 9 */
  {
    id: 'contatti',
    title: 'La tua rete',
    intro: 'I 2000 contatti sono il vantaggio più grande che abbiamo. Vediamo come usarli.',
    questions: [
      { id:'formato_contatti', type:'multi', required:true,
        q:'Dove sono conservati oggi i contatti?',
        options:['Rubrica del telefono','Gruppi WhatsApp','Fogli Excel o Google','Quaderno o appunti','Nella mia testa','Social: Instagram, Facebook'] },

      { id:'quanti_worker', type:'short', required:true,
        q:'Quanti sono lavoratori, più o meno?',
        placeholder:'es. 1500' },

      { id:'quante_aziende', type:'short', required:true,
        q:'E quante sono attività e locali?',
        placeholder:'es. 400' },

      { id:'iscritti_primo_mese', type:'short', required:true,
        q:'Quanti pensi si iscriverebbero davvero nel primo mese?',
        hint:'Meglio una stima prudente: serve a capire se partiamo con abbastanza persone.',
        placeholder:'es. 150 lavoratori e 20 locali' },

      { id:'come_contattare', type:'single', required:true,
        q:'Come li contatteresti per il lancio?',
        options:['Messaggio WhatsApp uno a uno','Broadcast o lista WhatsApp','Nei gruppi che già esistono','Di persona, girando i locali','Un misto di questi'] }
    ]
  },

  /* ----------------------------------------------------------------- 10 */
  {
    id: 'comunicazione',
    title: 'Come avvisiamo le persone',
    intro: 'Se la notifica non arriva davvero, tutto il resto non serve a niente.',
    questions: [
      { id:'canale_worker', type:'single', required:true,
        q:'Con quale canale avvisiamo un lavoratore che c’è una proposta?',
        hint:'Deve essere quello che guarda davvero entro pochi minuti.',
        options:['WhatsApp','SMS','Notifica della piattaforma','Chiamata telefonica','WhatsApp più notifica'] },

      { id:'lingue_worker', type:'multi', required:true,
        q:'Che lingue parlano i lavoratori della tua rete?',
        options:['Spagnolo','Italiano','Inglese','Rumeno','Arabo','Francese','Tedesco','Altre'] },

      { id:'lingue_locali', type:'multi', required:true,
        q:'E i titolari dei locali?',
        options:['Spagnolo','Italiano','Inglese','Catalano','Tedesco','Altre'] },

      { id:'app_o_web', type:'single', required:true,
        q:'Secondo te le persone installerebbero un’app?',
        hint:'Oggi il piano è una pagina web che si aggiunge alla schermata del telefono, senza passare dallo store.',
        options:[
          'No, meglio evitare qualsiasi installazione',
          'I lavoratori sì, i locali no',
          'Sì, se serve davvero la installano',
          'Non lo so'] }
    ]
  },

  /* ----------------------------------------------------------------- 11 */
  {
    id: 'priorita',
    title: 'Priorità e limiti',
    intro: 'Ultima parte pratica: serve a decidere cosa entra nella prima versione e cosa aspetta.',
    questions: [
      { id:'indispensabili', type:'multi', max:4, required:true,
        q:'Quali funzioni sono indispensabili al primo lancio? Massimo 4.',
        hint:'Tutto il resto può arrivare dopo. Scegliere poco all’inizio significa partire prima.',
        options:[
          'Pubblicare una richiesta con orario preciso',
          'Calendario disponibilità del lavoratore',
          'Proposte automatiche ai profili compatibili',
          'Catalogo consultabile dei lavoratori',
          'Indice di affidabilità',
          'Valutazione dopo il turno',
          'Richieste per più persone insieme',
          'Abbonamenti e pagamenti online',
          'Pannello per te, per verificare i profili',
          'Notifiche WhatsApp'] },

      { id:'tempo_giorno', type:'single', required:true,
        q:'Quanto tempo al giorno puoi dedicare alla piattaforma?',
        hint:'Verifiche dei profili, richieste rimaste scoperte, rapporti con i locali.',
        options:['Meno di 1 ora','1-2 ore','2-4 ore','Più di 4 ore','Dipende dalla stagione'] },

      { id:'reperibilita', type:'single', required:true,
        q:'In che orari sei raggiungibile quando una richiesta resta scoperta?',
        options:['Solo la mattina','Tutto il giorno fino a sera','Anche la notte in alta stagione','Orari fissi da concordare'] },

      { id:'non_fare', type:'text', required:true,
        q:'Cosa la piattaforma non deve fare assolutamente?',
        hint:'Anche cose che darebbero fastidio a te o che allontanerebbero i locali che conosci.',
        placeholder:'Scrivi liberamente' }
    ]
  },

  /* ----------------------------------------------------------------- 12 */
  {
    id: 'aperte',
    title: 'Tre domande libere',
    intro: 'Qui vale più la tua esperienza sul campo che qualsiasi ragionamento a tavolino.',
    questions: [
      { id:'non_previsto', type:'text', required:true,
        q:'Cosa ti hanno chiesto i locali che non abbiamo previsto?',
        placeholder:'Anche piccole cose pratiche' },

      { id:'no_locale', type:'text', required:true,
        q:'Qual è la cosa che farebbe dire “non mi serve” a un locale?',
        placeholder:'Il motivo più probabile per cui non si abbonerebbe' },

      { id:'no_worker', type:'text', required:true,
        q:'E la cosa che farebbe smettere di usarla a un lavoratore?',
        placeholder:'Il motivo più probabile per cui smetterebbe' }
    ]
  }

  ]
};
