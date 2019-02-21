# Freshmod Frontend
  
  

## Requisiti

  - Installare [Node.js](https://nodejs.org/it/)  &nbsp;  `v6.5.0` o successive.
- Librerie NPM:
	- "@fortawesome/fontawesome-svg-core":&nbsp;  `npm i @fortawesome/fontawesome-svg-core`
	- "@fortawesome/free-solid-svg-icons":&nbsp;  `npm i @fortawesome/free-solid-svg-icons`
	- "@fortawesome/react-fontawesome":&nbsp;  `npm i @fortawesome/react-fontawesome`
	- "@types/leaflet": &nbsp; `npm i @types/leaflet`
	- "@types/leaflet-routing-machine":&nbsp; `npm i @types/leaflet-routing-machine`
	- "@types/react-router": &nbsp;`npm i @types/react-router`
	- "@types/react-router-dom":&nbsp; `npm i @types/react-router-dom`
	- "@types/request": &nbsp;`npm i @types/request`
	- "axios":&nbsp; `npm i axios`
	- "bootstrap":&nbsp;`npm i bootstrap`
	- "leaflet": &nbsp;`npm i leaflet"`
	- "leaflet-routing-machine":&nbsp;  `npm i leaflet-routing-machine`
	- "react-scripts-ts":&nbsp;`npm i react-scripts-ts`
    - "react": &nbsp;`npm i react`
    - "@types/react":  &nbsp;`npm i @types/react`
    - "@types/react-dom":  &nbsp;`npm i @types/react-dom`
    - "typescript":  &nbsp;`npm i typescript`
    - Queste dipendenze probabilmente sono soddisfatte da react e @types/react:
        - "react-dom":&nbsp;`npm i react-dom`
        - "react-router": &nbsp;`npm i react-router`
        - "react-router-dom": &nbsp;`npm i react-router-dom`
    
- Credenziali Account AWS

|User name|Password|
|--|--|
|freshmod|mammaliturchi|
  

## Operazioni preliminari

- Installare tutte le dipendenze
  

## Eseguire in locale
- Nel terminale `npm start`

  

## Build 

- Per eseguire la build in locale &nbsp;  `npm run build`
- Per caricare la build 
	- Andare su [AWS](https://s3.console.aws.amazon.com/s3/buckets/freshmod/?region=us-east-1&tab=overview) 
	- Eliminare i file precedenti
	- Caricare il contenuto della cartella `build`
  