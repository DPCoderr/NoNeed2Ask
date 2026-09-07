# NoNeed2Ask — stapsgewijze UI/UX-vernieuwing

Dit document is het ontwerpplan en de overdracht voor volgende chats. Lees het
samen met de toepasselijke `AGENTS.md` en de huidige implementatie. Werk alleen
aan de pagina die de gebruiker aanwijst. Werk de voortgang hieronder bij na een
oplevering; onderscheid implementatie van goedkeuring door de gebruiker.

## Voortgang — 7 september 2026

| Onderdeel | Status |
| --- | --- |
| Dashboard, sidebar en bovenbalk | Uitgewerkt en met de gebruiker verfijnd; gebruiker heeft opdracht gegeven door te gaan naar applications. |
| Sollicitatielijst (applications) | Nieuwe UI en lokale preview opgeleverd; wacht op beoordeling. |
| Sollicitatiedetail en overige pagina's | Nog niet vernieuwd binnen dit traject. |

De laatst gerapporteerde controle voor applications was een geslaagde
`npm run check` (41 tests en productiebuild), plus visuele controle op 320, 390,
768, 1024, 1280 en 1440 px. Dit is historische verificatie, geen garantie voor
latere wijzigingen. De applications-wijzigingen waren bij deze overdracht nog
niet gecommit; inspecteer de actuele werkboom en behoud bestaand werk.

## Doel en grenzen

Een professionele, overzichtelijke en kalme app waarin sollicitaties en de
eerstvolgende stap centraal staan. De uitstraling moet verzorgd en herkenbaar
zijn, zonder generieke AI-decoratie. De gebruiker geeft vrijheid om de UI te
verbeteren, met beoordeling per pagina.

- Alleen UI/UX. Backend, endpoints, authenticatie, datacontracten en bestaande
  functionele logica blijven buiten scope; de backend wordt nog gerefactord.
- Behoud bestaande hooks, API-aanroepen, validatie, berekeningen, navigatie en
  interacties. Maak presentatie waar nodig los via expliciete props en callbacks.
- Bij ontbrekende of niet werkende functionaliteit: gebruik fictieve data in de
  aparte lokale preview. Voeg geen mockfallbacks toe aan reguliere gegevensstromen.
- Begin de volgende pagina pas na akkoord of een expliciete vervolgopdracht.

## Visuele richting

- Lichtgrijze achtergrond, witte oppervlakken, grafietkleurige tekst en een
  ingetogen blauw accent.
- Inter, Engelse interfacetaal en het bestaande logo behouden.
- Compacte, duidelijke paginatitels en goed leesbare labels.
- Consistente afstanden, subtiele borders, beperkte schaduwen en hoeken van
  ongeveer 8–12 px.
- Geen achtergrondfoto's, rasterpatronen of topografische decoratie in de interne app.
- Bestaande Hugeicons gebruiken voor een consistente iconentaal. Afbeeldingen
  mogen als ze de pagina helpen; het dashboard heeft geen gegenereerde beelden nodig.
- Eerst een volledig uitgewerkt licht thema. Geen nieuwe themawisselaar.
- Gebruik het uitgewerkte dashboard en de applications-UI als visuele referentie.
  Herontwerp niet onbedoeld andere pagina's door globale primitives te wijzigen.

## Dashboard en navigatie: gemaakte keuzes

De gedeelde sidebar heeft een compacte merkvermelding, duidelijke actieve pagina
en accountbediening onderaan. Bestaande bestemmingen, uitloggen en mobiele
navigatie blijven werken. De bovenbalk heeft breadcrumbs, consistente uitlijning
en een ingetogen menuknop. Deze navigatie is ook zichtbaar op andere interne pagina's.

Het dashboard bevat:

- Een compacte begroeting, korte toelichting en `Add application` naar het
  bestaande aanmaakscherm.
- De bestaande statusverdeling met totaal, proportionele balk en aantallen.
- Een kleinere kaart voor de eerstvolgende afspraak of actie met bedrijf, functie,
  datum en bestaande detailbestemming, plus een toestand zonder afspraak.
- Recente sollicitaties met bedrijf, functie, status en datum; behoud het bestaande
  aantal items en `View all`.
- Publiek delen en de publieke preview als secundaire bediening, met bestaande
  beschikbaarheids- en opslaantoestanden.

Op mobiel staat de eerstvolgende actie vóór de statusverdeling. Lange namen mogen
geen horizontale paginascroll veroorzaken. Hardcoded interviewinformatie blijft
herkenbare voorbeeldinformatie; voeg geen planningslogica toe.

Bewaar deze expliciete feedback van de gebruiker:

- Deelbediening staat bij de paginakop, niet als losse strook onderaan.
- Alleen `Public page` en de switch op dezelfde regel, verticaal uitgelijnd;
  geen extra `Shared`-label.
- Maak `Add application` compact op kleine schermen zodat de knop en
  deelbediening naast elkaar passen.
- Laat beide acties ook op tussenformaten in één rij staan met ruimte ertussen
  wanneer dat past; voorkom onnodig stapelen.
- De publieke previewlink mag mobiel alleen een icoon tonen, met een toegankelijke naam.

## Applications: huidige uitwerking

De lijst gebruikt een rustige tabel op brede inhoudsruimte en leesbare rijen op
smalle inhoudsruimte. Bedrijf en functie staan bij elkaar, met status, datum,
volgende actie en een actiemenu. Zoekfunctie, meerdere statusfilters, sortering,
paginering, bewerken en verwijderen behouden hun bestaande gedrag.

De preview heeft acht scenario's: gevuld, leeg, geen zoekresultaten, laden, fout,
lange namen, veel pagina's en verwijderfout. Zoeken, filteren, sorteren,
pagineren en verwijderen werken daar met lokale state. Niet uitgewerkte
bestemmingen tonen een previewmelding.

## Architectuur en componenten

- Houd routes dun. Eén applicatiecomponent per bestand, met duidelijke
  verantwoordelijkheden en expliciete props.
- Server Components zijn de standaard; houd clientgrenzen zo klein mogelijk.
- Voeg geen `useEffect` toe. Gebruik events, afgeleide renderstate en de bestaande
  framework-, React Query- en nuqs-patronen.
- Plaats routegebonden code in `_components` en `_lib`; gedeelde feature-UI in
  `components/<feature>` en gedeelde niet-React-logica in `lib/<feature>`.
- Geen speculatieve abstraheringen, brede barrelbestanden of dubbele bronnen voor
  domeinlabels en query keys.
- Houd private dashboardpresentatie los van de publieke statuspresentatie, zodat
  de publieke pagina haar eigen reviewmoment behoudt.
- Lees vóór codewijzigingen de relevante geïnstalleerde Next.js-documentatie in
  `src/frontend/node_modules/next/dist/docs/` en de repositoryrichtlijnen.
- Huidige limieten: maximaal 250 regels per applicatiebestand, 150 regels per
  functie en cyclomatische complexiteit 15. Gegenereerde `components/ui`-primitives
  hebben hun eigen uitzondering volgens `src/frontend/AGENTS.md`.

### Wegwijzer in de code

Paden hieronder zijn relatief aan de repositoryroot:

| Verantwoordelijkheid | Pad |
| --- | --- |
| Frontendrichtlijnen | `src/frontend/AGENTS.md` |
| Live dashboard | `src/frontend/components/dashboard/dashboard-page.tsx` |
| Private dashboardpresentatie | `src/frontend/components/dashboard/owner/` |
| Gedeelde navigatie en shell | `src/frontend/components/layout/` |
| Live sidebar | `src/frontend/components/app-sidebar.tsx` |
| Applications-route | `src/frontend/app/(dashboard)/applications/page.tsx` |
| Applications-presentatie en interacties | `src/frontend/app/(dashboard)/applications/_components/` |
| Bestaande lijstlogica | `src/frontend/app/(dashboard)/applications/_lib/use-applications-list.ts` |
| Centrale previewroute | `src/frontend/app/preview-design/[pageName]/page.tsx` |
| Gedeelde preview-UI | `src/frontend/app/preview-design/_components/` |
| Fictieve voorbeelddata | `src/frontend/app/preview-design/_lib/` |

## Lokale designpreview voor elke pagina

- Gebruik `/preview-design/[pageName]`, buiten de beveiligde dashboardlayout.
- Beschikbaar: `/preview-design/dashboard` en `/preview-design/applications`.
  `/design-preview` blijft een alias voor het dashboard.
- De route geeft buiten development een 404, ook voor bestaande previewpagina's.
  Onbekende paginanamen geven eveneens een 404.
- Hergebruik dezelfde presentatiecomponenten als de echte pagina, geen tweede UI.
- Hergebruik `PreviewFrame`, de paginakeuze en de scenariokeuze.
- Alle gesimuleerde acties werken uitsluitend met lokale state, zonder echte
  authenticatie, API-aanroepen of mutaties.
- Toon per pagina relevante gevulde, lege, laad-, fout-, lange-tekst- en
  uitgeschakelde toestanden. Voeg functiespecifieke scenario's toe waar zinvol.
- Behoud de preview ook na oplevering, zodat volgende chats en de gebruiker
  toestanden zonder werkende backend kunnen beoordelen.

Start vanuit `src/frontend` met `npm run dev`.

## Volgorde van verdere opleveringen

1. Applications beoordelen en eventuele correcties afronden.
2. Sollicitatiedetail.
3. Sollicitatie aanmaken.
4. Sollicitatie bewerken, met hergebruik van de goedgekeurde formuliercomponenten.
5. Instellingen; ontbrekende mogelijkheden uitsluitend in de lokale preview.
6. Publieke statuspagina, inclusief privé-, lege en fouttoestanden.
7. Login en daarna registratie.
8. Landingspagina, met screenshots van de goedgekeurde app en fictieve gegevens.

Een nieuwe chat per samenhangend onderdeel is gewenst. Aanmaken/bewerken en
login/registratie kunnen elk samen in een chat, maar behoud de beoordeling per
pagina. Geef dit document en de bedoelde route mee aan de volgende chat.

## Acceptatie per ronde

Elke ronde eindigt met één werkende responsive uitwerking, desktop- en mobiele
screenshots en beoordeling door de gebruiker. Controleer:

- 390, 768 en 1440 px, plus relevante tussenformaten; geen horizontale
  paginascroll, onnodig gestapelde acties of onleesbare lange namen.
- Gevuld, leeg, laden, fout en uitgeschakeld, plus relevante interactietoestanden.
- Toetsenbordbediening, zichtbare focus, labels, contrast, aanraakdoelen en
  focusherstel na menu's en dialogs.
- Behoud van navigatie en interacties; gerichte tests waar extracties of
  presentatiewijzigingen die kunnen beïnvloeden.
- Geen onbedoelde visuele wijzigingen op nog niet beoordeelde pagina's.
- `npm run check` vanuit `src/frontend`: lint, TypeScript, tests en productiebuild.
- Meld bestaande blokkades afzonderlijk, zonder backendwerk toe te voegen.

Werk na oplevering de status in dit document bij en benoem wat nog op beoordeling
wacht. Begin niet zelfstandig aan de volgende pagina.

## Startprompt voor een volgende chat

> Lees @docs/design-plan.md en de toepasselijke AGENTS.md. Werk nu uitsluitend
> de UI/UX van [pagina + routebestand] uit volgens dit plan en de bestaande
> dashboardstijl. Hergebruik de presentatie in /preview-design/[pageName] met
> relevante scenario's. Behoud backend en functionele logica. Controleer responsive
> gedrag en toegankelijkheid, lever desktop- en mobiele screenshots en voer
> npm run check uit. Stop daarna voor mijn beoordeling en werk de voortgang bij.
