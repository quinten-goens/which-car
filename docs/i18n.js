// Interface texts in the four languages used in Belgium: Dutch, French, German, English.
// {name} placeholders are filled in by t(key, vars). Values may contain simple HTML.
window.I18N = {
  en: {
    _name: "English", _locale: "en-GB",
    title: "Which car to buy?",
    lede: "How often each car model has defects at the Flemish periodic technical inspection, compared with <em>all cars of the same age</em>. Lower is better.",
    data_from: "Data", period_fmt: "{from} – {to}",
    step1: "Choose the age of the car you are considering",
    step2: "See which brands and models have fewer defects than average",
    step3: "Tick models in the table to compare them and see their weak spots",
    theme: "Theme", theme_auto: "Auto", theme_light: "Light", theme_dark: "Dark", lang: "Language",
    tile_insp: "inspections in the dataset",
    tile_models: "models from {b} brands",
    tile_brand: "best brand · {rel}",
    tile_model: "best model (≥ 2 ages) · {rel}",
    f_age: "Car age", f_min: "Brands with at least", f_min_suffix: "models", f_find: "Find", f_find_ph: "brand or model", f_clear: "Clear",
    brands_h: "Brands ranked",
    brands_sub: "Defects compared with cars of the same age. Bars to the left of 0 = fewer defects. Click a brand to see its models.",
    compare_h: "Compare models",
    compare_sub: "% of inspections with defects at each age, against the average of all cars that age.",
    compare_empty: "Tick up to 3 models in the table below to compare them here.",
    models_h: "Models ranked",
    models_sub: "Sorted from fewest to most defects relative to cars of the same age. Click a column header to sort.",
    leg_better: "fewer defects than average", leg_avg: "average", leg_worse: "more defects", leg_na: "— = not published (fewer than 500 inspections)",
    col_cmp: "Compare", col_rank: "#", col_model: "Model", col_brand: "Brand", col_score: "Score", col_ages: "Ages", col_km: "km vs avg", col_avg: "avg",
    rub_h: "Top-10 defect categories",
    rub_sub: "The defects found most often for this model, compared with all cars of the same age.",
    rub_empty: "Tick a model in the table to see its defect categories.",
    rub_col_rubric: "Category", rub_col_model: "Model", rub_col_class: "Average", rub_col_diff: "Difference", rub_col_bar: "Model (bar) vs average (line)",
    weak: "weak spot",
    no_brand: "No brand has that many models for the selected ages.",
    no_models: "No models match.",
    tt_vs_avg: "{rel} than cars of the same age",
    tt_models: "{n} models, {p} model × age data points",
    tt_best: "Best", tt_worst: "Worst", tt_defects: "Defects", tt_average: "average", tt_km: "Average km", tt_lt500: "fewer than 500 inspections – not published",
    avg_series: "Average",
    rel_fewer: "{n}% fewer defects", rel_more: "{n}% more defects", rel_same: "same as average",
    yrs: "years", yrs_s: "y",
    how_h: "How to read this dashboard",
    how_body: `<ul>
      <li><b>What is measured:</b> the share of periodic inspections where the inspector found at least one defect. A lower share means the car tends to be in better technical condition at that age.</li>
      <li><b>Why compare with the same age:</b> older cars always have more defects. Comparing each model with the average for cars of the same age makes young and old models comparable.</li>
      <li><b>Score:</b> the model’s defect rate divided by the average, combined over the selected age classes (geometric mean). −40% means 40% fewer inspections with defects than an average car of that age.</li>
      <li><b>Data gaps:</b> GOCA only publishes a model’s figures for an age class with at least 500 inspections. Rare models and young/old classes of a model are therefore missing.</li>
      <li><b>Not measured:</b> breakdowns between inspections, repair costs, safety in a crash, or how much maintenance the owner did before the inspection. Treat this as one useful signal, not a verdict.</li>
    </ul>`,
    footer: "Scraped {d} from the public <a href=\"{src}\" target=\"_blank\" rel=\"noopener\">GOCA Barometer</a>. Not affiliated with GOCA Vlaanderen.",
    load_err: "Could not load data.json ({e}). Serve this folder over HTTP, e.g. <code>python3 -m http.server -d docs</code>.",
    info: "More information",

    i_tile_insp: "Number of periodic technical inspections of passenger cars in Flanders in the period, <b>each vehicle counted once</b>. Re-inspections, inspections at sale and other vehicle categories are not included.",
    i_tile_models: "Only models with <b>at least 500 inspections in at least one age class</b> are published by GOCA. Less common models are not in the dataset at all.",
    i_tile_brand: "The brand with the best score for the selected ages, among brands with at least the chosen number of models.<br><br><b>Limit:</b> a brand score only covers the brand’s popular models (those with ≥ 500 inspections).",
    i_tile_model: "The model with the best score, among models with data in <b>at least 2</b> of the selected age classes. This avoids crowning a model on the basis of a single age class.",
    i_f_age: "Which age classes count towards the scores. Choose the age of the car you are thinking of buying – e.g. <b>4–5 years</b> for a young used car. Models without data in any selected class disappear from the rankings.<br><br>Age is the car’s age at the time of inspection.",
    i_f_min: "Hide brands with fewer models than this in the rankings. A brand with only 1 or 2 models is judged on very little data, so its score is less reliable.",
    i_f_find: "Filter the model table by brand or model name. Clicking a brand in the brand ranking fills this in for you.",
    i_theme: "Auto follows your device’s light/dark setting.",
    i_brands: "Each bar pools <b>every model × age class</b> of that brand for the selected ages, and compares their defect rates with the average for cars of the same age.<br><br><b>Limits of this chart:</b><ul><li>Only models with ≥ 500 inspections in an age class count; rare models are left out.</li><li>Each model × age data point counts equally, however many cars are behind it.</li><li>Age is accounted for, but mileage, use (taxi, company car) and owner maintenance are not.</li><li>Brands with few models are less reliable – use the “at least … models” filter.</li></ul>",
    i_compare: "Each line shows, per age class, the % of the model’s inspections that found at least one defect. The grey line is the average of all cars of that age.<br><br><b>Limits of this chart:</b><ul><li>A missing point means fewer than 500 inspections in that age class – GOCA doesn’t publish it.</li><li>All classes come from the same inspection year (Jul 2025 – Jun 2026). So the 14–15 year class holds <em>older production years</em>, not the same cars aged further. A new model generation can cause jumps.</li><li>The average covers all cars, not only cars of the same type or price class.</li></ul>",
    i_models: "<b>Limits of this table:</b><ul><li>“Defects” = at least one defect found at the inspection. The source doesn’t split this by severity here.</li><li>Some models are split by body style or naming (e.g. “Audi A3” and “Audi A3 Sportback”), exactly as in the source.</li><li>A score based on 1 age class is less robust than one based on several – check the “Ages” column.</li></ul>",
    i_col_cmp: "Tick up to 3 models to compare them in the chart and see their defect categories.",
    i_col_rank: "Position in the current sort order.",
    i_col_model: "Model name as published in the GOCA Barometer.",
    i_col_brand: "Car brand. Click a brand in the brand ranking to show only its models.",
    i_col_score: "How much more or less often this model has defects than an average car of the same age, over the selected age classes it has data for (geometric mean).<br><br><b>−40%</b> = 40% fewer inspections with defects than average. Negative is good.",
    i_col_ages: "In how many of the selected age classes this model has published figures (≥ 500 inspections). More ages = more robust score.",
    i_col_age: "% of this model’s inspections at {age} that found defects. The header shows the average for all cars of that age.<br><br>Blue = better than average, red = worse; the stronger the colour, the bigger the difference. — = fewer than 500 inspections, not published.",
    i_col_km: "Average odometer reading of this model compared with the average car of the same age (combined over the selected ages).<br><br>Cars with more km have more wear and usually more defects. A model with a good score <b>and</b> high mileage is extra convincing.",
    i_rub: "<b>Limits of this table:</b><ul><li>GOCA publishes only the <b>10 most frequent</b> defect categories per model and age. A category not listed can still occur.</li><li>Percentages are shares of all inspections of the model. One inspection can find several defects, so they don’t add up to the total defect rate.</li><li>In the source, several sub-codes share the name “Identification and documents”.</li><li>Category names were translated from Dutch; hover a name to see the original.</li></ul>",
    i_rub_col_rubric: "Inspection category, numbered as in the European roadworthiness rules (Directive 2014/45/EU).",
    i_rub_col_model: "% of this model’s inspections at this age where a defect in this category was found.",
    i_rub_col_class: "The same percentage for all cars of this age.",
    i_rub_col_diff: "How much more (+) or less (−) often this model has this defect than the average car of the same age.",
    i_rub_col_bar: "The bar is the model, the vertical line is the average. Bars are scaled to the largest value in this table.",
    i_weak: "This category occurs at least 25% more often on this model than on the average car of the same age. Worth checking when you look at a used car.",
  },

  nl: {
    _name: "Nederlands", _locale: "nl-BE",
    title: "Welke auto kopen?",
    lede: "Hoe vaak elk automodel gebreken heeft bij de Vlaamse periodieke keuring, vergeleken met <em>alle auto’s van dezelfde leeftijd</em>. Lager is beter.",
    data_from: "Gegevens", period_fmt: "{from} – {to}",
    step1: "Kies de leeftijd van de auto die je overweegt",
    step2: "Bekijk welke merken en modellen minder gebreken hebben dan gemiddeld",
    step3: "Vink modellen aan in de tabel om ze te vergelijken en hun zwakke punten te zien",
    theme: "Thema", theme_auto: "Auto", theme_light: "Licht", theme_dark: "Donker", lang: "Taal",
    tile_insp: "keuringen in de dataset",
    tile_models: "modellen van {b} merken",
    tile_brand: "beste merk · {rel}",
    tile_model: "beste model (≥ 2 leeftijden) · {rel}",
    f_age: "Leeftijd auto", f_min: "Merken met minstens", f_min_suffix: "modellen", f_find: "Zoek", f_find_ph: "merk of model", f_clear: "Wissen",
    brands_h: "Ranking merken",
    brands_sub: "Gebreken vergeleken met auto’s van dezelfde leeftijd. Balken links van 0 = minder gebreken. Klik op een merk om zijn modellen te zien.",
    compare_h: "Modellen vergelijken",
    compare_sub: "% keuringen met gebreken per leeftijd, tegenover het gemiddelde van alle auto’s van die leeftijd.",
    compare_empty: "Vink tot 3 modellen aan in de tabel hieronder om ze hier te vergelijken.",
    models_h: "Ranking modellen",
    models_sub: "Gesorteerd van minste naar meeste gebreken tegenover auto’s van dezelfde leeftijd. Klik op een kolomtitel om te sorteren.",
    leg_better: "minder gebreken dan gemiddeld", leg_avg: "gemiddeld", leg_worse: "meer gebreken", leg_na: "— = niet gepubliceerd (minder dan 500 keuringen)",
    col_cmp: "Vergelijk", col_rank: "#", col_model: "Model", col_brand: "Merk", col_score: "Score", col_ages: "Leeftijden", col_km: "km t.o.v. gem.", col_avg: "gem.",
    rub_h: "Top-10 gebreken per rubriek",
    rub_sub: "De gebreken die het vaakst gevonden worden bij dit model, vergeleken met alle auto’s van dezelfde leeftijd.",
    rub_empty: "Vink een model aan in de tabel om zijn gebreken te zien.",
    rub_col_rubric: "Rubriek", rub_col_model: "Model", rub_col_class: "Gemiddelde", rub_col_diff: "Verschil", rub_col_bar: "Model (balk) t.o.v. gemiddelde (lijn)",
    weak: "zwak punt",
    no_brand: "Geen enkel merk heeft zoveel modellen voor de gekozen leeftijden.",
    no_models: "Geen modellen gevonden.",
    tt_vs_avg: "{rel} dan auto’s van dezelfde leeftijd",
    tt_models: "{n} modellen, {p} datapunten (model × leeftijd)",
    tt_best: "Beste", tt_worst: "Slechtste", tt_defects: "Gebreken", tt_average: "gemiddeld", tt_km: "Gemiddelde km", tt_lt500: "minder dan 500 keuringen – niet gepubliceerd",
    avg_series: "Gemiddelde",
    rel_fewer: "{n}% minder gebreken", rel_more: "{n}% meer gebreken", rel_same: "gelijk aan gemiddelde",
    yrs: "jaar", yrs_s: "j",
    how_h: "Hoe lees je dit dashboard?",
    how_body: `<ul>
      <li><b>Wat wordt gemeten:</b> het aandeel periodieke keuringen waarbij de keurder minstens één gebrek vond. Een lager aandeel betekent dat de auto op die leeftijd doorgaans in betere technische staat is.</li>
      <li><b>Waarom vergelijken met dezelfde leeftijd:</b> oudere auto’s hebben altijd meer gebreken. Door elk model te vergelijken met het gemiddelde van auto’s van dezelfde leeftijd worden jonge en oude modellen vergelijkbaar.</li>
      <li><b>Score:</b> het gebrekenpercentage van het model gedeeld door het gemiddelde, gecombineerd over de gekozen leeftijdsklassen (meetkundig gemiddelde). −40% betekent 40% minder keuringen met gebreken dan een gemiddelde auto van die leeftijd.</li>
      <li><b>Ontbrekende gegevens:</b> GOCA publiceert de cijfers van een model enkel voor een leeftijdsklasse met minstens 500 keuringen. Zeldzame modellen en jonge/oude klassen van een model ontbreken daardoor.</li>
      <li><b>Niet gemeten:</b> pannes tussen keuringen, herstelkosten, veiligheid bij een ongeval, of hoeveel onderhoud de eigenaar vóór de keuring deed. Zie dit als één nuttig signaal, niet als eindoordeel.</li>
    </ul>`,
    footer: "Opgehaald op {d} uit de publieke <a href=\"{src}\" target=\"_blank\" rel=\"noopener\">GOCA Barometer</a>. Niet verbonden aan GOCA Vlaanderen.",
    load_err: "Kon data.json niet laden ({e}). Serveer deze map via HTTP, bv. <code>python3 -m http.server -d docs</code>.",
    info: "Meer informatie",

    i_tile_insp: "Aantal periodieke technische keuringen van personenwagens in Vlaanderen in de periode, <b>elk voertuig één keer</b>. Herkeuringen, keuringen bij verkoop en andere voertuigcategorieën tellen niet mee.",
    i_tile_models: "GOCA publiceert enkel modellen met <b>minstens 500 keuringen in minstens één leeftijdsklasse</b>. Minder courante modellen zitten helemaal niet in de dataset.",
    i_tile_brand: "Het merk met de beste score voor de gekozen leeftijden, onder de merken met minstens het gekozen aantal modellen.<br><br><b>Beperking:</b> een merkscore dekt enkel de populaire modellen van het merk (met ≥ 500 keuringen).",
    i_tile_model: "Het model met de beste score, onder de modellen met gegevens in <b>minstens 2</b> van de gekozen leeftijdsklassen. Zo wordt geen model gekroond op basis van één enkele klasse.",
    i_f_age: "Welke leeftijdsklassen meetellen in de scores. Kies de leeftijd van de auto die je wilt kopen – bv. <b>4–5 jaar</b> voor een jonge tweedehandswagen. Modellen zonder gegevens in de gekozen klassen verdwijnen uit de rankings.<br><br>De leeftijd is die van de auto op het moment van de keuring.",
    i_f_min: "Verberg merken met minder modellen dan dit in de rankings. Een merk met maar 1 of 2 modellen wordt beoordeeld op heel weinig gegevens, dus de score is minder betrouwbaar.",
    i_f_find: "Filter de modeltabel op merk of modelnaam. Klikken op een merk in de merkenranking vult dit voor je in.",
    i_theme: "Auto volgt de licht/donker-instelling van je toestel.",
    i_brands: "Elke balk bundelt <b>elk model × elke leeftijdsklasse</b> van dat merk voor de gekozen leeftijden, en vergelijkt hun gebrekenpercentages met het gemiddelde van auto’s van dezelfde leeftijd.<br><br><b>Beperkingen van deze grafiek:</b><ul><li>Enkel modellen met ≥ 500 keuringen in een leeftijdsklasse tellen mee; zeldzame modellen vallen weg.</li><li>Elk datapunt (model × leeftijd) telt even zwaar, hoeveel auto’s er ook achter zitten.</li><li>Er wordt rekening gehouden met leeftijd, maar niet met kilometerstand, gebruik (taxi, bedrijfswagen) of onderhoud door de eigenaar.</li><li>Merken met weinig modellen zijn minder betrouwbaar – gebruik de filter “minstens … modellen”.</li></ul>",
    i_compare: "Elke lijn toont per leeftijdsklasse het % keuringen van het model waarbij minstens één gebrek werd gevonden. De grijze lijn is het gemiddelde van alle auto’s van die leeftijd.<br><br><b>Beperkingen van deze grafiek:</b><ul><li>Een ontbrekend punt betekent minder dan 500 keuringen in die klasse – GOCA publiceert het niet.</li><li>Alle klassen komen uit hetzelfde keuringsjaar (jul 2025 – jun 2026). De klasse 14–15 jaar bevat dus <em>oudere bouwjaren</em>, niet dezelfde auto’s die ouder werden. Een nieuwe modelgeneratie kan sprongen veroorzaken.</li><li>Het gemiddelde omvat alle auto’s, niet enkel auto’s van hetzelfde type of dezelfde prijsklasse.</li></ul>",
    i_models: "<b>Beperkingen van deze tabel:</b><ul><li>“Gebreken” = minstens één gebrek vastgesteld bij de keuring. De bron splitst dit hier niet op naar ernst.</li><li>Sommige modellen zijn opgesplitst naar carrosserie of naam (bv. “Audi A3” en “Audi A3 Sportback”), precies zoals in de bron.</li><li>Een score op basis van 1 leeftijdsklasse is minder robuust dan een score op basis van meerdere – kijk naar de kolom “Leeftijden”.</li></ul>",
    i_col_cmp: "Vink tot 3 modellen aan om ze te vergelijken in de grafiek en hun gebreken per rubriek te zien.",
    i_col_rank: "Positie in de huidige sortering.",
    i_col_model: "Modelnaam zoals gepubliceerd in de GOCA Barometer.",
    i_col_brand: "Automerk. Klik op een merk in de merkenranking om enkel zijn modellen te tonen.",
    i_col_score: "Hoeveel vaker of minder vaak dit model gebreken heeft dan een gemiddelde auto van dezelfde leeftijd, over de gekozen leeftijdsklassen waarvoor het gegevens heeft (meetkundig gemiddelde).<br><br><b>−40%</b> = 40% minder keuringen met gebreken dan gemiddeld. Negatief is goed.",
    i_col_ages: "In hoeveel van de gekozen leeftijdsklassen dit model gepubliceerde cijfers heeft (≥ 500 keuringen). Meer leeftijden = robuustere score.",
    i_col_age: "% van de keuringen van dit model op {age} waarbij gebreken werden gevonden. De kolomtitel toont het gemiddelde van alle auto’s van die leeftijd.<br><br>Blauw = beter dan gemiddeld, rood = slechter; hoe sterker de kleur, hoe groter het verschil. — = minder dan 500 keuringen, niet gepubliceerd.",
    i_col_km: "Gemiddelde kilometerstand van dit model tegenover de gemiddelde auto van dezelfde leeftijd (gecombineerd over de gekozen leeftijden).<br><br>Auto’s met meer km hebben meer slijtage en meestal meer gebreken. Een model met een goede score <b>én</b> veel km is extra overtuigend.",
    i_rub: "<b>Beperkingen van deze tabel:</b><ul><li>GOCA publiceert enkel de <b>10 meest voorkomende</b> rubrieken per model en leeftijd. Een rubriek die niet vermeld wordt, kan toch voorkomen.</li><li>De percentages zijn aandelen van alle keuringen van het model. Eén keuring kan meerdere gebreken vinden, dus ze tellen niet op tot het totale gebrekenpercentage.</li><li>In de bron delen meerdere subcodes de naam “Identificatie en documenten”.</li></ul>",
    i_rub_col_rubric: "Keuringsrubriek, genummerd zoals in de Europese regels voor technische controle (Richtlijn 2014/45/EU).",
    i_rub_col_model: "% van de keuringen van dit model op deze leeftijd waarbij een gebrek in deze rubriek werd gevonden.",
    i_rub_col_class: "Hetzelfde percentage voor alle auto’s van deze leeftijd.",
    i_rub_col_diff: "Hoeveel vaker (+) of minder vaak (−) dit model dit gebrek heeft dan de gemiddelde auto van dezelfde leeftijd.",
    i_rub_col_bar: "De balk is het model, de verticale lijn het gemiddelde. De balken zijn geschaald op de grootste waarde in deze tabel.",
    i_weak: "Deze rubriek komt bij dit model minstens 25% vaker voor dan bij de gemiddelde auto van dezelfde leeftijd. Het nakijken waard bij een tweedehandswagen.",
  },

  fr: {
    _name: "Français", _locale: "fr-BE",
    title: "Quelle voiture acheter ?",
    lede: "À quelle fréquence chaque modèle présente des défauts lors du contrôle technique périodique en Flandre, par rapport à <em>toutes les voitures du même âge</em>. Plus bas, c’est mieux.",
    data_from: "Données", period_fmt: "{from} – {to}",
    step1: "Choisissez l’âge de la voiture que vous envisagez",
    step2: "Voyez quelles marques et quels modèles ont moins de défauts que la moyenne",
    step3: "Cochez des modèles dans le tableau pour les comparer et voir leurs points faibles",
    theme: "Thème", theme_auto: "Auto", theme_light: "Clair", theme_dark: "Sombre", lang: "Langue",
    tile_insp: "contrôles dans les données",
    tile_models: "modèles de {b} marques",
    tile_brand: "meilleure marque · {rel}",
    tile_model: "meilleur modèle (≥ 2 âges) · {rel}",
    f_age: "Âge de la voiture", f_min: "Marques avec au moins", f_min_suffix: "modèles", f_find: "Chercher", f_find_ph: "marque ou modèle", f_clear: "Effacer",
    brands_h: "Classement des marques",
    brands_sub: "Défauts par rapport aux voitures du même âge. Barres à gauche de 0 = moins de défauts. Cliquez sur une marque pour voir ses modèles.",
    compare_h: "Comparer des modèles",
    compare_sub: "% de contrôles avec défauts à chaque âge, par rapport à la moyenne de toutes les voitures de cet âge.",
    compare_empty: "Cochez jusqu’à 3 modèles dans le tableau ci-dessous pour les comparer ici.",
    models_h: "Classement des modèles",
    models_sub: "Triés du moins au plus de défauts par rapport aux voitures du même âge. Cliquez sur un en-tête de colonne pour trier.",
    leg_better: "moins de défauts que la moyenne", leg_avg: "moyenne", leg_worse: "plus de défauts", leg_na: "— = non publié (moins de 500 contrôles)",
    col_cmp: "Comparer", col_rank: "#", col_model: "Modèle", col_brand: "Marque", col_score: "Score", col_ages: "Âges", col_km: "km vs moy.", col_avg: "moy.",
    rub_h: "Top 10 des catégories de défauts",
    rub_sub: "Les défauts les plus fréquents pour ce modèle, par rapport à toutes les voitures du même âge.",
    rub_empty: "Cochez un modèle dans le tableau pour voir ses catégories de défauts.",
    rub_col_rubric: "Catégorie", rub_col_model: "Modèle", rub_col_class: "Moyenne", rub_col_diff: "Écart", rub_col_bar: "Modèle (barre) vs moyenne (trait)",
    weak: "point faible",
    no_brand: "Aucune marque n’a autant de modèles pour les âges choisis.",
    no_models: "Aucun modèle trouvé.",
    tt_vs_avg: "{rel} que les voitures du même âge",
    tt_models: "{n} modèles, {p} points de données (modèle × âge)",
    tt_best: "Meilleur", tt_worst: "Moins bon", tt_defects: "Défauts", tt_average: "moyenne", tt_km: "Km moyen", tt_lt500: "moins de 500 contrôles – non publié",
    avg_series: "Moyenne",
    rel_fewer: "{n} % de défauts en moins", rel_more: "{n} % de défauts en plus", rel_same: "égal à la moyenne",
    yrs: "ans", yrs_s: "a",
    how_h: "Comment lire ce tableau de bord",
    how_body: `<ul>
      <li><b>Ce qui est mesuré :</b> la part des contrôles techniques périodiques où l’inspecteur a constaté au moins un défaut. Une part plus faible signifie que la voiture est généralement en meilleur état technique à cet âge.</li>
      <li><b>Pourquoi comparer au même âge :</b> les voitures plus anciennes ont toujours plus de défauts. Comparer chaque modèle à la moyenne des voitures du même âge rend les modèles jeunes et anciens comparables.</li>
      <li><b>Score :</b> le taux de défauts du modèle divisé par la moyenne, combiné sur les classes d’âge choisies (moyenne géométrique). −40 % signifie 40 % de contrôles avec défauts en moins qu’une voiture moyenne de cet âge.</li>
      <li><b>Données manquantes :</b> le GOCA ne publie les chiffres d’un modèle que pour une classe d’âge comptant au moins 500 contrôles. Les modèles rares et certaines classes jeunes/anciennes d’un modèle manquent donc.</li>
      <li><b>Non mesuré :</b> pannes entre deux contrôles, coûts de réparation, sécurité en cas d’accident, ou entretien effectué par le propriétaire avant le contrôle. C’est un signal utile, pas un verdict.</li>
    </ul>`,
    footer: "Collecté le {d} depuis le <a href=\"{src}\" target=\"_blank\" rel=\"noopener\">GOCA Barometer</a> public. Sans lien avec GOCA Vlaanderen.",
    load_err: "Impossible de charger data.json ({e}). Servez ce dossier via HTTP, p. ex. <code>python3 -m http.server -d docs</code>.",
    info: "Plus d’informations",

    i_tile_insp: "Nombre de contrôles techniques périodiques de voitures particulières en Flandre sur la période, <b>chaque véhicule compté une fois</b>. Les contre-visites, contrôles lors d’une vente et autres catégories de véhicules ne sont pas inclus.",
    i_tile_models: "Le GOCA ne publie que les modèles ayant <b>au moins 500 contrôles dans au moins une classe d’âge</b>. Les modèles moins courants ne figurent pas du tout dans les données.",
    i_tile_brand: "La marque avec le meilleur score pour les âges choisis, parmi les marques ayant au moins le nombre de modèles choisi.<br><br><b>Limite :</b> le score d’une marque ne couvre que ses modèles populaires (≥ 500 contrôles).",
    i_tile_model: "Le modèle avec le meilleur score, parmi les modèles ayant des données dans <b>au moins 2</b> des classes d’âge choisies. Cela évite de couronner un modèle sur la base d’une seule classe.",
    i_f_age: "Les classes d’âge prises en compte dans les scores. Choisissez l’âge de la voiture que vous envisagez d’acheter – p. ex. <b>4–5 ans</b> pour une jeune occasion. Les modèles sans données dans les classes choisies disparaissent des classements.<br><br>L’âge est celui de la voiture au moment du contrôle.",
    i_f_min: "Masquer dans les classements les marques ayant moins de modèles que ce nombre. Une marque avec seulement 1 ou 2 modèles est jugée sur très peu de données ; son score est moins fiable.",
    i_f_find: "Filtrer le tableau des modèles par marque ou nom de modèle. Cliquer sur une marque dans le classement des marques le remplit pour vous.",
    i_theme: "Auto suit le réglage clair/sombre de votre appareil.",
    i_brands: "Chaque barre regroupe <b>chaque modèle × classe d’âge</b> de la marque pour les âges choisis, et compare leurs taux de défauts à la moyenne des voitures du même âge.<br><br><b>Limites de ce graphique :</b><ul><li>Seuls les modèles avec ≥ 500 contrôles dans une classe d’âge comptent ; les modèles rares sont exclus.</li><li>Chaque point (modèle × âge) a le même poids, quel que soit le nombre de voitures.</li><li>L’âge est pris en compte, mais pas le kilométrage, l’usage (taxi, voiture de société) ni l’entretien.</li><li>Les marques avec peu de modèles sont moins fiables – utilisez le filtre « au moins … modèles ».</li></ul>",
    i_compare: "Chaque ligne montre, par classe d’âge, le % de contrôles du modèle avec au moins un défaut. La ligne grise est la moyenne de toutes les voitures de cet âge.<br><br><b>Limites de ce graphique :</b><ul><li>Un point manquant signifie moins de 500 contrôles dans cette classe – le GOCA ne le publie pas.</li><li>Toutes les classes proviennent de la même année de contrôle (juil. 2025 – juin 2026). La classe 14–15 ans contient donc des <em>années de construction plus anciennes</em>, pas les mêmes voitures plus âgées. Une nouvelle génération de modèle peut provoquer des sauts.</li><li>La moyenne couvre toutes les voitures, pas seulement celles du même type ou de la même gamme de prix.</li></ul>",
    i_models: "<b>Limites de ce tableau :</b><ul><li>« Défauts » = au moins un défaut constaté lors du contrôle. La source ne détaille pas ici la gravité.</li><li>Certains modèles sont séparés par carrosserie ou appellation (p. ex. « Audi A3 » et « Audi A3 Sportback »), comme dans la source.</li><li>Un score basé sur 1 classe d’âge est moins robuste qu’un score basé sur plusieurs – voyez la colonne « Âges ».</li></ul>",
    i_col_cmp: "Cochez jusqu’à 3 modèles pour les comparer dans le graphique et voir leurs catégories de défauts.",
    i_col_rank: "Position dans le tri actuel.",
    i_col_model: "Nom du modèle tel que publié dans le GOCA Barometer.",
    i_col_brand: "Marque. Cliquez sur une marque dans le classement des marques pour n’afficher que ses modèles.",
    i_col_score: "À quel point ce modèle a plus ou moins souvent des défauts qu’une voiture moyenne du même âge, sur les classes d’âge choisies pour lesquelles il a des données (moyenne géométrique).<br><br><b>−40 %</b> = 40 % de contrôles avec défauts en moins que la moyenne. Négatif, c’est bien.",
    i_col_ages: "Dans combien des classes d’âge choisies ce modèle a des chiffres publiés (≥ 500 contrôles). Plus d’âges = score plus robuste.",
    i_col_age: "% des contrôles de ce modèle à {age} avec défauts. L’en-tête montre la moyenne de toutes les voitures de cet âge.<br><br>Bleu = mieux que la moyenne, rouge = moins bien ; plus la couleur est intense, plus l’écart est grand. — = moins de 500 contrôles, non publié.",
    i_col_km: "Kilométrage moyen de ce modèle par rapport à la voiture moyenne du même âge (combiné sur les âges choisis).<br><br>Les voitures avec plus de km sont plus usées et ont généralement plus de défauts. Un modèle avec un bon score <b>et</b> un kilométrage élevé est d’autant plus convaincant.",
    i_rub: "<b>Limites de ce tableau :</b><ul><li>Le GOCA ne publie que les <b>10 catégories les plus fréquentes</b> par modèle et âge. Une catégorie absente peut tout de même survenir.</li><li>Les pourcentages sont des parts de tous les contrôles du modèle. Un contrôle peut relever plusieurs défauts ; leur somme ne correspond donc pas au taux total.</li><li>Dans la source, plusieurs sous-codes portent le nom « Identification et documents ».</li><li>Les noms de catégories sont traduits du néerlandais ; survolez un nom pour voir l’original.</li></ul>",
    i_rub_col_rubric: "Catégorie de contrôle, numérotée comme dans les règles européennes de contrôle technique (directive 2014/45/UE).",
    i_rub_col_model: "% des contrôles de ce modèle à cet âge où un défaut de cette catégorie a été constaté.",
    i_rub_col_class: "Le même pourcentage pour toutes les voitures de cet âge.",
    i_rub_col_diff: "À quel point ce modèle a plus (+) ou moins (−) souvent ce défaut que la voiture moyenne du même âge.",
    i_rub_col_bar: "La barre représente le modèle, le trait vertical la moyenne. Les barres sont mises à l’échelle de la plus grande valeur du tableau.",
    i_weak: "Cette catégorie survient au moins 25 % plus souvent sur ce modèle que sur la voiture moyenne du même âge. À vérifier lors de l’achat d’une occasion.",
  },

  de: {
    _name: "Deutsch", _locale: "de-BE",
    title: "Welches Auto kaufen?",
    lede: "Wie oft jedes Automodell bei der periodischen technischen Prüfung in Flandern Mängel aufweist, verglichen mit <em>allen Autos gleichen Alters</em>. Niedriger ist besser.",
    data_from: "Daten", period_fmt: "{from} – {to}",
    step1: "Wählen Sie das Alter des Autos, das Sie in Betracht ziehen",
    step2: "Sehen Sie, welche Marken und Modelle weniger Mängel als der Durchschnitt haben",
    step3: "Haken Sie Modelle in der Tabelle an, um sie zu vergleichen und ihre Schwachstellen zu sehen",
    theme: "Design", theme_auto: "Auto", theme_light: "Hell", theme_dark: "Dunkel", lang: "Sprache",
    tile_insp: "Prüfungen im Datensatz",
    tile_models: "Modelle von {b} Marken",
    tile_brand: "beste Marke · {rel}",
    tile_model: "bestes Modell (≥ 2 Altersklassen) · {rel}",
    f_age: "Fahrzeugalter", f_min: "Marken mit mindestens", f_min_suffix: "Modellen", f_find: "Suchen", f_find_ph: "Marke oder Modell", f_clear: "Löschen",
    brands_h: "Markenranking",
    brands_sub: "Mängel im Vergleich zu Autos gleichen Alters. Balken links von 0 = weniger Mängel. Klicken Sie auf eine Marke, um ihre Modelle zu sehen.",
    compare_h: "Modelle vergleichen",
    compare_sub: "% der Prüfungen mit Mängeln je Alter, im Vergleich zum Durchschnitt aller Autos dieses Alters.",
    compare_empty: "Haken Sie bis zu 3 Modelle in der Tabelle unten an, um sie hier zu vergleichen.",
    models_h: "Modellranking",
    models_sub: "Sortiert von wenigsten zu meisten Mängeln im Vergleich zu Autos gleichen Alters. Klicken Sie auf eine Spaltenüberschrift zum Sortieren.",
    leg_better: "weniger Mängel als der Durchschnitt", leg_avg: "Durchschnitt", leg_worse: "mehr Mängel", leg_na: "— = nicht veröffentlicht (weniger als 500 Prüfungen)",
    col_cmp: "Vergleich", col_rank: "#", col_model: "Modell", col_brand: "Marke", col_score: "Score", col_ages: "Alter", col_km: "km vs. Ø", col_avg: "Ø",
    rub_h: "Top-10-Mängelkategorien",
    rub_sub: "Die bei diesem Modell am häufigsten festgestellten Mängel, verglichen mit allen Autos gleichen Alters.",
    rub_empty: "Haken Sie ein Modell in der Tabelle an, um seine Mängelkategorien zu sehen.",
    rub_col_rubric: "Kategorie", rub_col_model: "Modell", rub_col_class: "Durchschnitt", rub_col_diff: "Unterschied", rub_col_bar: "Modell (Balken) vs. Durchschnitt (Strich)",
    weak: "Schwachstelle",
    no_brand: "Keine Marke hat so viele Modelle für die gewählten Altersklassen.",
    no_models: "Keine Modelle gefunden.",
    tt_vs_avg: "{rel} als Autos gleichen Alters",
    tt_models: "{n} Modelle, {p} Datenpunkte (Modell × Alter)",
    tt_best: "Bestes", tt_worst: "Schlechtestes", tt_defects: "Mängel", tt_average: "Durchschnitt", tt_km: "Durchschnittliche km", tt_lt500: "weniger als 500 Prüfungen – nicht veröffentlicht",
    avg_series: "Durchschnitt",
    rel_fewer: "{n} % weniger Mängel", rel_more: "{n} % mehr Mängel", rel_same: "gleich wie Durchschnitt",
    yrs: "Jahre", yrs_s: "J.",
    how_h: "So lesen Sie dieses Dashboard",
    how_body: `<ul>
      <li><b>Was gemessen wird:</b> der Anteil der periodischen Prüfungen, bei denen der Prüfer mindestens einen Mangel festgestellt hat. Ein niedrigerer Anteil bedeutet, dass das Auto in diesem Alter meist in besserem technischen Zustand ist.</li>
      <li><b>Warum mit gleichem Alter vergleichen:</b> ältere Autos haben immer mehr Mängel. Wenn man jedes Modell mit dem Durchschnitt gleich alter Autos vergleicht, werden junge und alte Modelle vergleichbar.</li>
      <li><b>Score:</b> die Mängelquote des Modells geteilt durch den Durchschnitt, kombiniert über die gewählten Altersklassen (geometrisches Mittel). −40 % bedeutet 40 % weniger Prüfungen mit Mängeln als ein durchschnittliches Auto dieses Alters.</li>
      <li><b>Datenlücken:</b> GOCA veröffentlicht die Zahlen eines Modells nur für Altersklassen mit mindestens 500 Prüfungen. Seltene Modelle und junge/alte Klassen eines Modells fehlen daher.</li>
      <li><b>Nicht gemessen:</b> Pannen zwischen den Prüfungen, Reparaturkosten, Sicherheit bei einem Unfall oder die Wartung durch den Halter vor der Prüfung. Betrachten Sie dies als ein nützliches Signal, nicht als Urteil.</li>
    </ul>`,
    footer: "Am {d} aus dem öffentlichen <a href=\"{src}\" target=\"_blank\" rel=\"noopener\">GOCA Barometer</a> erhoben. Nicht mit GOCA Vlaanderen verbunden.",
    load_err: "data.json konnte nicht geladen werden ({e}). Stellen Sie diesen Ordner über HTTP bereit, z. B. <code>python3 -m http.server -d docs</code>.",
    info: "Weitere Informationen",

    i_tile_insp: "Anzahl der periodischen technischen Prüfungen von Pkw in Flandern im Zeitraum, <b>jedes Fahrzeug einmal gezählt</b>. Nachprüfungen, Prüfungen beim Verkauf und andere Fahrzeugklassen sind nicht enthalten.",
    i_tile_models: "GOCA veröffentlicht nur Modelle mit <b>mindestens 500 Prüfungen in mindestens einer Altersklasse</b>. Seltenere Modelle sind gar nicht im Datensatz.",
    i_tile_brand: "Die Marke mit dem besten Score für die gewählten Altersklassen, unter den Marken mit mindestens der gewählten Anzahl Modelle.<br><br><b>Einschränkung:</b> ein Markenscore umfasst nur die populären Modelle der Marke (≥ 500 Prüfungen).",
    i_tile_model: "Das Modell mit dem besten Score unter den Modellen mit Daten in <b>mindestens 2</b> der gewählten Altersklassen. So wird kein Modell anhand einer einzigen Klasse gekürt.",
    i_f_age: "Welche Altersklassen in die Scores einfließen. Wählen Sie das Alter des Autos, das Sie kaufen möchten – z. B. <b>4–5 Jahre</b> für einen jungen Gebrauchtwagen. Modelle ohne Daten in den gewählten Klassen verschwinden aus den Rankings.<br><br>Das Alter ist das Alter des Autos zum Zeitpunkt der Prüfung.",
    i_f_min: "Marken mit weniger Modellen als dieser Zahl in den Rankings ausblenden. Eine Marke mit nur 1 oder 2 Modellen wird auf sehr wenigen Daten beurteilt; ihr Score ist weniger zuverlässig.",
    i_f_find: "Die Modelltabelle nach Marke oder Modellname filtern. Ein Klick auf eine Marke im Markenranking füllt dies für Sie aus.",
    i_theme: "Auto folgt der Hell/Dunkel-Einstellung Ihres Geräts.",
    i_brands: "Jeder Balken fasst <b>jedes Modell × jede Altersklasse</b> der Marke für die gewählten Altersklassen zusammen und vergleicht ihre Mängelquoten mit dem Durchschnitt gleich alter Autos.<br><br><b>Grenzen dieser Grafik:</b><ul><li>Nur Modelle mit ≥ 500 Prüfungen in einer Altersklasse zählen; seltene Modelle fehlen.</li><li>Jeder Datenpunkt (Modell × Alter) zählt gleich, egal wie viele Autos dahinterstehen.</li><li>Das Alter wird berücksichtigt, nicht aber Kilometerstand, Nutzung (Taxi, Firmenwagen) oder Wartung durch den Halter.</li><li>Marken mit wenigen Modellen sind weniger zuverlässig – nutzen Sie den Filter „mindestens … Modellen“.</li></ul>",
    i_compare: "Jede Linie zeigt je Altersklasse den % der Prüfungen des Modells mit mindestens einem Mangel. Die graue Linie ist der Durchschnitt aller Autos dieses Alters.<br><br><b>Grenzen dieser Grafik:</b><ul><li>Ein fehlender Punkt bedeutet weniger als 500 Prüfungen in dieser Klasse – GOCA veröffentlicht ihn nicht.</li><li>Alle Klassen stammen aus demselben Prüfjahr (Jul. 2025 – Jun. 2026). Die Klasse 14–15 Jahre enthält also <em>ältere Baujahre</em>, nicht dieselben Autos in höherem Alter. Eine neue Modellgeneration kann Sprünge verursachen.</li><li>Der Durchschnitt umfasst alle Autos, nicht nur Autos desselben Typs oder derselben Preisklasse.</li></ul>",
    i_models: "<b>Grenzen dieser Tabelle:</b><ul><li>„Mängel“ = mindestens ein bei der Prüfung festgestellter Mangel. Die Quelle unterscheidet hier nicht nach Schwere.</li><li>Manche Modelle sind nach Karosserie oder Bezeichnung getrennt (z. B. „Audi A3“ und „Audi A3 Sportback“), genau wie in der Quelle.</li><li>Ein Score aus 1 Altersklasse ist weniger robust als einer aus mehreren – siehe Spalte „Alter“.</li></ul>",
    i_col_cmp: "Haken Sie bis zu 3 Modelle an, um sie in der Grafik zu vergleichen und ihre Mängelkategorien zu sehen.",
    i_col_rank: "Position in der aktuellen Sortierung.",
    i_col_model: "Modellname wie im GOCA Barometer veröffentlicht.",
    i_col_brand: "Automarke. Klicken Sie im Markenranking auf eine Marke, um nur ihre Modelle anzuzeigen.",
    i_col_score: "Wie viel häufiger oder seltener dieses Modell Mängel hat als ein durchschnittliches Auto gleichen Alters, über die gewählten Altersklassen mit Daten (geometrisches Mittel).<br><br><b>−40 %</b> = 40 % weniger Prüfungen mit Mängeln als der Durchschnitt. Negativ ist gut.",
    i_col_ages: "In wie vielen der gewählten Altersklassen dieses Modell veröffentlichte Zahlen hat (≥ 500 Prüfungen). Mehr Altersklassen = robusterer Score.",
    i_col_age: "% der Prüfungen dieses Modells mit {age}, bei denen Mängel festgestellt wurden. Die Überschrift zeigt den Durchschnitt aller Autos dieses Alters.<br><br>Blau = besser als der Durchschnitt, rot = schlechter; je kräftiger die Farbe, desto größer der Unterschied. — = weniger als 500 Prüfungen, nicht veröffentlicht.",
    i_col_km: "Durchschnittlicher Kilometerstand dieses Modells im Vergleich zum durchschnittlichen Auto gleichen Alters (kombiniert über die gewählten Altersklassen).<br><br>Autos mit mehr km haben mehr Verschleiß und meist mehr Mängel. Ein Modell mit gutem Score <b>und</b> hoher Laufleistung ist besonders überzeugend.",
    i_rub: "<b>Grenzen dieser Tabelle:</b><ul><li>GOCA veröffentlicht nur die <b>10 häufigsten</b> Kategorien je Modell und Alter. Eine nicht aufgeführte Kategorie kann trotzdem vorkommen.</li><li>Die Prozentsätze sind Anteile an allen Prüfungen des Modells. Eine Prüfung kann mehrere Mängel finden; sie ergeben daher nicht die Gesamtmängelquote.</li><li>In der Quelle tragen mehrere Untercodes den Namen „Identifizierung und Dokumente“.</li><li>Die Kategorienamen wurden aus dem Niederländischen übersetzt; fahren Sie über einen Namen, um das Original zu sehen.</li></ul>",
    i_rub_col_rubric: "Prüfkategorie, nummeriert wie in den europäischen Vorschriften zur technischen Überwachung (Richtlinie 2014/45/EU).",
    i_rub_col_model: "% der Prüfungen dieses Modells in diesem Alter, bei denen ein Mangel in dieser Kategorie festgestellt wurde.",
    i_rub_col_class: "Derselbe Prozentsatz für alle Autos dieses Alters.",
    i_rub_col_diff: "Wie viel häufiger (+) oder seltener (−) dieses Modell diesen Mangel hat als das durchschnittliche Auto gleichen Alters.",
    i_rub_col_bar: "Der Balken ist das Modell, der senkrechte Strich der Durchschnitt. Die Balken sind auf den größten Wert in dieser Tabelle skaliert.",
    i_weak: "Diese Kategorie tritt bei diesem Modell mindestens 25 % häufiger auf als beim durchschnittlichen Auto gleichen Alters. Beim Gebrauchtwagenkauf prüfenswert.",
  },
};

// Inspection categories (Dutch source name -> en / fr / de), following Directive 2014/45/EU Annex I.
window.RUBRICS = {
  "Identificatie en documenten": ["Identification and documents", "Identification et documents", "Identifizierung und Dokumente"],
  "Kentekenplaten": ["Registration plates", "Plaques d’immatriculation", "Kennzeichenschilder"],
  "Chassisnummer en documenten": ["Chassis number and documents", "Numéro de châssis et documents", "Fahrgestellnummer und Dokumente"],
  "Remmen, mechanische toestand": ["Brakes, mechanical condition", "Freins, état mécanique", "Bremsen, mechanischer Zustand"],
  "Bedrijfsrem: remkracht": ["Service brake: performance", "Frein de service : efficacité", "Betriebsbremse: Bremswirkung"],
  "Parkeerrem: remkracht": ["Parking brake: performance", "Frein de stationnement : efficacité", "Feststellbremse: Bremswirkung"],
  "Stuurinrichting, mechanische toestand": ["Steering, mechanical condition", "Direction, état mécanique", "Lenkanlage, mechanischer Zustand"],
  "Stuur en stuurkolom": ["Steering wheel and column", "Volant et colonne de direction", "Lenkrad und Lenksäule"],
  "Speling stuurinrichting": ["Steering play", "Jeu dans la direction", "Lenkspiel"],
  "Wieluitlijning": ["Wheel alignment", "Parallélisme des roues", "Spureinstellung"],
  "Elektronische stuurbekrachtiging": ["Electronic power steering", "Direction assistée électronique", "Elektronische Servolenkung"],
  "Gezichtsveld": ["Field of vision", "Champ de vision", "Sichtfeld"],
  "Ruiten": ["Glazing", "Vitrages", "Verglasung"],
  "Achteruitkijkspiegels": ["Rear-view mirrors", "Rétroviseurs", "Rückspiegel"],
  "Ruitenwissers": ["Windscreen wipers", "Essuie-glaces", "Scheibenwischer"],
  "Ruitensproeiers": ["Windscreen washers", "Lave-glaces", "Scheibenwaschanlage"],
  "Koplampen": ["Headlamps", "Projecteurs", "Scheinwerfer"],
  "Elektrische bedrading": ["Electrical wiring", "Câblage électrique", "Elektrische Leitungen"],
  "Accu": ["Battery", "Batterie", "Batterie"],
  "Stand-, achter- en dagrijlichten": ["Position, rear and daytime running lamps", "Feux de position, arrière et de jour", "Begrenzungs-, Schluss- und Tagfahrleuchten"],
  "Remlichten": ["Stop lamps", "Feux stop", "Bremsleuchten"],
  "Richtingaanwijzers": ["Direction indicators", "Clignotants", "Fahrtrichtungsanzeiger"],
  "Mistlichten": ["Fog lamps", "Feux de brouillard", "Nebelleuchten"],
  "Kentekenplaatverlichting": ["Registration plate lamp", "Éclairage de la plaque", "Kennzeichenbeleuchtung"],
  "Reflectoren": ["Reflectors", "Catadioptres", "Rückstrahler"],
  "Verklikkerlichten": ["Tell-tales", "Témoins", "Kontrollleuchten"],
  "Assen": ["Axles", "Essieux", "Achsen"],
  "Wielen en banden": ["Wheels and tyres", "Roues et pneumatiques", "Räder und Reifen"],
  "Ophanging": ["Suspension", "Suspension", "Aufhängung"],
  "Chassis en bevestigingen": ["Chassis and attachments", "Châssis et fixations", "Fahrgestell und Anbauteile"],
  "Cabine en koetswerk": ["Cab and bodywork", "Cabine et carrosserie", "Fahrerhaus und Aufbau"],
  "Veiligheidsgordels en beveiligingssystemen": ["Seat belts and restraint systems", "Ceintures de sécurité et systèmes de retenue", "Sicherheitsgurte und Rückhaltesysteme"],
  "Kilometerteller": ["Odometer", "Compteur kilométrique", "Kilometerzähler"],
  "Stabiliteitscontrole (ESC)": ["Electronic stability control (ESC)", "Contrôle de stabilité (ESC)", "Stabilitätskontrolle (ESC)"],
  "Claxon": ["Horn", "Avertisseur sonore", "Hupe"],
  "Geluid": ["Noise", "Bruit", "Geräusch"],
  "Uitlaatemissies": ["Exhaust emissions", "Émissions à l’échappement", "Abgasemissionen"],
  "Vloeistoflekken": ["Fluid leaks", "Fuites de liquides", "Flüssigkeitsverluste"],
  "Voertuig enkel voor wedstrijden (rally), verboden voor het normale verkeer": ["Competition-only vehicle (rally), not allowed on public roads", "Véhicule de compétition (rallye), interdit sur la voie publique", "Wettbewerbsfahrzeug (Rallye), nicht für den Straßenverkehr zugelassen"],
  "Remschijven niet reglementair (tuning)": ["Non-compliant brake discs (tuning)", "Disques de frein non conformes (tuning)", "Nicht vorschriftsmäßige Bremsscheiben (Tuning)"],
};

// ---- head-to-head tab and "—" explanations
Object.assign(window.I18N.en, {
  tab_overview: "Overview", tab_h2h: "Head to head",
  h2h_mode: "Compare", h2h_models: "Two models", h2h_brands: "Two brands", h2h_swap: "Swap", h2h_vs: "vs",
  h2h_intro: "Pick two models or two brands to compare them side by side, for the car ages selected above.",
  h2h_better: "<b>{a}</b> had <b>{n}% fewer defects</b> than <b>{b}</b>", h2h_equal: "<b>{a}</b> and <b>{b}</b> had about the same defect rate",
  h2h_common: "at the {k} selected age class(es) where both have data.", h2h_none: "There is no selected age class where both have data, so they can’t be compared directly. Compare their scores (each vs. the average) instead.",
  h2h_same: "Pick two different ones to compare.",
  h2h_score: "Score vs. same-age average", h2h_nmodels: "{n} models", h2h_nages: "data for {n} of the selected ages",
  h2h_chart_h: "Defect rate by age", h2h_table_h: "Age by age",
  col_age: "Age", col_winner: "Fewer defects", col_avg_full: "Average all cars", col_kmA: "km {x}", tie: "tie",
  h2h_rub_h: "Defect categories side by side", h2h_rub_sub: "Union of both models’ top-10 categories at the chosen age, sorted by the highest of the two.",
  h2h_models_h: "Models of each brand", h2h_weak_h: "Most frequent weak spots",
  h2h_weak_row: "weak spot in {k} of {n} model × age combinations", h2h_weak_none: "No category is a weak spot in more than one model × age combination.",
  i_na: "<b>— means no figure was published</b>: this model had fewer than 500 inspections in that age class (for example because it was too new, or too rare at that age). It does <b>not</b> mean zero defects.",
  i_h2h_mode: "Compare two individual models, or two brands as a whole (all their published models pooled).",
  i_h2h_verdict: "Direct comparison at the age classes where <b>both</b> have published data, so age differences can’t skew it (geometric mean of the ratio of their defect rates).<br><br><b>Limit:</b> if they share only one age class, this rests on that single class.",
  i_h2h_score: "Each side’s own score versus the average car of the same age, over all selected ages it has data for – the same score as in the overview. The two can be based on different age classes.",
  i_h2h_chart_models: "% of inspections with defects at each age for both models; grey = average of all cars that age.<br><br><b>Limits:</b><ul><li>No point = fewer than 500 inspections, not published.</li><li>All ages come from one inspection year, so each age class is a different set of production years – a new generation can cause jumps.</li></ul>",
  i_h2h_chart_brands: "For each age: the brand’s pooled score at that age × the average defect rate of all cars that age – i.e. the defect rate of a ‘typical’ model of that brand.<br><br><b>Limits:</b><ul><li>Only models with ≥ 500 inspections at that age count, so the set of models behind each point can differ between ages.</li><li>Each model counts equally, however many cars are behind it.</li></ul>",
  i_h2h_table: "The figures behind the chart, per age class. — = fewer than 500 inspections, not published.",
  i_col_winner: "Which side had the lower defect rate at this age. Shown only when both have data.",
  i_col_brand_age: "Defect rate of a typical model of this brand at this age (pooled score × average), with the number of models it is based on.",
  i_h2h_rub: "Each row is a category in the top 10 of at least one of the two models at this age.<br><br><b>≤ x%</b>: the category is not in that model’s top 10, so its rate is at most the model’s 10th-ranked value – the exact figure isn’t published.<br><b>—</b>: no data for that model at this age (fewer than 500 inspections).",
  i_h2h_models: "Every published model of the brand that has data for the selected ages, with its score versus the same-age average. Brands are compared on these models only.",
  i_h2h_weak: "Defect categories that are a weak spot (≥ 25% above the same-age average) in the most model × age combinations of the brand.<br><br><b>Limit:</b> only each model’s top-10 categories are published, so a weak spot outside a top 10 can’t be seen.",
});
Object.assign(window.I18N.nl, {
  tab_overview: "Overzicht", tab_h2h: "Eén tegen één",
  h2h_mode: "Vergelijk", h2h_models: "Twee modellen", h2h_brands: "Twee merken", h2h_swap: "Wissel", h2h_vs: "vs",
  h2h_intro: "Kies twee modellen of twee merken om ze naast elkaar te vergelijken, voor de leeftijden die je hierboven koos.",
  h2h_better: "<b>{a}</b> had <b>{n}% minder gebreken</b> dan <b>{b}</b>", h2h_equal: "<b>{a}</b> en <b>{b}</b> hadden ongeveer evenveel gebreken",
  h2h_common: "in de {k} gekozen leeftijdsklasse(n) waarin beide gegevens hebben.", h2h_none: "Er is geen gekozen leeftijdsklasse waarin beide gegevens hebben, dus een rechtstreekse vergelijking is niet mogelijk. Vergelijk in de plaats hun scores (elk tegenover het gemiddelde).",
  h2h_same: "Kies er twee verschillende om te vergelijken.",
  h2h_score: "Score t.o.v. gemiddelde van dezelfde leeftijd", h2h_nmodels: "{n} modellen", h2h_nages: "gegevens voor {n} van de gekozen leeftijden",
  h2h_chart_h: "Gebreken per leeftijd", h2h_table_h: "Leeftijd per leeftijd",
  col_age: "Leeftijd", col_winner: "Minder gebreken", col_avg_full: "Gemiddelde alle auto’s", col_kmA: "km {x}", tie: "gelijk",
  h2h_rub_h: "Gebreken per rubriek naast elkaar", h2h_rub_sub: "Alle rubrieken uit de top 10 van beide modellen op de gekozen leeftijd, gesorteerd op de hoogste van de twee.",
  h2h_models_h: "Modellen van elk merk", h2h_weak_h: "Vaakste zwakke punten",
  h2h_weak_row: "zwak punt in {k} van {n} combinaties model × leeftijd", h2h_weak_none: "Geen enkele rubriek is een zwak punt in meer dan één combinatie model × leeftijd.",
  i_na: "<b>— betekent dat er geen cijfer gepubliceerd is</b>: dit model had minder dan 500 keuringen in die leeftijdsklasse (bv. omdat het te nieuw was, of te zeldzaam op die leeftijd). Het betekent <b>niet</b> nul gebreken.",
  i_h2h_mode: "Vergelijk twee afzonderlijke modellen, of twee merken in hun geheel (alle gepubliceerde modellen samen).",
  i_h2h_verdict: "Rechtstreekse vergelijking in de leeftijdsklassen waarin <b>beide</b> gepubliceerde gegevens hebben, zodat leeftijdsverschillen het niet vertekenen (meetkundig gemiddelde van de verhouding van hun gebrekenpercentages).<br><br><b>Beperking:</b> als ze maar één leeftijdsklasse delen, rust dit op die ene klasse.",
  i_h2h_score: "De eigen score van elke kant tegenover de gemiddelde auto van dezelfde leeftijd, over alle gekozen leeftijden waarvoor er gegevens zijn – dezelfde score als in het overzicht. Beide kunnen op andere leeftijdsklassen gebaseerd zijn.",
  i_h2h_chart_models: "% keuringen met gebreken per leeftijd voor beide modellen; grijs = gemiddelde van alle auto’s van die leeftijd.<br><br><b>Beperkingen:</b><ul><li>Geen punt = minder dan 500 keuringen, niet gepubliceerd.</li><li>Alle leeftijden komen uit één keuringsjaar, dus elke klasse bevat andere bouwjaren – een nieuwe generatie kan sprongen veroorzaken.</li></ul>",
  i_h2h_chart_brands: "Per leeftijd: de gebundelde score van het merk op die leeftijd × het gemiddelde gebrekenpercentage van alle auto’s van die leeftijd – dus het gebrekenpercentage van een ‘typisch’ model van dat merk.<br><br><b>Beperkingen:</b><ul><li>Enkel modellen met ≥ 500 keuringen op die leeftijd tellen mee, dus de modellen achter elk punt kunnen per leeftijd verschillen.</li><li>Elk model telt even zwaar, hoeveel auto’s er ook achter zitten.</li></ul>",
  i_h2h_table: "De cijfers achter de grafiek, per leeftijdsklasse. — = minder dan 500 keuringen, niet gepubliceerd.",
  i_col_winner: "Welke kant het laagste gebrekenpercentage had op deze leeftijd. Enkel getoond als beide gegevens hebben.",
  i_col_brand_age: "Gebrekenpercentage van een typisch model van dit merk op deze leeftijd (gebundelde score × gemiddelde), met het aantal modellen waarop het gebaseerd is.",
  i_h2h_rub: "Elke rij is een rubriek uit de top 10 van minstens één van de twee modellen op deze leeftijd.<br><br><b>≤ x%</b>: de rubriek staat niet in de top 10 van dat model, dus ligt ze hoogstens op de 10e waarde van dat model – het exacte cijfer wordt niet gepubliceerd.<br><b>—</b>: geen gegevens voor dat model op deze leeftijd (minder dan 500 keuringen).",
  i_h2h_models: "Elk gepubliceerd model van het merk met gegevens voor de gekozen leeftijden, met zijn score tegenover het gemiddelde van dezelfde leeftijd. Merken worden enkel op deze modellen vergeleken.",
  i_h2h_weak: "Rubrieken die een zwak punt zijn (≥ 25% boven het gemiddelde van dezelfde leeftijd) in de meeste combinaties model × leeftijd van het merk.<br><br><b>Beperking:</b> enkel de top-10-rubrieken van elk model worden gepubliceerd, dus een zwak punt buiten een top 10 is niet zichtbaar.",
});
Object.assign(window.I18N.fr, {
  tab_overview: "Vue d’ensemble", tab_h2h: "Face à face",
  h2h_mode: "Comparer", h2h_models: "Deux modèles", h2h_brands: "Deux marques", h2h_swap: "Inverser", h2h_vs: "vs",
  h2h_intro: "Choisissez deux modèles ou deux marques pour les comparer côte à côte, pour les âges sélectionnés ci-dessus.",
  h2h_better: "<b>{a}</b> a eu <b>{n} % de défauts en moins</b> que <b>{b}</b>", h2h_equal: "<b>{a}</b> et <b>{b}</b> ont eu à peu près le même taux de défauts",
  h2h_common: "dans les {k} classe(s) d’âge choisie(s) où les deux ont des données.", h2h_none: "Aucune classe d’âge choisie ne contient des données pour les deux : une comparaison directe est impossible. Comparez plutôt leurs scores (chacun par rapport à la moyenne).",
  h2h_same: "Choisissez-en deux différents pour comparer.",
  h2h_score: "Score vs moyenne du même âge", h2h_nmodels: "{n} modèles", h2h_nages: "données pour {n} des âges choisis",
  h2h_chart_h: "Taux de défauts par âge", h2h_table_h: "Âge par âge",
  col_age: "Âge", col_winner: "Moins de défauts", col_avg_full: "Moyenne toutes voitures", col_kmA: "km {x}", tie: "égalité",
  h2h_rub_h: "Catégories de défauts côte à côte", h2h_rub_sub: "Toutes les catégories du top 10 des deux modèles à l’âge choisi, triées selon la plus élevée des deux valeurs.",
  h2h_models_h: "Modèles de chaque marque", h2h_weak_h: "Points faibles les plus fréquents",
  h2h_weak_row: "point faible dans {k} des {n} combinaisons modèle × âge", h2h_weak_none: "Aucune catégorie n’est un point faible dans plus d’une combinaison modèle × âge.",
  i_na: "<b>— signifie qu’aucun chiffre n’a été publié</b> : ce modèle a eu moins de 500 contrôles dans cette classe d’âge (par exemple parce qu’il était trop récent, ou trop rare à cet âge). Cela ne signifie <b>pas</b> zéro défaut.",
  i_h2h_mode: "Comparez deux modèles individuels, ou deux marques dans leur ensemble (tous leurs modèles publiés regroupés).",
  i_h2h_verdict: "Comparaison directe sur les classes d’âge où <b>les deux</b> ont des données publiées, pour que les différences d’âge ne faussent rien (moyenne géométrique du rapport de leurs taux de défauts).<br><br><b>Limite :</b> s’ils ne partagent qu’une classe d’âge, le résultat repose sur cette seule classe.",
  i_h2h_score: "Le score propre de chaque côté par rapport à la voiture moyenne du même âge, sur tous les âges choisis avec données – le même score que dans la vue d’ensemble. Les deux peuvent reposer sur des classes d’âge différentes.",
  i_h2h_chart_models: "% de contrôles avec défauts à chaque âge pour les deux modèles ; gris = moyenne de toutes les voitures de cet âge.<br><br><b>Limites :</b><ul><li>Pas de point = moins de 500 contrôles, non publié.</li><li>Tous les âges proviennent d’une seule année de contrôle ; chaque classe contient donc d’autres années de construction – une nouvelle génération peut provoquer des sauts.</li></ul>",
  i_h2h_chart_brands: "Pour chaque âge : le score regroupé de la marque à cet âge × le taux de défauts moyen de toutes les voitures de cet âge – soit le taux d’un modèle « typique » de la marque.<br><br><b>Limites :</b><ul><li>Seuls les modèles avec ≥ 500 contrôles à cet âge comptent ; les modèles derrière chaque point peuvent donc varier selon l’âge.</li><li>Chaque modèle a le même poids, quel que soit le nombre de voitures.</li></ul>",
  i_h2h_table: "Les chiffres derrière le graphique, par classe d’âge. — = moins de 500 contrôles, non publié.",
  i_col_winner: "Quel côté a eu le taux de défauts le plus bas à cet âge. Affiché seulement si les deux ont des données.",
  i_col_brand_age: "Taux de défauts d’un modèle typique de cette marque à cet âge (score regroupé × moyenne), avec le nombre de modèles sur lequel il repose.",
  i_h2h_rub: "Chaque ligne est une catégorie du top 10 d’au moins un des deux modèles à cet âge.<br><br><b>≤ x %</b> : la catégorie n’est pas dans le top 10 de ce modèle ; son taux est donc au plus égal à la 10e valeur du modèle – le chiffre exact n’est pas publié.<br><b>—</b> : pas de données pour ce modèle à cet âge (moins de 500 contrôles).",
  i_h2h_models: "Chaque modèle publié de la marque ayant des données pour les âges choisis, avec son score par rapport à la moyenne du même âge. Les marques sont comparées uniquement sur ces modèles.",
  i_h2h_weak: "Les catégories qui sont un point faible (≥ 25 % au-dessus de la moyenne du même âge) dans le plus de combinaisons modèle × âge de la marque.<br><br><b>Limite :</b> seul le top 10 de chaque modèle est publié ; un point faible hors top 10 reste invisible.",
});
Object.assign(window.I18N.de, {
  tab_overview: "Übersicht", tab_h2h: "Direktvergleich",
  h2h_mode: "Vergleichen", h2h_models: "Zwei Modelle", h2h_brands: "Zwei Marken", h2h_swap: "Tauschen", h2h_vs: "vs.",
  h2h_intro: "Wählen Sie zwei Modelle oder zwei Marken, um sie nebeneinander zu vergleichen, für die oben gewählten Altersklassen.",
  h2h_better: "<b>{a}</b> hatte <b>{n} % weniger Mängel</b> als <b>{b}</b>", h2h_equal: "<b>{a}</b> und <b>{b}</b> hatten etwa gleich viele Mängel",
  h2h_common: "in den {k} gewählten Altersklasse(n), in denen beide Daten haben.", h2h_none: "Es gibt keine gewählte Altersklasse, in der beide Daten haben; ein direkter Vergleich ist nicht möglich. Vergleichen Sie stattdessen ihre Scores (jeweils gegenüber dem Durchschnitt).",
  h2h_same: "Wählen Sie zwei verschiedene zum Vergleichen.",
  h2h_score: "Score vs. Durchschnitt gleichen Alters", h2h_nmodels: "{n} Modelle", h2h_nages: "Daten für {n} der gewählten Altersklassen",
  h2h_chart_h: "Mängelquote nach Alter", h2h_table_h: "Altersklasse für Altersklasse",
  col_age: "Alter", col_winner: "Weniger Mängel", col_avg_full: "Durchschnitt aller Autos", col_kmA: "km {x}", tie: "gleich",
  h2h_rub_h: "Mängelkategorien nebeneinander", h2h_rub_sub: "Alle Kategorien aus den Top 10 beider Modelle im gewählten Alter, sortiert nach dem höheren der beiden Werte.",
  h2h_models_h: "Modelle jeder Marke", h2h_weak_h: "Häufigste Schwachstellen",
  h2h_weak_row: "Schwachstelle in {k} von {n} Kombinationen Modell × Alter", h2h_weak_none: "Keine Kategorie ist in mehr als einer Kombination Modell × Alter eine Schwachstelle.",
  i_na: "<b>— bedeutet, dass keine Zahl veröffentlicht wurde</b>: Dieses Modell hatte in dieser Altersklasse weniger als 500 Prüfungen (z. B. weil es zu neu oder in diesem Alter zu selten war). Es bedeutet <b>nicht</b> null Mängel.",
  i_h2h_mode: "Vergleichen Sie zwei einzelne Modelle oder zwei Marken als Ganzes (alle veröffentlichten Modelle zusammengefasst).",
  i_h2h_verdict: "Direkter Vergleich in den Altersklassen, in denen <b>beide</b> veröffentlichte Daten haben, damit Altersunterschiede nichts verzerren (geometrisches Mittel des Verhältnisses ihrer Mängelquoten).<br><br><b>Einschränkung:</b> Teilen sie nur eine Altersklasse, beruht das Ergebnis auf dieser einen Klasse.",
  i_h2h_score: "Der eigene Score jeder Seite gegenüber dem durchschnittlichen Auto gleichen Alters, über alle gewählten Altersklassen mit Daten – derselbe Score wie in der Übersicht. Beide können auf unterschiedlichen Altersklassen beruhen.",
  i_h2h_chart_models: "% der Prüfungen mit Mängeln je Alter für beide Modelle; grau = Durchschnitt aller Autos dieses Alters.<br><br><b>Grenzen:</b><ul><li>Kein Punkt = weniger als 500 Prüfungen, nicht veröffentlicht.</li><li>Alle Altersklassen stammen aus einem Prüfjahr; jede Klasse enthält also andere Baujahre – eine neue Generation kann Sprünge verursachen.</li></ul>",
  i_h2h_chart_brands: "Je Alter: der zusammengefasste Score der Marke in diesem Alter × die durchschnittliche Mängelquote aller Autos dieses Alters – also die Quote eines ‚typischen‘ Modells der Marke.<br><br><b>Grenzen:</b><ul><li>Nur Modelle mit ≥ 500 Prüfungen in diesem Alter zählen; die Modelle hinter jedem Punkt können sich daher je Alter unterscheiden.</li><li>Jedes Modell zählt gleich, egal wie viele Autos dahinterstehen.</li></ul>",
  i_h2h_table: "Die Zahlen hinter der Grafik, je Altersklasse. — = weniger als 500 Prüfungen, nicht veröffentlicht.",
  i_col_winner: "Welche Seite in diesem Alter die niedrigere Mängelquote hatte. Nur angezeigt, wenn beide Daten haben.",
  i_col_brand_age: "Mängelquote eines typischen Modells dieser Marke in diesem Alter (zusammengefasster Score × Durchschnitt), mit der Anzahl der zugrunde liegenden Modelle.",
  i_h2h_rub: "Jede Zeile ist eine Kategorie aus den Top 10 von mindestens einem der beiden Modelle in diesem Alter.<br><br><b>≤ x %</b>: Die Kategorie ist nicht in den Top 10 dieses Modells; ihre Quote liegt also höchstens beim 10. Wert des Modells – die genaue Zahl wird nicht veröffentlicht.<br><b>—</b>: keine Daten für dieses Modell in diesem Alter (weniger als 500 Prüfungen).",
  i_h2h_models: "Jedes veröffentlichte Modell der Marke mit Daten für die gewählten Altersklassen, mit seinem Score gegenüber dem Durchschnitt gleichen Alters. Marken werden nur anhand dieser Modelle verglichen.",
  i_h2h_weak: "Kategorien, die in den meisten Kombinationen Modell × Alter der Marke eine Schwachstelle sind (≥ 25 % über dem Durchschnitt gleichen Alters).<br><br><b>Einschränkung:</b> Es werden nur die Top 10 je Modell veröffentlicht; eine Schwachstelle außerhalb der Top 10 ist nicht sichtbar.",
});

// ---- navigation and the "How this was made" page
Object.assign(window.I18N.en, {
  nav_dashboard: "Dashboard", nav_about: "How this was made", open_h2h: "Compare these two head to head →",
  about_title: "How this website was made",
  about_body: `
<p>This dashboard turns the public <a href="https://gocabarometer.gocavlaanderen.be/" target="_blank" rel="noopener">GOCA Barometer</a> into a tool for choosing a used car. Here is where the numbers come from, how they were collected and processed, and how the site was built.</p>
<h2>1. The data</h2>
<p>GOCA Vlaanderen is the sector federation of the vehicle inspection companies in Flanders. Its Barometer covers <b>{n} periodic inspections</b> of passenger cars from {period}, each vehicle counted once. For every car model and age class it publishes the share of inspections with defects, the average mileage, and the 10 most frequent defect categories, each compared with the average of all cars of that age. A figure is published only when a model has at least 500 inspections in an age class. That gives {m} models.</p>
<h2>2. Collecting it</h2>
<p>The Barometer has no API: every figure is printed in the HTML of one page per model, including the values in the bar charts. A small Python scraper:</p>
<ul>
  <li>reads the list of models from the home page and downloads each model page <b>once</b>;</li>
  <li>is deliberately friendly: one request at a time, a 2–3 second pause between requests, a clear user-agent, back-off on errors, and a local cache so re-runs don’t hit the site again (the site’s robots.txt allows crawling);</li>
  <li>reads the printed values rather than estimating them from bar heights, and checks that the chart values match the figures shown under each chart;</li>
  <li>stores everything in <a href="https://parquet.apache.org/" target="_blank" rel="noopener">Parquet</a> tables (models, model × age class, defect categories).</li>
</ul>
<h2>3. From data to dashboard</h2>
<p>A second script turns the Parquet tables into one compact JSON file. The dashboard is a static page: plain HTML, CSS and JavaScript with hand-drawn SVG charts. There is no server, no framework, no cookies and no tracking. Your language and theme choice are stored only in your own browser.</p>
<h2>4. How the scores work</h2>
<ul>
  <li>For each model and age class: <code>model defect % ÷ average defect % of all cars that age</code>. 0.6 means 40% fewer defects than average.</li>
  <li>A model’s <b>score</b> combines these ratios over the selected ages with a geometric mean, which is the right average for ratios.</li>
  <li>A <b>brand score</b> pools all model × age ratios of the brand in the same way.</li>
  <li><b>Head to head</b> compares two models or brands only at the ages where both have data, so age can’t skew the result.</li>
  <li>Defect category names were translated from Dutch, following the European roadworthiness rules (Directive 2014/45/EU).</li>
</ul>
<h2>5. Hosting</h2>
<p>The code lives in a GitHub repository. On every change, a GitHub Actions workflow rebuilds the data file and publishes the site with GitHub Pages.</p>
<h2>6. Built with Claude Code</h2>
<p>The scraper, the data checks, this dashboard, its translations and its help texts were implemented with <a href="https://claude.com/claude-code" target="_blank" rel="noopener">Claude Code</a>, Anthropic’s AI coding assistant, working from the site author’s instructions. Because AI was involved, small errors are possible. When in doubt, check the figures on the original Barometer.</p>
<h2>7. Disclaimer</h2>
<p>This is an independent project, not affiliated with GOCA Vlaanderen. Data as scraped on {d}. Inspection results are one signal about a car’s condition. They don’t cover reliability between inspections, repair costs or crash safety.</p>`,
});
Object.assign(window.I18N.nl, {
  nav_dashboard: "Dashboard", nav_about: "Hoe deze site gemaakt is", open_h2h: "Vergelijk deze twee één tegen één →",
  about_title: "Hoe deze website gemaakt is",
  about_body: `
<p>Dit dashboard maakt van de publieke <a href="https://gocabarometer.gocavlaanderen.be/" target="_blank" rel="noopener">GOCA Barometer</a> een hulpmiddel om een tweedehandswagen te kiezen. Hier lees je waar de cijfers vandaan komen, hoe ze verzameld en verwerkt zijn, en hoe de site gebouwd is.</p>
<h2>1. De gegevens</h2>
<p>GOCA Vlaanderen is de sectorfederatie van de keuringsbedrijven in Vlaanderen. De Barometer omvat <b>{n} periodieke keuringen</b> van personenwagens van {period}, met elk voertuig één keer. Per automodel en leeftijdsklasse publiceert hij het aandeel keuringen met gebreken, de gemiddelde kilometerstand en de 10 meest voorkomende gebreken, telkens vergeleken met het gemiddelde van alle auto’s van die leeftijd. Een cijfer wordt enkel gepubliceerd als een model minstens 500 keuringen heeft in een leeftijdsklasse. Zo komen er {m} modellen in aanmerking.</p>
<h2>2. Verzamelen</h2>
<p>De Barometer heeft geen API: elk cijfer staat in de HTML van één pagina per model, ook de waarden in de staafgrafieken. Een klein Python-script:</p>
<ul>
  <li>leest de lijst met modellen van de startpagina en downloadt elke modelpagina <b>één keer</b>;</li>
  <li>is bewust vriendelijk: één verzoek tegelijk, 2–3 seconden pauze tussen verzoeken, een duidelijke user-agent, wachten bij fouten en een lokale cache zodat herhalingen de site niet opnieuw belasten (de robots.txt van de site laat dit toe);</li>
  <li>leest de afgedrukte waarden in plaats van ze te schatten uit de hoogte van de staven, en controleert of de grafiekwaarden overeenkomen met de cijfers onder elke grafiek;</li>
  <li>bewaart alles in <a href="https://parquet.apache.org/" target="_blank" rel="noopener">Parquet</a>-tabellen (modellen, model × leeftijdsklasse, gebreken per rubriek).</li>
</ul>
<h2>3. Van gegevens naar dashboard</h2>
<p>Een tweede script zet de Parquet-tabellen om naar één compact JSON-bestand. Het dashboard is een statische pagina: gewone HTML, CSS en JavaScript met zelfgetekende SVG-grafieken. Er is geen server, geen framework, geen cookies en geen tracking. Je keuze voor taal en thema wordt enkel in je eigen browser bewaard.</p>
<h2>4. Hoe de scores werken</h2>
<ul>
  <li>Per model en leeftijdsklasse: <code>gebreken-% model ÷ gemiddeld gebreken-% van alle auto’s van die leeftijd</code>. 0,6 betekent 40% minder gebreken dan gemiddeld.</li>
  <li>De <b>score</b> van een model combineert die verhoudingen over de gekozen leeftijden met een meetkundig gemiddelde, het juiste gemiddelde voor verhoudingen.</li>
  <li>Een <b>merkscore</b> bundelt alle verhoudingen model × leeftijd van het merk op dezelfde manier.</li>
  <li><b>Eén tegen één</b> vergelijkt twee modellen of merken enkel op de leeftijden waarvoor beide gegevens hebben, zodat leeftijd het resultaat niet vertekent.</li>
</ul>
<h2>5. Hosting</h2>
<p>De code staat in een GitHub-repository. Bij elke wijziging bouwt een GitHub Actions-workflow het gegevensbestand opnieuw en publiceert de site via GitHub Pages.</p>
<h2>6. Gebouwd met Claude Code</h2>
<p>Het scrapingscript, de gegevenscontroles, dit dashboard, de vertalingen en de helpteksten zijn geïmplementeerd met <a href="https://claude.com/claude-code" target="_blank" rel="noopener">Claude Code</a>, de AI-programmeerassistent van Anthropic, op basis van de instructies van de auteur van de site. Omdat er AI gebruikt is, zijn kleine fouten mogelijk. Controleer bij twijfel de cijfers in de originele Barometer.</p>
<h2>7. Disclaimer</h2>
<p>Dit is een onafhankelijk project, niet verbonden aan GOCA Vlaanderen. Gegevens zoals opgehaald op {d}. Keuringsresultaten zijn één signaal over de staat van een auto. Ze zeggen niets over pannes tussen keuringen, herstelkosten of veiligheid bij een ongeval.</p>`,
});
Object.assign(window.I18N.fr, {
  nav_dashboard: "Tableau de bord", nav_about: "Comment ce site a été fait", open_h2h: "Comparer ces deux en face à face →",
  about_title: "Comment ce site a été réalisé",
  about_body: `
<p>Ce tableau de bord transforme le <a href="https://gocabarometer.gocavlaanderen.be/" target="_blank" rel="noopener">GOCA Barometer</a> public en outil pour choisir une voiture d’occasion. Voici d’où viennent les chiffres, comment ils ont été collectés et traités, et comment le site a été construit.</p>
<h2>1. Les données</h2>
<p>GOCA Vlaanderen est la fédération sectorielle des organismes de contrôle technique en Flandre. Son Barometer couvre <b>{n} contrôles périodiques</b> de voitures particulières de {period}, chaque véhicule étant compté une fois. Pour chaque modèle et classe d’âge, il publie la part de contrôles avec défauts, le kilométrage moyen et les 10 catégories de défauts les plus fréquentes, chaque fois comparés à la moyenne de toutes les voitures de cet âge. Un chiffre n’est publié que si un modèle compte au moins 500 contrôles dans une classe d’âge. Cela donne {m} modèles.</p>
<h2>2. La collecte</h2>
<p>Le Barometer n’a pas d’API : chaque chiffre figure dans le HTML d’une page par modèle, y compris les valeurs des graphiques. Un petit script Python :</p>
<ul>
  <li>lit la liste des modèles sur la page d’accueil et télécharge chaque page de modèle <b>une seule fois</b> ;</li>
  <li>est volontairement respectueux : une requête à la fois, 2 à 3 secondes de pause entre les requêtes, un user-agent clair, une attente en cas d’erreur et un cache local pour ne pas solliciter à nouveau le site (le robots.txt du site l’autorise) ;</li>
  <li>lit les valeurs imprimées au lieu de les estimer à partir de la hauteur des barres, et vérifie que les valeurs des graphiques correspondent aux chiffres affichés sous chaque graphique ;</li>
  <li>enregistre tout dans des tables <a href="https://parquet.apache.org/" target="_blank" rel="noopener">Parquet</a> (modèles, modèle × classe d’âge, catégories de défauts).</li>
</ul>
<h2>3. Des données au tableau de bord</h2>
<p>Un second script convertit les tables Parquet en un fichier JSON compact. Le tableau de bord est une page statique : du HTML, du CSS et du JavaScript simples, avec des graphiques SVG dessinés à la main. Il n’y a ni serveur, ni framework, ni cookies, ni pistage. Votre choix de langue et de thème est conservé uniquement dans votre propre navigateur.</p>
<h2>4. Le calcul des scores</h2>
<ul>
  <li>Pour chaque modèle et classe d’âge : <code>% de défauts du modèle ÷ % moyen de défauts de toutes les voitures de cet âge</code>. 0,6 signifie 40 % de défauts en moins que la moyenne.</li>
  <li>Le <b>score</b> d’un modèle combine ces rapports sur les âges choisis par une moyenne géométrique, la moyenne adaptée aux rapports.</li>
  <li>Le <b>score d’une marque</b> regroupe de la même façon tous les rapports modèle × âge de la marque.</li>
  <li>Le <b>face à face</b> compare deux modèles ou marques uniquement aux âges où les deux ont des données, pour que l’âge ne fausse pas le résultat.</li>
  <li>Les noms des catégories de défauts ont été traduits du néerlandais, d’après les règles européennes de contrôle technique (directive 2014/45/UE).</li>
</ul>
<h2>5. Hébergement</h2>
<p>Le code se trouve dans un dépôt GitHub. À chaque modification, un workflow GitHub Actions régénère le fichier de données et publie le site via GitHub Pages.</p>
<h2>6. Réalisé avec Claude Code</h2>
<p>Le script de collecte, les contrôles des données, ce tableau de bord, ses traductions et ses textes d’aide ont été réalisés avec <a href="https://claude.com/claude-code" target="_blank" rel="noopener">Claude Code</a>, l’assistant de programmation IA d’Anthropic, à partir des instructions de l’auteur du site. Comme l’IA a été utilisée, de petites erreurs sont possibles. En cas de doute, vérifiez les chiffres dans le Barometer d’origine.</p>
<h2>7. Avertissement</h2>
<p>Ce projet est indépendant et sans lien avec GOCA Vlaanderen. Données collectées le {d}. Les résultats du contrôle technique sont un indicateur de l’état d’une voiture parmi d’autres. Ils ne disent rien des pannes entre deux contrôles, des coûts de réparation ni de la sécurité en cas d’accident.</p>`,
});
Object.assign(window.I18N.de, {
  nav_dashboard: "Dashboard", nav_about: "So entstand diese Seite", open_h2h: "Diese beiden direkt vergleichen →",
  about_title: "So entstand diese Website",
  about_body: `
<p>Dieses Dashboard macht aus dem öffentlichen <a href="https://gocabarometer.gocavlaanderen.be/" target="_blank" rel="noopener">GOCA Barometer</a> ein Werkzeug für die Wahl eines Gebrauchtwagens. Hier steht, woher die Zahlen kommen, wie sie erhoben und verarbeitet wurden und wie die Seite gebaut wurde.</p>
<h2>1. Die Daten</h2>
<p>GOCA Vlaanderen ist der Branchenverband der Prüforganisationen in Flandern. Sein Barometer umfasst <b>{n} periodische Prüfungen</b> von Pkw im Zeitraum {period}, jedes Fahrzeug einmal gezählt. Für jedes Modell und jede Altersklasse veröffentlicht er den Anteil der Prüfungen mit Mängeln, den durchschnittlichen Kilometerstand und die 10 häufigsten Mängelkategorien, jeweils im Vergleich zum Durchschnitt aller Autos dieses Alters. Eine Zahl wird nur veröffentlicht, wenn ein Modell in einer Altersklasse mindestens 500 Prüfungen hat. Das ergibt {m} Modelle.</p>
<h2>2. Die Erhebung</h2>
<p>Der Barometer hat keine API: Jede Zahl steht im HTML einer Seite pro Modell, auch die Werte in den Balkendiagrammen. Ein kleines Python-Skript:</p>
<ul>
  <li>liest die Modellliste von der Startseite und lädt jede Modellseite <b>einmal</b> herunter;</li>
  <li>ist bewusst rücksichtsvoll: eine Anfrage nach der anderen, 2–3 Sekunden Pause zwischen den Anfragen, ein klarer User-Agent, Warten bei Fehlern und ein lokaler Cache, damit Wiederholungen die Seite nicht erneut belasten (die robots.txt der Seite erlaubt das);</li>
  <li>liest die gedruckten Werte, statt sie aus Balkenhöhen zu schätzen, und prüft, ob die Diagrammwerte mit den Zahlen unter jedem Diagramm übereinstimmen;</li>
  <li>speichert alles in <a href="https://parquet.apache.org/" target="_blank" rel="noopener">Parquet</a>-Tabellen (Modelle, Modell × Altersklasse, Mängelkategorien).</li>
</ul>
<h2>3. Von den Daten zum Dashboard</h2>
<p>Ein zweites Skript wandelt die Parquet-Tabellen in eine kompakte JSON-Datei um. Das Dashboard ist eine statische Seite: einfaches HTML, CSS und JavaScript mit selbst gezeichneten SVG-Diagrammen. Es gibt keinen Server, kein Framework, keine Cookies und kein Tracking. Ihre Sprach- und Designwahl wird nur in Ihrem eigenen Browser gespeichert.</p>
<h2>4. So funktionieren die Scores</h2>
<ul>
  <li>Für jedes Modell und jede Altersklasse: <code>Mängel-% des Modells ÷ durchschnittliche Mängel-% aller Autos dieses Alters</code>. 0,6 bedeutet 40 % weniger Mängel als der Durchschnitt.</li>
  <li>Der <b>Score</b> eines Modells kombiniert diese Verhältnisse über die gewählten Altersklassen mit einem geometrischen Mittel, dem passenden Mittelwert für Verhältnisse.</li>
  <li>Ein <b>Markenscore</b> fasst alle Verhältnisse Modell × Alter der Marke auf dieselbe Weise zusammen.</li>
  <li>Der <b>Direktvergleich</b> vergleicht zwei Modelle oder Marken nur in den Altersklassen, in denen beide Daten haben, damit das Alter das Ergebnis nicht verzerrt.</li>
  <li>Die Namen der Mängelkategorien wurden aus dem Niederländischen übersetzt, gemäß den europäischen Vorschriften zur technischen Überwachung (Richtlinie 2014/45/EU).</li>
</ul>
<h2>5. Hosting</h2>
<p>Der Code liegt in einem GitHub-Repository. Bei jeder Änderung erstellt ein GitHub-Actions-Workflow die Datendatei neu und veröffentlicht die Seite über GitHub Pages.</p>
<h2>6. Gebaut mit Claude Code</h2>
<p>Das Erhebungsskript, die Datenprüfungen, dieses Dashboard, seine Übersetzungen und Hilfetexte wurden mit <a href="https://claude.com/claude-code" target="_blank" rel="noopener">Claude Code</a> umgesetzt, dem KI-Programmierassistenten von Anthropic, nach den Anweisungen des Autors der Seite. Da KI im Spiel war, sind kleine Fehler möglich. Prüfen Sie im Zweifel die Zahlen im ursprünglichen Barometer.</p>
<h2>7. Haftungsausschluss</h2>
<p>Dies ist ein unabhängiges Projekt, nicht mit GOCA Vlaanderen verbunden. Daten wie am {d} erhoben. Prüfergebnisse sind ein Hinweis auf den Zustand eines Autos unter mehreren. Sie sagen nichts über Pannen zwischen den Prüfungen, Reparaturkosten oder Unfallsicherheit.</p>`,
});
