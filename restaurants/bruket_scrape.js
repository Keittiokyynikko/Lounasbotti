const axios = require("axios");

async function scrape_bruket(url, date_index) {
  const promise = await new Promise((resolve, reject) => {
    const bruket = "https://www.kampanja.co/dev/bruket/admin/api.php?a=lunch";
    axios.get(bruket).then((res) => {
      const data = res.data;

      const lunch_array = [];

      for (let i = 0; i < data.length; i++) {
        if (data[i].weekday == date_index) {
          lunch_array.push(data[i].dish);
        }
      }

      resolve(lunch_array);
    })
  });
  return promise;
}

module.exports = {
  scrape_bruket
};