# Vefforritun 2 2026, verkefni 2

## Markmið

- Setja upp einfaldan vef með TypeScript, Hono og PostgreSQL.
- Vinna með gagnagrunn og skrifa SQL fyrirspurnir.
- Server-side rendering.
- Staðfesting gagna með Zod.

## Verkefnið

Útbúa skal einfaldan verkefnalista vef þar sem notandi getur:

- Séð lista af verkefnum.
- Bætt við nýjum verkefnum.
- Merkt verkefni sem klárað/óklárað.
- Eytt stökum verkefnum.
- Eytt öllum kláruðum verkefnum í einu.

Verkefnið skal útfæra með:

- [Hono](https://hono.dev/) fyrir Node.js með server-side rendering með JSX.
- [PostgreSQL](https://www.postgresql.org/) gagnagrunn fyrir geymslu gagna.
- [Zod](https://zod.dev/) fyrir staðfestingu gagna.
- TypeScript fyrir type safety.
- Node.js test runner fyrir prófanir.

**Ekki skal nota client-side JavaScript.** Allur kóði skal keyra á bakenda og nota form til að senda aðgerðir og gögn á bakenda.

### Hono uppsetning

Setja skal upp Hono verkefni útfrá forskrift og hafa eftirfarandi slóðir:

- `GET /`, sækir lista af öllum verkefnum og birtir viðmót.
- `POST /add`, bætir við verkefni
- `POST /update/:id`, uppfærir verkefni með auðkenni `id`.
- `POST /delete/finished`, eyðir öllum verkefnum sem eru kláruð.
- `POST /delete/:id`, eyðir verkefni með auðkenni `id`.

Í öllum tilvikum þar sem stöðu er breytt með `POST` skal birta villu ef kemur upp, annars birta uppfært viðmót, þá er í lagi að senda (redirect) á rót (`/`). Villu má birta á sér síðu með „til baka“ hlekk.

Ef opnuð er önnur slóð skal birta 404 síðu.

### JSX sniðmát

Nota skal JSX sniðmát með Hono til að útbúa HTML. Að minnsta kosti skal vera með fimm:

- Layout sem stýrir grunn HTML sniði.
- Form til að búa til verkefni.
- Listi af verkefnum.
- Stakt verkefni.
- Síða og/eða villusíða.

### Gagnagrunnur og gögn

Setja skal upp PostgreSQL gagnagrunn með einni töflu `todos` sem inniheldur:

- `id`, serial primary key, auðkenni verkefnis.
- `title`, varchar(255), titill verkefnis.
- `finished`, boolean, hvort verkefni sé lokið (sjálfgefið `false`).
- `created`, timestamp, hvenær verkefni var búið til.

Öll föll sem vinna með gagnagrunn skal hafa í `src/lib/db.ts`, sjá gefinn grunn.

Þegar forrit er keyrt upp má búa til töflu ef hún er ekki til, sjá gefið fall og athugasemdir.

Sækja skal öll verkefni úr grunni og birta, ef engin verkefni eru til skal láta vita af því (empty state).

Þegar verkefni er búið til skal eingöngu vista það sem `title`, allir aðrir reitir skulu sjálfgefið vera settir.

Verkefni skal hafa sem sér texta input þannig að hægt sé að breyta texta þess ásamt því að merkja það klárað eða ekki í sömu aðgerð.

Við hvert verkefni skal vera takki til að eyða verkefninu.

Ef að minnsta kosti eitt verkefni er klárað skal vera takki sem eyðir öllum verkefnum sem búið er að klára.

Nota skal Zod til að staðfesta gögn sem koma frá notanda:

- Titill má ekki vera tómur (eftir trim).
- Titill má vera að hámarki 255 stafir.

Ef gögn eru ekki rétt (invalid) skal birta villuskilaboð fyrir ofan formið.

### Útlit

Setja skal upp _einfalt_ útlit með CSS í `static/styles.css`.

Allt CSS skal vera í gefinni CSS skrá.

Leyfilegt er að endurnýta útlit úr [sýnilausn á verkefni 8 í vef1 2025](https://github.com/vefforritun/vef1-2025-v8-synilausn?tab=readme-ov-file) (sýnilausn gerir það).

### Tæki, tól og test

Nota skal Node.js 24 og NPM.

Aðeins skal nota ECMAScript modules (ESM, `import` og `export`) og ekki CommonJS (`require`).

Setja skal upp `eslint` með TypeScript og strict type checking (`"strict": true` í `tsconfig.json`). Engar villur eða viðvaranir skulu vera til staðar.

Nota skal týpur og þær sem deilt er skal geyma í `types.ts`.

Í verkefni skal skrifa próf með [Node.js test runner](https://nodejs.org/docs/latest-v24.x/api/test.html). Skrifa skal a.m.k. tvö próf fyrir einhvern kóða.

GitHub Action til að keyra lint og test við hvert push er gefið.

### GitHub og hýsing

Verkefnið skal keyra á [Render](https://render.com/) eða álíka þjónustu sem styður PostgreSQL og Node.js. Einnig er hægt að setja upp postgres á [Neon](https://neon.com/) eða álíka sértækum postgres hýsingum.

Lesa skal `DATABASE_URL` úr environment variable fyrir tengingu við gagnagrunn, sjá `.env.example`.

## Mat

- 20% – Hono uppsetning
- 20% – JSX sniðmát
- 30% – Gagnagrunnur og gögn
- 10% — Útlit
- 10% – Tæki, tól og test
- 10% – GitHub og hýsing

## Sett fyrir

Verkefni sett fyrir í fyrirlestri miðivkudaginn 28. janúar 2026.

## Skil

Skila skal í Canvas í seinasta lagi fyrir lok dags fimmtudaginn 12. febrúar 2026.

Skil skulu innihalda:

- Slóð á verkefni keyrandi á Netlify.
- Slóð á GitHub repo fyrir verkefni. Dæmatímakennurum skal hafa verið boðið í repo. Notendanöfn þeirra eru:
  - `KristinFrida`
  - `MarzukIngi`
  - `osk`

## Aðstoð

Leyfilegt er að ræða, og vinna saman að verkefni en **skrifið ykkar eigin lausn**. Ef tvær eða fleiri lausnir eru mjög líkar þarf að færa rök fyrir því, annars munu allir hlutaðeigandi hugsanlega fá 0 fyrir verkefnið.

Ekki er heimilt að nota stór mállíkön til að vinna verkefni í námskeiðinu, [sjá nánar um notkun](https://github.com/vefforritun/vef2-2026/blob/main/mallikon.md).

## Einkunn

Sett verða fyrir ([sjá nánar í kynningu á áfanga](https://github.com/vefforritun/vef2-2026/blob/main/namsefni/01.kynning/1.kynning.md)):

- fimm minni sem gilda 10% hvert, samtals 50% af lokaeinkunn.
- tvö hópverkefni þar sem hvort um sig gildir 20%, samtals 40% af lokaeinkunn.
- einstaklingsverkefni sem gildir 15–25% af lokaeinkunn.

---

> Útgáfa 0.1

| Útgáfa | Breyting      |
| ------ | ------------- |
| 0.1    | Fyrsta útgáfa |
