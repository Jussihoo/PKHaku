# PKHaku

This is a Nokia internal Hackathon project implemented in two days. This is about implementing a application for the dog sports. There is one or several human targets, which a dog has to find and the position of the target or targets is delivered from a cell phone to the nodejs server once that target presses button to send the coordinates. Also the position of the dog is sent to server every second. Position of the dog is received from the Thingsee IOT device attached to the dog.

The position of the target or targets and the dog is pushed in realtime to the html application which shows all these positions on the map. The route of the dog and route information is also displayed as well as the running time (i.e time from start to the moment when the dog has found all the targets). There is also a button to start the run and a button to stop the run. Pressing a start button will create a new empty GPX file in which the GPS coordinates of the dog are stored as well as timestamp. Pressing the stop button closes the file.

*Hackathon team "Cumulus":*
- Päivi Kaste, team lead and the original idea
- Hanne Kankaanranta
- Katriina Huovila
- Tarja Muikku
- Juhani Hakosalo

Finnish description about the Service dogs searching. "PK haku"

Hakukoe (PAHA), koulutustunnus HK1-3
Hakukoirien historia ulottuu 1800-luvulle asti. Tuolloin St. Bemhardinkoiria käytettiin Alpeilla lumivyöryissä hautautuneiden etsimiseen. Vähän ennen ensimmäistä maailmansotaa saksalainen sotilas Konrad Most kehitti koirien etsintätaitoja kouluttamalla poliisi- ja lääkintäkoiria. Ensimmäisen maailmansodan puhjetessa 1914 todettiin koirien erinomaisuus taisteluissa haavoittuneiden etsimisessä. Tästä lähti alkuun koirien henkilöetsintään kouluttamisen kehittäminen.
Hakukokeen henkilöetsinnässä koiran tulee etsiä, löytää ja ilmaista merkityltä alueelta sinne piiloutuneet 3 ihmisiä. Etsittäviä henkilöitä kutsutaan maalimiehiksi. Henkilöhakualueen koko kasvaa koeluokittain. 1-luokassa alue on kooltaan 10 0m x 100 m, ja etsintäaika 10 minuuttia. 2-luokassa 100 m x 200 m, ja etsintäaikaa on 15 minuuttia ja 3-luokassa 100 m x 300 m, ja etsintäaikaa on 20 minuuttia. Alueen keskilinja on merkitty, ja ohjaaja kulkee tätä merkittyä linjaa pitkin ohjatessaan koiran etsintää.
Maalimiehet menevät piiloihin ennen koiran ja ohjaajan radalle tuloa. Tuomari selittää ohjaajalle alueen rajat ja ohjaajan tulee ohjata koira suorittamaan etsintää alueen sisällä. Koiran tulee etsiä alue järjestelmällisesti risteillen keskilinjalta alueen reunoihin ja takaisin. Saadessaan hajun maalimiehestä koiran tulee paikantaa haju ja ilmaista löytämänsä maalimies joko haukkumalla tai tuomalla ohjaajalle rulla merkiksi löytyneestä maalimiehestä.
Haukkumalla ilmaisevan koiran tulee pysyä maalimiehen välittömässä läheisyydessä ja haukkua siten, että ohjaaja vaivattomasti löytää koiran luo. Rullalla ilmaiseva koira ottaa maalimiehen löydettyään kaulapannassaan roikkuvan rullan suuhunsa ja vie rullan ohjaajalle, joka kytkee koiran taluttimeen ja käskee koiran palata maalimiehen luo.
Hakukokeessa koira ei missään tapauksessa saa olla aggressiivinen maalimiehiä kohtaan. Ei myöskään ole suotavaa, että koira on liian mielistelevä, vaan koiran tulee antaa maalimiehen olla rauhassa ja antaa hänen tulla myös häiritsemättä pois piilosta. Kun maalimies on löytynyt ja tullut pois piilosta, palataan keskilinjalla samalle kohdalle mistä ilmaisuun lähdettiin ja ohjaaja lähettää koiran jatkamaan etsintää.
Haun harjoitteluun tarvitaan koulutusryhmä, joka kokoontuu yhdessä kouluttamaan koiria etsintään. Jokainen ryhmän jäsen kouluttaa ryhmässä omaa koiraansa, mutta toimii myös toisille maalimiehenä.
Kokeessa tuomari arvostelee koiran ja ohjaajan yhteistyötä ja erityisesti koiran halukkuutta etsintään ja maalimiesten ilmaisuun.

