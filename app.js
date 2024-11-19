const dataLog = document.getElementById('data-log');
const actionInput = document.getElementById('action-input');
const startGameButton = document.getElementById('start-game');
const saveGameButton = document.getElementById('save-game');
const inputSection = document.getElementById('input-section');
const statsTable = document.getElementById('stats-table');
const statsBody = document.getElementById('stats-body');
const legendSection = document.getElementById('legend');

// Dati dei giocatori precaricati
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

// Statistiche dei giocatori
const statisticheGiocatori = {};

// Inizializza le statistiche dei giocatori
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

// Funzione per aggiornare le statistiche
const aggiornaStatistiche = (numero, azione) => {
    if (!statisticheGiocatori[numero]) return;

    switch (azione) {
        case '2i': // Tiro da 2 segnato
            statisticheGiocatori[numero].punti += 2;
            statisticheGiocatori[numero].tiriTentati++;
            statisticheGiocatori[numero].tiriDa2Segnati++;
            statisticheGiocatori[numero].tiriSegnati++;
            statisticheGiocatori[numero].tiriDa2++;
            break;

        case '2o': // Tiro da 2 sbagliato
            statisticheGiocatori[numero].tiriTentati++;
            statisticheGiocatori[numero].tiriDa2++;
            break;

        case '3i': // Tiro da 3 segnato
            statisticheGiocatori[numero].punti += 3;
            statisticheGiocatori[numero].tiriTentati++;
            statisticheGiocatori[numero].tiriDa3Segnati++;
            statisticheGiocatori[numero].tiriSegnati++;
            statisticheGiocatori[numero].tiriDa3++;
            break;

        case '3o': // Tiro da 3 sbagliato
            statisticheGiocatori[numero].tiriTentati++;
            statisticheGiocatori[numero].tiriDa3++;
            break;

        case 'li': // Tiro libero segnato
            statisticheGiocatori[numero].punti++;
            statisticheGiocatori[numero].liberiTentati++;
            statisticheGiocatori[numero].liberiSegnati++;
            break;

        case 'lo': // Tiro libero sbagliato
            statisticheGiocatori[numero].liberiTentati++;
            break;

        case 'ro': // Rimbalzo offensivo
            statisticheGiocatori[numero].rimbalziOffensivi++;
            break;

        case 'rd': // Rimbalzo difensivo
            statisticheGiocatori[numero].rimbalziDifensivi++;
            break;

        case 'pp': // Palla persa
            statisticheGiocatori[numero].pallePerse++;
            break;

        case 'pr': // Palla recuperata
            statisticheGiocatori[numero].palleRecuperate++;
            break;

        case 'a': // Assist
            statisticheGiocatori[numero].assist++;
            break;

        case 'ff': // Fallo fatto
            statisticheGiocatori[numero].falliFatti++;
            break;

        case 'fs': // Fallo subito
            statisticheGiocatori[numero].falliSubiti++;
            break;

        default:
            console.log('Azione non riconosciuta');
            return;
    }

    // Aggiungi un log visivo
    const logItem = document.createElement('li');
    logItem.textContent = `Giocatore ${giocatori[numero]} (#${numero}): ${azione}`;
    dataLog.appendChild(logItem);

    // Aggiorna la tabella
    aggiornaTabella();
};

// Funzione per aggiornare la tabella delle statistiche
const aggiornaTabella = () => {
    statsBody.innerHTML = '';

    Object.keys(statisticheGiocatori).forEach(numero => {
        const stats = statisticheGiocatori[numero];
        const tiriTotaliPercentuale = stats.tiriTentati > 0
            ? ((stats.tiriSegnati / stats.tiriTentati) * 100).toFixed(1)
            : '0';

        const tiriDa2Percentuale = stats.tiriDa2 > 0
            ? ((stats.tiriDa2Segnati / stats.tiriDa2) * 100).toFixed(1)
            : '0';

        const tiriDa3Percentuale = stats.tiriDa3 > 0
            ? ((stats.tiriDa3Segnati / stats.tiriDa3) * 100).toFixed(1)
            : '0';

        const liberiPercentuale = stats.liberiTentati > 0
            ? ((stats.liberiSegnati / stats.liberiTentati) * 100).toFixed(1)
            : '0';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${numero}</td>
            <td>${giocatori[numero]}</td>
            <td>${stats.punti}</td>
            <td>${stats.tiriTentati}</td>
            <td>${stats.tiriSegnati}</td>
            <td>${tiriTotaliPercentuale}%</td>
            <td>${tiriDa2Percentuale}%</td>
            <td>${tiriDa3Percentuale}%</td>
            <td>${stats.liberiSegnati}</td>
            <td>${stats.liberiTentati}</td>
            <td>${liberiPercentuale}%</td>
            <td>${stats.rimbalziOffensivi}</td>
            <td>${stats.rimbalziDifensivi}</td>
            <td>${stats.palleRecuperate}</td>
            <td>${stats.pallePerse}</td>
            <td>${stats.assist}</td>
            <td>${stats.falliFatti}</td>
            <td>${stats.falliSubiti}</td>
        `;
        statsBody.appendChild(row);
    });
};

// Avvia la partita
startGameButton.addEventListener('click', () => {
    inputSection.style.display = 'block';
    statsTable.style.display = 'block';
    saveGameButton.style.display = 'block';
    legendSection.style.display = 'block';
    startGameButton.style.display = 'none';
    actionInput.focus();
});

// Ascolta gli input nella casella di testo
actionInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const input = actionInput.value.trim();

        // Dividi tra numero giocatore e azione
        const spazio = input.indexOf(' '); // Trova lo spazio
        const numero = input.substring(0, spazio); // Prima parte: numero giocatore
        const azione = input.substring(spazio + 1); // Seconda parte: azione

        if (giocatori[numero]) {
            aggiornaStatistiche(numero, azione);
        } else {
            alert(`Giocatore con numero ${numero} non trovato.`);
        }

        actionInput.value = ''; // Resetta l'input
    }
});

// Salva i dati
saveGameButton.addEventListener('click', () => {
    localStorage.setItem('statistichePartita', JSON.stringify(statisticheGiocatori));
    alert('Dati della partita salvati!');
});
// Funzione per scaricare il file JSON
const scaricaFile = (nomeFile, contenuto) => {
    const blob = new Blob([contenuto], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = nomeFile;
    link.click();
    URL.revokeObjectURL(link.href);
};

const scaricaCSV = (nomeFile, dati) => {
    // Creazione del contenuto CSV
    let contenuto = "Numero,Nome,Punti,Tiri Tentati,Tiri Segnati,% Tiri Totale,% Tiri da 2,% Tiri da 3,Liberi Segnati,Liberi Tentati,% Liberi,Rimbalzi Offensivi,Rimbalzi Difensivi,Palle Recuperate,Palle Perse,Assist,Falli Fatti,Falli Subiti\n";

    Object.keys(dati).forEach(numero => {
        const stats = dati[numero];
        const tiriTotaliPercentuale = stats.tiriTentati > 0
            ? ((stats.tiriSegnati / stats.tiriTentati) * 100).toFixed(1)
            : '0';

        const tiriDa2Percentuale = stats.tiriDa2 > 0
            ? ((stats.tiriDa2Segnati / stats.tiriDa2) * 100).toFixed(1)
            : '0';

        const tiriDa3Percentuale = stats.tiriDa3 > 0
            ? ((stats.tiriDa3Segnati / stats.tiriDa3) * 100).toFixed(1)
            : '0';

        const liberiPercentuale = stats.liberiTentati > 0
            ? ((stats.liberiSegnati / stats.liberiTentati) * 100).toFixed(1)
            : '0';

        contenuto += `${numero},${giocatori[numero]},${stats.punti},${stats.tiriTentati},${stats.tiriSegnati},${tiriTotaliPercentuale}%,${tiriDa2Percentuale}%,${tiriDa3Percentuale}%,${stats.liberiSegnati},${stats.liberiTentati},${liberiPercentuale}%,${stats.rimbalziOffensivi},${stats.rimbalziDifensivi},${stats.palleRecuperate},${stats.pallePerse},${stats.assist},${stats.falliFatti},${stats.falliSubiti}\n`;
    });

    // Creazione e download del file CSV
    const blob = new Blob([contenuto], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = nomeFile;
    link.click();
    URL.revokeObjectURL(link.href);
};



const salvaTabellaComeHTML = () => {
    // Prendi la tabella attuale
    const tabella = statsTable.outerHTML;

    // Aggiungi un titolo per il file HTML
    const contenutoHTML = `
        <!DOCTYPE html>
        <html lang="it">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Statistiche Partita</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    color: #000;
                }
                table {
                    border-collapse: collapse;
                    width: 100%;
                }
                table th, table td {
                    border: 1px solid black;
                    padding: 8px;
                    text-align: center;
                }
                table th {
                    background-color: #ffc107;
                }
            </style>
        </head>
        <body>
            <h1>Statistiche Partita</h1>
            ${tabella}
        </body>
        </html>
    `;

    // Creazione e download del file HTML
    const blob = new Blob([contenutoHTML], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);

    // Nome del file
    const numeroPartita = localStorage.getItem('numeroPartita')
        ? parseInt(localStorage.getItem('numeroPartita'))
        : 1;
    link.download = `partita${numeroPartita}.html`;
    link.click();
    URL.revokeObjectURL(link.href);

    // Incrementa l'indice della partita
    localStorage.setItem('numeroPartita', numeroPartita + 1);

    alert(`Tabella salvata come partita${numeroPartita}.html`);
};

// Collega il pulsante "Salva Partita" alla funzione
saveGameButton.addEventListener('click', salvaTabellaComeHTML);
