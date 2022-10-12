const greetings = {
    1: [
        "Aurinkoista maanantaita! Viikko on hyvä aloittaa maittavalla lounaalla ja tässä teille vaihtoehtoja:",
        "Maanantaipäiviä kaikille! Tänään saattaa ärsyttää ja päätä kivistää, mutta onneksi on tarjolla paljon einestä:",
        "Hei! Se on maanantai eli enää neljä yötä perjantaihin. Odotellessa kannattaa harkita syömistä, vaikka tällaista:",
        "Päiviä. Sanon suoraan, että nyt ei ole botin lempipäivä mutta näitä sattuu. Valitkaa siis lounaanne ja jatkakaa:"
    ],
    2: [
        "Toiminnan täyteistä tiistaita! Jos kiire painaa päälle niin otapa hetki taukoa ja haukkaa hiukopalaa, kuten vaikka:",
        "Heippa! Tiedättekö, miksi tiistai on kiva? Koska se ei ole maanantai! Tiistaisin tarjotaan myös seuraavaa:",
        "Tervehdys ihmiset! Odotuksenne on palkittu ja on aika julistaa päivän lounaslista:",
        "Kuulkaas... En tiedä, sataako ulkona mutta minua ainakin sadettaa. Ei siis tuhlata aikaa vaan mennään asiaan:"
    ],
    3: [
        "Hei, se on pikkulauantai! Vielä ei ole välttämättä pizza-burgeri-päivä, mutta ehkä täältä löytyy jotain hyvää:",
        "Hoi! Kuka siellä kurisee? Kuka, kuka? Sehän taitaa olla masu! Nyt otatte sen masun kantoon ja valitsette paikan:",
        "Tiedättekös, ei ole enää pitkä matka viikonloppuun. Laske kuitenkin se kalja alas ja ota ennemmin ruokaa:",
        "Huoh... Toivon jo viikonloppua, sillä olen väsynyt. Mutta, rakas ihminen, älä välitä minusta. Tässä sinulle:"
    ],
    4: ["Torjandeita ihmistoverit! Huomenna on jo perjantai, joten jaksakaa siihen asti syömällä:",
        "Morjesta! Tänään pitäisi syödä hernekeittoa ja pannaria, ehkä täältä löytyy:",
        "Heipati hei! Teeleipä? Tai sitten jotain muuta?",
        "Alkaa vähitellen riittämään... Torstaina pitää kuitenkin syödä, joten tehkää päätös:"
    ],
    5: [

        "Jumankauta, perjantai on nyt! Nyt voisi ehkä ottaa bissen jonkun seuraavista kanssa:",
        "Hei, vielä jaksaa! Enää muutama tunti niin voit vetää perseet olalle. Sitä ennen kannattaa syödä:",
        "Kuules, tiedän että tykkäät painaa perjantainakin kovaa duunia, mutta ota hetki huilia ja haukkaa eväitä maistuvia:",
        "Viimeinkin, perjantai. Tämä botti ei olisi jaksanut enää päivääkään. Tässä nämä, kiitos ja nähdään maanantaina:"
    ],
};

const day_greetings = greetings[new Date().getDay()];
const greeting =
    day_greetings[Math.floor(Math.random() * day_greetings.length)];

module.exports = {
    greeting,
};