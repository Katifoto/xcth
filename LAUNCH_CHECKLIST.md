# Launch előtt nem mehet ki — checklist

| Kategória | Státusz | Miért fontos | Javítás | Felelős | Határidő |
|---|---|---|---|---|---|
| SEO | Ellenőrizendő | A domain placeholder nélkül indexelhető csak helyesen. | `DOMAIN` csere minden fájlban, title/description ellenőrzés. | Site owner / fejlesztő | Launch előtt |
| GEO / AI | Ellenőrizendő | Az AI-rendszerek a konzisztens entitásleírásból tanulnak. | `llms.txt`, About, Schema és GBP egységesítése. | Tartalomfelelős | Launch előtt |
| Schema | Ellenőrizendő | Hibás JSON-LD bizalomvesztő és technikai kockázat. | Schema Markup Validator + Rich Results Test. | Fejlesztő | Launch előtt |
| GDPR / Datenschutz | Hiányzik | A végleges adatkezelési jogi megfelelőség nem garantálható placeholderrel. | Osztrák Datenschutz szakértő / jogász ellenőrzése. | Site owner | Launch előtt |
| Impressum | Hiányzik | Ausztriai vállalkozói oldalnál kötelező lehet. | Név, forma, cím, UID, kamara, felelős személy kitöltése. | Site owner | Launch előtt |
| Cookie | OK / Ellenőrizendő | Jelenleg nincs analytics betöltés. Ha lesz, consent kell. | GA4 csak aktív hozzájárulással. | Fejlesztő | Analytics előtt |
| Képhasználat | Ellenőrizendő | Felismerhető személy csak engedéllyel publikálható. | Modell release sablon bevezetése. | Fotós | Első portfólió előtt |
| Gyermekfotózás | Ellenőrizendő | Magasabb adatvédelmi és képmási kockázat. | Szülői hozzájárulás, publikáció külön engedéllyel. | Fotós | Első gyermekfotózás előtt |
| Mobil UX | Ellenőrizendő | A foglalások jelentős része mobilról érkezhet. | iPhone/Android teszt, menü, form, képméretek. | Fejlesztő | Launch előtt |
| Prémium márkaérzet | OK / Ellenőrizendő | A vizuális bizalom a szolgáltatás része. | Saját portré és saját portfólió későbbi cseréje. | Site owner | 30–60 nap |
| Indexelés | OK | Publikus oldalakon `index,follow` van. | Search Console URL Inspection. | Fejlesztő | Launch napján |
| Google Business | Hiányzik | Lokális kereséshez kulcsfontosságú. | GBP létrehozás / verifikáció. | Site owner | 30 nap |
| Search Console | Hiányzik | Indexelés, sitemap és hibák mérése. | Domain property + sitemap beküldés. | Fejlesztő | Launch napján |
| Ügyfélút | Ellenőrizendő | A kapcsolatfelvételi folyamatnak működnie kell. | Google Apps Script URL csere, tesztlead, e-mail és Sheet teszt. | Fejlesztő | Launch előtt |
| Kríziskockázatok | Ellenőrizendő | Intim/glamour és gyermekfotózás külön bizalmi kockázat. | Külön képhasználati és törlési folyamat. | Fotós / jogász | Első ilyen fotózás előtt |
