# Agaricus

Agaricus ist eine **Internet of Things** Anwendung zum Champignons züchten von Zuhause.
Auf der Weboberfläche können Sensorwerte wie Luftfeuchtigkeit, Bodenfeuchtigkeit und die Temperatur eingesehen werden.
Das anlegen wie bearbeiten neuer Sensorwerte erfolgt ebenfalls auf der Weboberfläche.

## Inhaltsverzeichnis
> [TOC]

## Run

### Schritt 1 - Git Klonen
1. Terminal öffnen
2. Pfad definieren
3. `git clone hfg-nyal-h/agaricus` in Terminal eingeben
4. Enter drücken

### Schritt 1.1
1. Repo herunterladen
2. In richtigen Pfad hinzufügen

### Install Docker

[Click Me!(https://docs.docker.com/get-docker/)

### Schritt 3
1. Ordner `agaricus-main` öffnen mit VS-Code o.Ä
2. Terminal öffnen
3. `cd frontend`
4. `$ npm install`
5. `$ cd ..`
6.  `cd dataservice`
4. `$ npm install`
5. `$ cd ..`
6.  `cd userservice`
4. `$ npm install`
5. `$ cd ..`
8. `bash startall.sh`
9. [Browser Öffnen (http://localhost:8080)](http://localhost:8080)

## Projektaufbau

<a href="https://ibb.co/sF7f74W"><img src="https://i.ibb.co/hK060NY/IMG-5512.jpg" alt="IMG-5512" border="0"></a>


## Sensor Modul

### Moisture
<a href="https://ibb.co/wRtkxpt"><img src="https://i.ibb.co/BtkpSTk/IMG-5514.jpg" alt="IMG-5514" border="0"></a>

Mit dem Moisture Sensor wird gediglich die Bodenfeuchtigkeit gemessen

### Moisture and DHT
<a href="https://ibb.co/yf0RhDD"><img src="https://i.ibb.co/vw1Bsbb/IMG-5517.jpg" alt="IMG-5517" border="0"></a>

Mit dem Moisture and DHT Sensor wird die Bodenfeuchtigkeit wie die Temperatur und Luftfeuchtigkeit gemessen.

## Installation
1. Auf der Weboberfläche einen Sensor anlegen
    1.1. Moisture oder Moisture and DHT
2. ID kopieren
3. Je nach Auswahl des Sensors Arduino Code öffnen
    3.1 Moisture Sensor: `moisturecode`
    3.2 Moisture and DHT Sensor: `dhtcode`
4. Kopierte ID in `id` eintragen
5. Nutzername in `clientID` eintragen
6. Port und Board auswählen
7. Flashen

## Stromversorgung

Sind die NodeMCU's geflasht, so schickne diese Stündklich Messwerte an das Backend. Während die Sensoren keine Daten schicken, befinden Sie sich im Deep Sleep-Modus.
Die Stromversorgung erfoglt über eine Powerbank.


# Software

## Technologie

## Frontend



|   Vue 3  |  Axios   | Vuex | Bootstrap | Apexcharts |
| --- | --- | -------- | -------- | -------- |
|   Frontend Framework  |   XMLHttpRequests zwischen Front und Backend  | Managen von Token, Username etc.     | CSS Framework - styling     | Daten Visualisieren in Charts     |





## Backend



| MongoDB                                    | Express & Axios                           | Jason Web Token                                                                                                 | bcryptjs          | cors                                                        | dotenv                      | uuid    | MQTT                                                                                    |
| ------------------------------------------ | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ----------------- | ----------------------------------------------------------- | --------------------------- | --- | --------------------------------------------------------------------------------------- |
| NoSQL Datenbank zur verwaltung aller Daten | Kommunikation zwischen Front- und Backend | Middleware - Token erstellen sowie Registrierung Login verwalten. Login zustand und co. werden im Vuex gestored | Passwörter hashen | Managed welche Komponenten miteinander Kommunizieren dürfen | Auslagerung sensibler Daten |  clientId und sensorId vergeben und   | Pusht Sensordaten von NodeMCU auf MQTT Server, sodass das Backend darauf zugreifen kann |


## Datenbank-Struktur



| Users | sensorData | moisture |
| -------- | ---------- | -------- |
|   username       |      _id      |     _id     |
|   hashedPass       |      createdAt      |    sensorId      |
|   createdAt       |   ModifiedAt         |  sensorUser        |
|    modifiedAt      |   sensorName         |  moisture        |
|          |    sensorType        |   (temperature)       |
|          |     sentData       |    (humidity)      |
|          |    user        |   createdAt       |
|      |       | modifiedAt     |


## End-Points

 **/api/register**
* Username und Passwort
*  Middleware überprüfen Registriertung Valide
* Überprüfen ob Username schon vergeben
* Passwort hashen
* neuer User in Datenbank hinzufügen

**/api/login**
* Nutzer in Datenbank suchen
* Passwort reverse hashen
* Session erstellen incl Token
* Token im Vuex store speichern


**/users**
* Middleware überprüft ob User eingeloggt ist
> [color=#549451]Frontend: Zugriff auf Dashboard


**/api/sensorData**
* Suche in `sensorData` nach alles "Moisture" Sensoren vom User
* Suche in `moisture` nach den Daten der Sensoren aus `sensorData`
* Sortiere die Daten - neuste Zuerst
* Speicher Daten in ein Array
 > [color=#549451] Frontend: Verfügbare Sensoren sowie Daten anzeigen, Daten den Charts übermitteln


**/api/dhtData**
* Suche in `sensorData` nach "Moisture and DHT" Sensoren vom User
* Suche in `moisture` nach den Daten der "Moisture and DHT" Sensoren aus `sensorData`
* Sortiere die Daten - neuste Zuerst
* Speicher Daten in ein Array
> [color=#549451] Frontend: Daten anzeigen, Daten den Charts übermitteln


**/api/sensorInformation**
* Suche in `sensorData` nach alles "Moisture" Sensoren vom User
> [color=#549451] Frontend: Im Sensormanager Sensor Informationen anzeigen

**/api/sensorData/create**
* Neuen Sensor erstellen
* 
**/api/sensorData/ editSensor**
* Sensor Name und Sensor Typ bearbeiten

## Skalierung

Bislang ist das System für den Heimgebrauch ausgelegt.
Eine Professionelle zucht von Champignons würde ein Update des Codes brauchen.
Je Größer die Räumlichkeit undj je mehr Champignons angebaut werden, deso mehr Sensoren werden gebraucht.
Bislang ist das System auf circa 10-20 Feuchtesensoren max. ausgelegt.
DHT Sensoren kann aktuell nur einer verwendet werden, da es sich bislang um den Privatgebrauch handelt.

# About

**Nyal Jorden Hettmer**
Hochschule für Gestaltung Schwäbisch Gmünd
Internet der Dinge 3

Softwareentwurf und Anwendung verteilter Systeme
bei [Fabian Rauch](https://github.com/caitoor)












