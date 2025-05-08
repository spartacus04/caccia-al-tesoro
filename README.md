# 🧭 Caccia al Tesoro Digitale - 50° Luino 1°

Benvenuti nel progetto della **Caccia al Tesoro Digitale** realizzato in occasione del **50° anniversario del Gruppo Scout Luino 1°**!  
Questa web app consente ai partecipanti di esplorare una mappa interattiva, cercare tappe nascoste tramite coordinate geografiche e risolvere enigmi lungo il percorso.

---

## 📌 Funzionalità

- Mappa interattiva con tappe geolocalizzate
- Coordinate GPS per guidare i partecipanti
- Enigmi digitali sbloccabili a ogni tappa
- Interfaccia mobile-friendly e intuitiva

---

## ⚙️ Avvio in Locale

Per eseguire il progetto sul tuo computer:

### 1. Clona il repository

```bash
git clone https://github.com/spartacus04/caccia-al-tesoro.git
cd caccia-al-tesoro
```

### 2. Installa le dipendenze

Assicurati di avere installato [Node.js](https://nodejs.org/).

```bash
npm install
```

### 3. Avvia il server di sviluppo

```bash
npm run dev
```

Apri il browser su `http://localhost:5173` (o un'altra porta indicata nel terminale).

---

## 🗺️ Configurazione delle Tappe

Le tappe della caccia al tesoro (coordinate, descrizioni, enigmi, ecc.) sono configurate nel file:

```
src/lib/index.ts
```

Modifica questo file per personalizzare il percorso, i checkpoint e i contenuti da mostrare agli utenti.

---

## 🥳 Crediti

Progetto realizzato da e per il **Gruppo Scout Luino 1°** in occasione del **50° anniversario**.

---

## 🏕️ Licenza

MIT – Puoi usarlo, modificarlo e condividerlo liberamente per scopi educativi o associativi.
