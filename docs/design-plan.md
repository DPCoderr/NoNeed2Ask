# NoNeed2Ask — stapsgewijze UI/UX-vernieuwing

Dit document is het ontwerpplan en de overdracht voor volgende chats. Lees het
samen met de toepasselijke `AGENTS.md` en de huidige implementatie. Werk alleen
aan de pagina die de gebruiker aanwijst. Werk de voortgang hieronder bij na een
oplevering; onderscheid implementatie van goedkeuring door de gebruiker.

## Voortgang — 7 september 2026

| Onderdeel | Status |
| --- | --- |
| Dashboard, sidebar en bovenbalk | Uitgewerkt en met de gebruiker verfijnd; gebruiker heeft opdracht gegeven door te gaan naar applications. |
| Dashboard CSS-achtergrond | Gelaagde reliëfvormen opgeleverd; gebruiker heeft opdracht gegeven door te gaan naar applications. |
| Applications CSS-achtergrond | Compacte variant met reliëf rechtsboven geïmplementeerd; wacht op beoordeling. |
| Sollicitatielijst (applications) | Nieuwe UI en lokale preview opgeleverd; wacht op beoordeling. |
| Publieke statuspagina | Nieuwe publieke compositie en lokale preview opgeleverd; wacht op beoordeling. Op expliciete opdracht vóór sollicitatiedetail uitgevoerd. |
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

## CSS-achtergronden — dashboard eerst

Op expliciete opdracht zijn achtergrondafbeeldingen geschrapt ten gunste van
CSS-figuren. Na beoordeling zijn de dunne contourkaders vervangen door grotere, gelaagde reliëfvormen: herkenbaar, maar met rustige licht- en schaduwwerking.
De basis blijft `#F7F8FA`; de vormen gebruiken off-white en gedempte blauwgrijze tinten.
Geen raster, topografie, rotatie, glow of animatie.

Ronde 1 is uitgevoerd voor het dashboard: twee brede afgeronde oppervlakken
rechtsboven vormen samen een reliëf met zachte slagschaduwen en lichte randen.
Links staat een tweede, deels afgesneden vlak. De decoratie is begrensd tot
760 px hoog, vervaagt onderaan en scrollt met de inhoud mee. Op tablet worden
de vormen kleiner; onder 640 px blijft alleen de compositie rechts zichtbaar.
Kaarten blijven wit en
ondoorzichtig; de bestaande inhoud, acties en afstanden zijn behouden.

`WorkspaceBackground` en het lokale CSS-module staan in `components/layout`.
De dashboardvariant is actief op pathname `/`; de dashboardpreview
hergebruikt dezelfde code. De laag is verborgen voor hulptechnologie en vangt
geen muis- of aanraakacties af. Er zijn geen nieuwe dependencies, afbeeldingen,
SVG, clientstate of effects toegevoegd.

Verificatie van ronde 1:

- `npm run check` geslaagd: lint, TypeScript, 46 tests en productiebuild.
- 72 combinaties van scenario, schermbreedte en sidebarstand gecontroleerd op
  320, 390, 640, 768, 1024 en 1440 px, zonder horizontale overflow.
- Acht bestaande dashboardscenario's gecontroleerd, inclusief leeg, laden, fout,
  lange namen en uitgeschakelde/opslagtoestanden van delen.
- Geen nieuwe toegankelijkheidsbevindingen vergeleken met verborgen decoratie.
  Bestaand aandachtspunt: twee teksten in de development-previewbediening hebben
  contrast 4,48:1 tegenover de vereiste 4,5:1; dit staat los van de achtergrond.
- Delen, mobiele sidebar, Escape en focusherstel gecontroleerd; geen
  browserfouten of API-verzoeken. De laag scrollt mee en ontbreekt op applications
  en de publieke preview.
- Screenshots en browserrapport: `artifacts/dashboard-background-review/`.

Ronde 2 is op expliciete vervolgopdracht uitgevoerd voor applications. Dezelfde
reliëfstijl krijgt een compactere compositie rechtsboven, begrensd tot 320 px
hoog. Het vlak links vervalt en de achtergrond loopt onderaan over in de effen
basiskleur. De witte zoek-/filterbediening, tabel en mobiele rijen zijn behouden.
De applications-variant is alleen actief op pathname `/applications`, inclusief
de bestaande preview, niet op aanmaken, detail of bewerken. De standaardvariant
van het dashboard is behouden. Publiek en hero blijven buiten deze rondes.

Verificatie van ronde 2:

- `npm run check` geslaagd: lint, TypeScript, 46 tests en productiebuild.
- 72 combinaties van de acht previewscenario's, zes breedtes (320, 390, 640,
  768, 1024 en 1440 px) en sidebarstanden zonder horizontale overflow.
- Axe-controle van alle scenario's op 390, 768 en 1440 px: geen nieuwe
  bevindingen ten opzichte van verborgen decoratie; bestaande contrastmeldingen
  zijn vastgelegd in het browserrapport.
- Zoeken, statusfilter, sorteren, paginering, retry, lokaal verwijderen,
  verwijderfout, dialogs, mobiele sidebar en focusherstel gecontroleerd.
  Geen browserfouten of API-verzoeken; achtergrond scrollt mee.
- Screenshots en browserrapport: `artifacts/applications-background-review/`.

Applications wacht op beoordeling; geen volgende pagina gestart.

## Publieke statuspagina: huidige uitwerking

De route `/status/[slug]` gebruikt een eigen publieke omlijsting met het bestaande
logo en accountbestemmingen. De compositie
bevat een profielkop, statusverdeling, eerstvolgend interview en recente
sollicitaties. De bestaande berekeningen, sortering en limiet van tien recente
sollicitaties zijn behouden. De API, authenticatie en datacontracten zijn niet
gewijzigd. Er zijn geen private notities, identificatoren of bewerklinks toegevoegd.

De gedeelde presentatie staat in `src/frontend/components/status/public-status-*`.
De publieke route heeft ook een passende laadweergave, privéweergave, foutweergave
en 404. De algemene 404 en private dashboardpresentatie zijn niet herontworpen.
Er is geen nieuwe `useEffect` toegevoegd; de reguliere presentatie gebruikt Server
Components, met alleen de foutactie als expliciete clientcomponent.

`/preview-design/public-page` hergebruikt deze presentatie zonder private sidebar.
Negen scenario's zijn beschikbaar: gevuld, privé, privé met ingelogde bezoeker,
leeg, zonder interview, laden, fout, niet gevonden en lange tekst. De data en
referentiedatum staan vast; opnieuw proberen en navigatiemeldingen werken lokaal.
Alle previewroutes blijven buiten development een 404 geven.

Verificatie op 7 september 2026:

- `npm run check`: lint, TypeScript, 46 tests en productiebuild geslaagd.
- Negen scenario's gecontroleerd op 320, 390, 540, 640, 768, 900, 1024, 1280 en
  1440 px: geen horizontale paginascroll, ook bij lange woorden en functietitels.
- Axe WCAG A/AA-controle op 390, 768 en 1440 px: geen overtredingen in de negen
  scenario's na gerichte contrastcorrecties binnen de publieke presentatie.
- Skiplink met zichtbare focus en focusoverdracht, lokale retry,
  accountbestemmingen en de previewpaginakeuze gecontroleerd. Geen browserfouten
  of API-verzoeken tijdens de previewcontrole.
- Productieserver: publieke, dashboard-, applications- en onbekende previewroute
  geven daadwerkelijk 404, zonder fictieve profieldata in het antwoord.
- Screenshots en browserrapport: `artifacts/public-page-review/`. De opnamen
  gebruiken de geladen Inter-font en vaste fictieve gegevens.

Omgevingsbeperking: de eerste build in de netwerksandbox kon de bestaande Google
Fonts niet ophalen. De herhaling met netwerktoegang slaagde zonder codewijziging
aan de lettertypen. Er is geen resterende checkblokkade. De live backend is niet
integraal getest; de gegevens- en authenticatiestroom zijn ongewijzigd gebleven.

Na feedback zijn de overbodige tabs Overview, Journey en Updates verwijderd uit de publieke pagina en preview. De inhoud begint direct onder de merkbalk. Na verdere feedback gebruikt de publieke pagina weer de oorspronkelijke ronde, zwevende `LandingNavbar`, met compacte Inter-typografie en accountknoppen in de nieuwe dashboardstijl. De landingpagina behoudt haar bestaande navbarstijl; de publieke variant gebruikt een lokaal CSS-module via className en het oorspronkelijke mobiele menu. De overbodige sectietabs blijven verwijderd.

Deze pagina wacht op beoordeling. Er is geen volgende pagina gestart.

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
- Beschikbaar: `/preview-design/dashboard`, `/preview-design/applications` en
  `/preview-design/public-page`.
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
6. Publieke statuspagina: op expliciete opdracht eerder opgeleverd; wacht op beoordeling.
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

## Publieke navbar en CSS-achtergrond — nieuwe ronde

Op verzoek heeft de publieke pagina een eigen architecturale compositie: een
oversized gedempte blauwe boog met een uitgesneden binnenvlak, fijne lichtrand en
zachte materiaalschaduw, gecombineerd met een warme steenkleurige tegenvorm.
De vormen zijn volledig CSS, schalen mee met het scherm en scrollen met de pagina.
Alleen de decoratie wordt afgeknipt; ze ontvangt geen pointer-events en is verborgen
voor hulptechnologie. De presentatie wordt gedeeld door live pagina en preview.

De navbar gebruikt de ronde LandingNavbar met het oorspronkelijke mobiele menu.
Publieke typografie, pillvormige knoppen en focusringen staan in een lokaal
CSS-module; de eerdere losse accountnavigatie is verwijderd. Escape sluit het
menu en herstelt focus naar de menuknop. De sectietabs blijven verwijderd.

Verificatie: negen scenario's op negen breedtes (320–1440 px), zonder horizontale
overflow. De 27 axe-controles op 390, 768 en 1440 px rapporteren geen overtredingen.
Skiplink, lokale navigatie en retry werken; geen browserfouten of API-verzoeken.
Desktop- en mobiele screenshots staan in artifacts/public-page-review.
Een gerichte regressietest bewaakt het sluiten en focusherstel van het menu.
Dashboard en applications zijn in deze ronde niet aangepast. Wacht op beoordeling.


### Aanvulling: achtergrond onderaan de publieke pagina

Een tweede blauwgrijze boog vult nu de rechteronderhoek. De decoratieve container
volgt de volledige inhoudshoogte; de onderste boog is aan de onderrand verankerd,
zodat deze ook op lange mobiele pagina's tijdens het scrollen zichtbaar wordt.
De bestaande bovencompositie behoudt haar eigen fade. Beide lagen blijven achter
de ondoorzichtige kaarten en worden uitsluitend binnen de decoratielaag afgeknipt.
