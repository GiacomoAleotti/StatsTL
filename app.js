const rosaSquadraList = document.getElementById('rosa-squadra');
const convocatiList = document.getElementById('convocati');
const playersInField = document.getElementById('players-in-field-campo');
const statsButtons = document.getElementById('buttons-container');
const statsTable = document.getElementById('stats-body');
const startGameButton = document.getElementById('start-game');
const saveGameButton = document.createElement('button');
const undoButton = document.createElement('button');
const sostituisciButton = document.createElement('button');

// Dati giocatori
const giocatori = {
    3: 'Albe',
    6: 'Meluz',
    7: 'Rama',
    8: 'Tony',
    10: 'ToroBedo',
    12: 'Eliseo',
    13: 'Matte',
    14: 'Talpa',
    21: 'Peppe',
    24: 'Leoz',
    26: 'Gianfo',
    34: 'Jo',
    41: 'Piercocet',
    55: 'Cillanza',
    69: 'Penna',
    71: 'Spatolainz',
    77: 'Squalo',
    91: 'JJ',
};

// Statistiche
const statisticheGiocatori = {};
Object.keys(giocatori).forEach(numero => {
    statisticheGiocatori[numero] = {
        punti: 0,
        tiriTentati: 0,
        tiriSegnati: 0,
        tiriDa2Segnati: 0,
        tiriDa2: 0,
        tiriDa3Segnati: 0,
        tiriDa3: 0,
        liberiSegnati: 0,
        liberiTentati: 0,
        rimbalziOffensivi: 0,
        rimbalziDifensivi: 0,
        palleRecuperate: 0,
        pallePerse: 0,
        assist: 0,
        falliFatti: 0,
        falliSubiti: 0,
    };
});

// Storico delle statistiche
const storicoAzioni = [];
const convocati = [];
const giocatoriInCampo = [];

// Giocatore selezionato per azione o sostituzione
let giocatoreSelezionato = null;
let bottoneSelezionato = null;

// Inizializza la rosa squadra
const aggiornaRosaSquadra = () => {
    rosaSquadraList.innerHTML = '';
    Object.keys(giocatori).forEach(numero => {
        if (!convocati.includes(numero)) { // Solo giocatori non convocati
            const btn = document.createElement('button');
            btn.textContent = `${numero} ${giocatori[numero]}`;
            btn.addEventListener('click', () => aggiungiConvocato(numero));
            rosaSquadraList.appendChild(btn);
        }
    });
};



// Aggiungi giocatore ai convocati
const aggiornaConvocati = () => {
    convocatiList.innerHTML = '';
    convocati.forEach(numero => {
        const btn = document.createElement('button');
        btn.textContent = `${numero} ${giocatori[numero]}`;
        btn.addEventListener('click', () => aggiungiGiocatoreInCampo(numero));
        convocatiList.appendChild(btn);
    });
};

const aggiungiConvocato = (numero) => {
    if (convocati.includes(numero)) return alert('Giocatore già convocato!');
    if (convocati.length >= 12) return alert('Puoi selezionare massimo 12 convocati!');
    convocati.push(numero);
    aggiornaRosaSquadra(); // Aggiorna Rosa Squadra rimuovendo il giocatore
    aggiornaConvocati();   // Aggiorna immediatamente la lista Convocati
};






// Inizia partita
startGameButton.addEventListener('click', () => {
    if (convocati.length === 0) return alert('Seleziona almeno un convocato prima di iniziare la partita!');
    document.getElementById('convocati-section').style.display = 'block';
    document.getElementById('stats-buttons').style.display = 'block';
    document.getElementById('stats-table').style.display = 'block'; // Mostra la tabella
    rosaSquadraList.parentElement.style.display = 'none';
    startGameButton.style.display = 'none';

    // Pulsanti aggiuntivi
    saveGameButton.textContent = 'Salva Partita';
    saveGameButton.addEventListener('click', salvaPartita);
    document.body.appendChild(saveGameButton);

    undoButton.textContent = 'Torna Indietro';
    undoButton.addEventListener('click', annullaUltimaAzione);
    document.body.appendChild(undoButton);

    sostituisciButton.textContent = 'Sostituisci Giocatore';
    sostituisciButton.addEventListener('click', iniziaSostituzione);
    document.body.appendChild(sostituisciButton);
});
const aggiornaGiocatoriInCampo = () => {
    playersInField.innerHTML = '';
    giocatoriInCampo.forEach(numero => {
        const btn = document.createElement('button');
        btn.textContent = `${numero} ${giocatori[numero]}`;
        btn.classList.add('player-button');
        btn.addEventListener('click', () => selezionaGiocatore(numero, btn));
        playersInField.appendChild(btn);
    });
};

const aggiungiGiocatoreInCampo = (numero) => {
    if (giocatoriInCampo.includes(numero)) {
        alert('Giocatore già in campo!');
        return;
    }
    if (giocatoriInCampo.length >= 5) {
        alert;
        return;
    }

    giocatoriInCampo.push(numero); // Aggiungi il giocatore
    aggiornaGiocatoriInCampo(); // Aggiorna dinamicamente la lista
};




// Seleziona giocatore
const selezionaGiocatore = (numero, bottone) => {
    if (bottoneSelezionato) bottoneSelezionato.classList.remove('selected');
    bottone.classList.add('selected');
    giocatoreSelezionato = numero;
    bottoneSelezionato = bottone;
};

// Gestione statistiche
statsButtons.addEventListener('click', (e) => {
    if (!giocatoreSelezionato) return alert('Seleziona un giocatore!');
    const azione = e.target.getAttribute('data-action');
    if (!azione) return;

    // Registra azione
    storicoAzioni.push({ numero: giocatoreSelezionato, azione });
    aggiornaStatistiche(giocatoreSelezionato, azione);
    aggiornaTabella();
    giocatoreSelezionato = null;

    if (bottoneSelezionato) bottoneSelezionato.classList.remove('selected');
    bottoneSelezionato = null;
});

// Aggiorna statistiche
const aggiornaStatistiche = (numero, azione) => {
    const stats = statisticheGiocatori[numero];
    switch (azione) {
        case '2i': stats.punti += 2; stats.tiriTentati++; stats.tiriSegnati++; stats.tiriDa2Segnati++; stats.tiriDa2++; break;
        case '2o': stats.tiriTentati++; stats.tiriDa2++; break;
        case '3i': stats.punti += 3; stats.tiriTentati++; stats.tiriSegnati++; stats.tiriDa3Segnati++; stats.tiriDa3++; break;
        case '3o': stats.tiriTentati++; stats.tiriDa3++; break;
        case 'li': stats.punti++; stats.liberiTentati++; stats.liberiSegnati++; break;
        case 'lo': stats.liberiTentati++; break;
        case 'ro': stats.rimbalziOffensivi++; break;
        case 'rd': stats.rimbalziDifensivi++; break;
        case 'pp': stats.pallePerse++; break;
        case 'pr': stats.palleRecuperate++; break;
        case 'a': stats.assist++; break;
        case 'ff': stats.falliFatti++; break;
        case 'fs': stats.falliSubiti++; break;
    }
};

// Annulla ultima azione
const annullaUltimaAzione = () => {
    if (storicoAzioni.length === 0) return alert('Nessuna azione da annullare!');
    const ultimaAzione = storicoAzioni.pop();
    const stats = statisticheGiocatori[ultimaAzione.numero];
    switch (ultimaAzione.azione) {
        case '2i': stats.punti -= 2; stats.tiriTentati--; stats.tiriSegnati--; stats.tiriDa2Segnati--; stats.tiriDa2--; break;
        case '2o': stats.tiriTentati--; stats.tiriDa2--; break;
        case '3i': stats.punti -= 3; stats.tiriTentati--; stats.tiriSegnati--; stats.tiriDa3Segnati--; stats.tiriDa3--; break;
        case '3o': stats.tiriTentati--; stats.tiriDa3--; break;
        case 'li': stats.punti--; stats.liberiTentati--; stats.liberiSegnati--; break;
        case 'lo': stats.liberiTentati--; break;
        case 'ro': stats.rimbalziOffensivi--; break;
        case 'rd': stats.rimbalziDifensivi--; break;
        case 'pp': stats.pallePerse--; break;
        case 'pr': stats.palleRecuperate--; break;
        case 'a': stats.assist--; break;
        case 'ff': stats.falliFatti--; break;
        case 'fs': stats.falliSubiti--; break;
    }
    aggiornaTabella();
};

// Aggiorna tabella statistiche
const aggiornaTabella = () => {
    statsTable.innerHTML = ''; // Svuota il corpo della tabella

    Object.keys(statisticheGiocatori).forEach(numero => {
        const stats = statisticheGiocatori[numero];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${numero}</td>
            <td>${giocatori[numero]}</td>
            <td>${stats.punti}</td>
            <td>${stats.tiriTentati}</td>
            <td>${stats.tiriSegnati}</td>
            <td>${((stats.tiriSegnati / stats.tiriTentati) * 100 || 0).toFixed(1)}%</td>
            <td>${((stats.tiriDa2Segnati / stats.tiriDa2) * 100 || 0).toFixed(1)}%</td>
            <td>${((stats.tiriDa3Segnati / stats.tiriDa3) * 100 || 0).toFixed(1)}%</td>
            <td>${stats.liberiSegnati}</td>
            <td>${stats.liberiTentati}</td>
            <td>${((stats.liberiSegnati / stats.liberiTentati) * 100 || 0).toFixed(1)}%</td>
            <td>${stats.rimbalziOffensivi}</td>
            <td>${stats.rimbalziDifensivi}</td>
            <td>${stats.palleRecuperate}</td>
            <td>${stats.pallePerse}</td>
            <td>${stats.assist}</td>
            <td>${stats.falliFatti}</td>
            <td>${stats.falliSubiti}</td>
        `;
        statsTable.appendChild(row); // Aggiungi la riga alla tabella
    });
};

// Sostituisci giocatore
const iniziaSostituzione = () => {
    if (!giocatoreSelezionato) return alert('Seleziona un giocatore in campo!');
    convocatiList.childNodes.forEach(btn => {
        btn.addEventListener('click', () => sostituisciGiocatore(btn.textContent.split(' ')[0]));
    });
};

const sostituisciGiocatore = (numero) => {
    const index = giocatoriInCampo.indexOf(giocatoreSelezionato); // Trova l'indice del giocatore selezionato
    if (index === -1) return; // Se il giocatore non è in campo, esci

    giocatoriInCampo[index] = numero; // Sostituisci il giocatore
    aggiornaGiocatoriInCampo(); // Aggiorna dinamicamente la lista dei giocatori in campo
    aggiornaConvocati(); // Aggiorna la lista dei convocati

    giocatoreSelezionato = null; // Resetta il giocatore selezionato
    bottoneSelezionato = null; // Resetta il bottone selezionato
};


// Salva partita
const salvaPartita = () => {
    const tabella = document.querySelector('table').outerHTML;
    const contenutoHTML = `
        <!DOCTYPE html>
        <html lang="it">
        <head>
            <meta charset="UTF-8">
            <title>Statistiche Partita</title>
        </head>
        <body>
            <h1>Statistiche Partita</h1>
            ${tabella}
        </body>
        </html>
    `;
    const blob = new Blob([contenutoHTML], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `partita_${new Date().toISOString().split('T')[0]}.html`;
    link.click();
};
const resetButtonState = (numero, lista) => {
    const button = [...lista.children].find(
        (btn) => btn.textContent.startsWith(numero)
    );
    if (button) button.disabled = false;
};

// Inizializza rosa squadra
aggiornaRosaSquadra();
