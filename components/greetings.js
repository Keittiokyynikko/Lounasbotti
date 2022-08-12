const monday_greetings = [
    "Aurinkoista maanantaita! Viikko on hyvä aloittaa maittavalla lounaalla ja tässä teille vaihtoehtoja:",
    "Maanantaipäiviä kaikille! Tänään saattaa ärsyttää ja päätä kivistää, mutta onneksi on tarjolla paljon einestä:",
    "Hei! Se on maanantai eli enää neljä yötä perjantaihin. Odotellessa kannattaa harkita syömistä, vaikka tällaista:"
]

const tuesday_greetings = [
    "Aurinkoista maanantaita! Viikko on hyvä aloittaa maittavalla lounaalla ja tässä teille vaihtoehtoja:",
    "Maanantaipäiviä kaikille! Tänään saattaa ärsyttää ja päätä kivistää, mutta onneksi on tarjolla paljon einestä:",
    "Hei! Se on maanantai eli enää neljä yötä perjantaihin. Odotellessa kannattaa harkita syömistä, vaikka tällaista:"
]

const wednesday_greetings = [
    "Hei, se on pikkulauantai! Vielä ei ole välttämättä pizza-burgeri-päivä, mutta ehkä täältä löytyy jotain hyvää:",
    "Hoi! Kuka siellä kurisee? Kuka, kuka? Sehän taitaa olla masu! Nyt otatte sen masun kantoon ja valitsette paikan:",
    "Tiedättekös, ei ole enää pitkä matka viikonloppuun. Laske kuitenkin se kalja alas ja ota ennemmin ruokaa:"
]

const greetings = [monday_greetings, tuesday_greetings, wednesday_greetings]

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const current_date = new Date().getDay();

const day_greetings = greetings[current_date - 1]

const greeting =
    day_greetings[Math.floor(Math.random() * day_greetings.length)];

console.log("Testi" + greeting)

module.exports = {
    greeting
};