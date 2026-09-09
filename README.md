# Fragtkalkulator – Birgers Møbler

Dynamisk beregningsværktøj til fragtkalkulation (Distribution & SCM). Sammenligner 3 søfragttilbud fra A-Line for kunden Birgers Møbler (Viborg → San Francisco), og beregner totalprisen i DKK inkl. speditørens (LEA Express) avance.

## Tilbud

1. **Samlegods (LCL)** – pris pr. w/m, CAF, BAF, THC (kr./cbm, min. 275 kr.) og fast godsafgift i havn.
2. **20' FCL container** – fast søfragt/BAF/AMS, THC, ISPS og valgfri trucking-rute (Århus-Viborg-Århus eller Århus-Viborg-Hamborg) med fuelfee og feeder-kompensation.
3. **40' FCL container** – som tilbud 2, med egne satser for søfragt, BAF og feeder-kompensation.

Alle satser, mængder og kurser (valutakurs, LEA Express' avance) er redigerbare direkte i UI'et. Hvert tilbud viser gennemskuelige mellemregninger (grundfragt, tillæg, lokale gebyrer/trucking, kostpris, avance, total), og en sammenligningstabel stiller de tre tilbud side om side.

## Udvikling

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

Bygget med Vite, React, TypeScript og Tailwind CSS v4.
