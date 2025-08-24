# POS-System (Restaurant Sales Manager)

Dies ist ein webbasiertes Point-of-Sale (POS)-System für Restaurants. Ziel des Projekts ist es, eine moderne, benutzerfreundliche Webanwendung zu entwickeln, mit der Bestellungen aufgenommen, verwaltet und abgerechnet werden können.

## Tech-Stack

- React (mit Vite und TypeScript)
- Docker und Docker Compose
- Deployment später auf Microsoft Azure geplant
- GitHub Actions für CI/CD
- ESLint und Prettier für Codequalität
- Geplant: Datenbankanbindung (z. B. PostgreSQL oder Supabase)

## Projektziele

Das System soll folgende Module beinhalten:

- Kellner-Oberfläche: Bestellungen aufnehmen, Tische verwalten
- Küchenansicht: Übersicht über offene Bestellungen
- Adminbereich: Produkte und Preise verwalten, Statistiken einsehen
- Zahlungsmodul: Unterstützung verschiedener Zahlungsarten

Ziel ist ein stabiles, containerisiertes System, das cloudfähig ist und mit modernen DevOps-Praktiken entwickelt wird.

## Lokales Setup

### Voraussetzungen

- Node.js (empfohlen: v20.x)
- Docker und Docker Compose

### Entwicklung starten

```bash
git clone https://github.com/CansinErdi/POS-System
cd rsm_docker
npm install
npm run dev

### Docker Build & Start

docker build -t pos-system .
docker run -p 3000:3000 pos-system

### Geplant

docker-compose up


Sprint 1

Sprint Goal:
Ein funktionales Grundgerüst für das POS-System inklusive Projektstruktur, CI/CD-Basis und einer ersten Seite im Browser sichtbar.

Projekt-Board: Sprint 1 auf GitHub Projects

PBIs (Product Backlog Items)
	1.	Projektstruktur und Setup
	2.	CI/CD einrichten
	3.	Startseite anzeigen

Beispielhafte Task-Zerlegung

Projektstruktur und Setup
	•	Vite + React + TypeScript Projekt initialisieren
	•	ESLint und Prettier konfigurieren
	•	Dockerfile schreiben
	•	Routing mit react-router-dom einbauen
	•	App.tsx Struktur aufbauen

CI/CD einrichten
	•	GitHub Actions Workflow erstellen
	•	Automatischer Build bei jedem Push
	•	Fehlerausgabe im Build-Prozess

Startseite anzeigen
	•	Dummy-Startseite anzeigen
	•	Route /home konfigurieren
	•	Layout mit einfachem CSS
