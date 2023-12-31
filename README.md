# PAWM-v1.1

SCOPO

StudyTracker è un diario virtuale per tenere traccia dell'andamento delle proprie sessioni di studio, lavoro... quindi, più in generale, delle proprie sessioni di concentrazione. Con i dati raccolti, l'utente potrà analizzare le proprie performances e agire di conseguenza per aumentare la propria produttività. 


FUNZIONALITÀ

Di default, l'utente viene accolto nella welcome page e ha la possibilità di navigare tra 4 sezioni:
- create session: in questa sezione l'utente può impostare un timer in base a quanti minuti vorrà concentrarsi. La sessione verrà salvata e l'utente potrà assegnarle un titolo per riconoscerla.
- let's work: in questa sezione l'utente visualizza tutte le sessioni create e può scegliere di avviarne una. Dopo aver premuto start, avrà la possibilità di specificare tutte le tasks da completare entro lo scadere del timer. Alla fine della sessione, l'utente traccia le sue performaces (creando una entry nel suo diario virtuale) speficiando quali obiettivi ha raggiunto e quale livello di concentrazione ha mantenuto mentre, per esempio, studiava.
- dashboard: in questa sezione l'utente visualizza su tre grafici lineari i dati di tutte le sue entries su scala giornaliera, settimanale ed annuale. Sui valori relativi al livello di concentrazione e alla percentuale di tasks completate viene calcolata la media, mentre viene calcolata la somma sui dati relativi ai minuti di focus.
- learning how to learn: in questa sezione l'utente ha a disposizione alcuni link relativi a corsi online e articoli sull'apprendimento.


TECNOLOGIE

L'applicazione è strutturata come una Single Page Application realizzata con un frontend in Angular e un backend in Spring Boot collegato ad un Database MySQL. Il build system è effettuato con Gradle.


BACKEND

Nello specifico, per quanto riguarda la parte di backend, esso gestisce la comunicazione tra il fronted e il database, costruendo e aggiornando le principali tabelle:
- Entry: questa entity ha lo scopo di conservare i dati di performance dell'utente raccolti alla fine della sessione. La sua chiave primaria (id) viene generata automaticamente, mentre la prima parte di attributi, quelli relativi ai dati (quality, quantity, completedTasks), vengono ricevuti dal frontend. La seconda parte di attributi, invece, ha lo scopo di conservare le coordinate temporali dell'istante in cui i dati vengono raccolti (year, dayOfTheYear, hourOfTheDay...) e questi vengono inizializzati direttamente dal backend. L'EntryController espone un solo endpoint, chiamato createEntry che, dopo aver ricevuto una Entry, vi inserisce le informazioni del timestamp e infine aggiorna il database. L'EntryRepository implementa le query necessarie per estrarre dal db tutti i dati richiesti dalla dashboard.
- Session: questa entity ha lo scopo di rappresentare la session, conservando il suo nome e la sua durata. SessionController espone due endpoint, createSession e getAllUserSessions, rispettivamente per ricevere la session dal backend e restituire tutte le sessions create da un certo utente.
Privo di relativa entity, c'è poi il DashboardController che espone tre endpoint con lo scopo di restituire i dati da visualizzare nei grafici della dashboard. Questi endpoint eseguono prima le query della EntryRepository, poi filtrano i dati a seconda delle richieste del frontend e infine restituiscono questi ultimi sotto forma di array di interi.


FRONTEND

Il frontend è realizzato in Angular. Segue il modello MVC. Il modello stabilisce i campi da rispettare, il view (il documento html) è quello che viene visualizzato all'utente ed è manipolato dal controller (il component - annotato con @Component).

Nella nostra applicazione ci sono diversi componenti che interagiscono l'uno con l'altro, svolgendo compiti insieme o individualmente, allo scopo di produrre il fine desiderato. 
Uno dei componenti principali è la sessionComponent. Essendo un componente di importanza centrale altri componenti potrebbero aver bisogno di conoscere le informazioni riportate al suo interno. Un esempio sarebbe il caso di un timer che deve partire. Il TimerComponent deve sapere quale session è stato appena selezionato in modo da sapere per quanti minuti deve contare, quindi, questa informazione deve viaggiare da un componente all'altro. Il modo usato per risolvere questa necessità è un dataSharingService - un service che ha lo scopo di trasportare informazioni utili tra componenti diversi - Insieme al routing. Il routing è fondamentale per il funzionamento dell'applicazione perché tramite essa si decide quale componente/view deve essere mostrato e dove.
Essendo una single page application tutto il contenuto viene caricato fin da subito al primo caricamento. Avendo però una parte di statistica per tracciare il proprio performance nello studio, devono essere visualizzati ad ogni caricamento i dati più recenti. Abbiamo scelto di non implementare una soluzione in cui i dati si aggiornano ad intervalli prefissati perchè non abbiamo veramente bisogno di questi dati in tempo reale. Oltre ai dati per la statistica si deve anche avere ogni sessione al momento disponibile per l'utente. In questo modo le pagine sono sempre aggiornate alla navigazione. 
Per disegnare i grafici sono state usate le librerie angular-highcharts e highcharts.
Alla fine di una sessione i dati vengono tracciati e spediti al backend per la permanenza.


WEB SECURITY

La parte di web security viene realizzata utilizzando Spring Security lato backend. Nello specifico, sono stati implementati 6 flow:
1) registrazione: quando l'utente imposta la password, di questa si misura la forza attraverso uno strength meter e, se risulta media o forte, allora l'utente può registrarsi, altrimenti no. Username e password vengono poi diretti ad un endpoint non protetto per essere salvati nel database. La password viene automaticamente codificata da BCryptPasswordEncoder prima di essere salvata. Spring Security parametrizza le query evitando la concatenazione di stringhe e quindi una possibile vulnerabilità alle SQL injections. Al momento, lo string sanitizing non viene fatto in quanto gli utenti sono isolati (per esempio, non possono comunicare con commenti), l'unica sessione che possono manomettere è la propria.
2) login (autenticazione/autorizzazione): l'utente inserisce le credenziali che vengono dirette ad un endopoint non protetto per essere intercettate dalla SecuirtyFilterChain. Quest'ultima esegue una collezione di filtri incluso il filtro da noi implementato ed inserito in una specifica posizione della catena di chiamate. L'utente viene riconosciuto quando vengono superati tutti i filtri e ottiene una coppia di token che gli consentiranno di accedere agli endpoint protetti. Nello specifico riceve un jwt access token valido per 4 ore e un refresh token valido per 16, entrambi vengono salvati nel session storage del browser.
3) accesso ad una risorsa protetta: quando l'utente esegue una chiamata verso un endpoint protetto, il frontend la intercetta e vi inserisce il jwt. Quando la chiamata raggiunge il backend quest'ultimo controlla la presenta del jwt, che appartenga all'utente corretto e che sia ancora valido. Se questi controlli vengono superati, l'utente riceve le risorse, altrimenti riceve un errore, per esempio un 403 forbidden (jwt assente) o un 500 server error (jwt scaduto)
4) token refresh: l'utente richiede una risorsa protetta ma il jwt è scaduto, perciò il frontend intercetta il 500 server error generato dal backend, chiama la procedura di refresh e poi ritenta la chiamata appena fallita. La procedura di refresh prevede che il backend riceva il jwt scaduto e il refresh token e restituisca sia un nuovo jwt che un nuovo refresh token
5) logout: l'utente esegue il logout cliccando sull'apposito pulsante, il frontend quindi intercetta la chiamata e vi inserisce il jwt. Il backend valida il jwt e rimuove il refresh token dal database. Se il jwt è scaduto si esegue la procedura di refresh come descritto poch'anzi
6) Refresh token scaduto: il frontend esegue la procedura di refresh ma il refresh token è scaduto, il backend allora lo rimuove dal database e restituisce un 410 gone error. Questo errore viene catturato da un interceptor del frontend che successivamente svuota il session storage dove erano contenuti i token.
