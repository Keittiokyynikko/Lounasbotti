const greetings = {
    1: [
        "Aurinkoista maanantaita! Viikko on hyvä aloittaa maittavalla lounaalla ja tässä teille vaihtoehtoja:",
        "Maanantaipäiviä kaikille! Tänään saattaa ärsyttää ja päätä kivistää, mutta onneksi on tarjolla paljon einestä:",
        "Hei! Se on maanantai eli enää neljä yötä perjantaihin. Odotellessa kannattaa harkita syömistä, vaikka tällaista:",
    ],
    2: [
        "Aurinkoista maanantaita! Viikko on hyvä aloittaa maittavalla lounaalla ja tässä teille vaihtoehtoja:",
        "Maanantaipäiviä kaikille! Tänään saattaa ärsyttää ja päätä kivistää, mutta onneksi on tarjolla paljon einestä:",
        "Hei! Se on maanantai eli enää neljä yötä perjantaihin. Odotellessa kannattaa harkita syömistä, vaikka tällaista:",
    ],
    3: [
        "Hei, se on pikkulauantai! Vielä ei ole välttämättä pizza-burgeri-päivä, mutta ehkä täältä löytyy jotain hyvää:",
        "Hoi! Kuka siellä kurisee? Kuka, kuka? Sehän taitaa olla masu! Nyt otatte sen masun kantoon ja valitsette paikan:",
        "Tiedättekös, ei ole enää pitkä matka viikonloppuun. Laske kuitenkin se kalja alas ja ota ennemmin ruokaa:",
    ],
    4: ["torstai"],
    5: [
        "Hei, se on pikkulauantai! Vielä ei ole välttämättä pizza-burgeri-päivä, mutta ehkä täältä löytyy jotain hyvää:",
        "Hoi! Kuka siellä kurisee? Kuka, kuka? Sehän taitaa olla masu! Nyt otatte sen masun kantoon ja valitsette paikan:",
        "Tiedättekös, ei ole enää pitkä matka viikonloppuun. Laske kuitenkin se kalja alas ja ota ennemmin ruokaa:",
    ],
};

const day_greetings = greetings[new Date().getDay()];
const greeting =
    day_greetings[Math.floor(Math.random() * day_greetings.length)];

module.exports = {
    greeting,
};