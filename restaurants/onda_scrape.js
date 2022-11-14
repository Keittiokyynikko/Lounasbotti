const puppeteer = require('puppeteer')

async function format_data(data) {
  const get_txt_content = await data.getProperty('textContent')
  let formated_data = await get_txt_content.jsonValue()
  formated_data = formated_data.replace(/(\r\n|\n|\r)/gm, '')
  formated_data = formated_data.trim()
  return formated_data
}

async function scrape_onda(url, date_index) {
  console.log('Aloitus!')
  const browser = await puppeteer.launch()
  console.log('Selain!')
  const page = await browser.newPage()
  console.log('Sivu!')
  page.setDefaultNavigationTimeout(0)
  await page.goto(url, {
    waitUntil: 'load',
    timeout: 0,
  })
  console.log(url)

  //Lunch-elements from website

  const monday_vegan = '//*[@id="lunchbox"]/div/div[2]/div[4]/div[1]/p[1]'
  const monday_liha = '//*[@id="lunchbox"]/div/div[2]/div[5]/div[1]/p[1]'

  const tuesday_vegan = '//*[@id="lunchbox"]/div/div[3]/div[4]/div[1]/p[1]'
  const tuesday_liha = '//*[@id="lunchbox"]/div/div[3]/div[5]/div[1]/p[1]'

  const wednesday_vegan = '//*[@id="lunchbox"]/div/div[4]/div[4]/div[1]/p[1]'
  const wednesday_liha = '//*[@id="lunchbox"]/div/div[4]/div[5]/div[1]/p[1]'

  const thursday_vegan = '//*[@id="lunchbox"]/div/div[5]/div[4]/div[1]/p[1]'
  const thursday_liha = '//*[@id="lunchbox"]/div/div[5]/div[5]/div[1]/p[1]'

  const friday_vegan = '//*[@id="lunchbox"]/div/div[6]/div[4]/div[1]/p[1]'
  const friday_liha = '//*[@id="lunchbox"]/div/div[6]/div[5]/div[1]/p[1]'

  let lunch_vegan
  let lunch_liha

  if (date_index == 1) {
    lunch_vegan = monday_vegan
    lunch_liha = monday_liha
  } else if (date_index == 2) {
    lunch_vegan = tuesday_vegan
    lunch_liha = tuesday_liha
  } else if (date_index == 3) {
    lunch_vegan = wednesday_vegan
    lunch_liha = wednesday_liha
  } else if (date_index == 4) {
    lunch_vegan = thursday_vegan
    lunch_liha = thursday_liha
  } else if (date_index == 5) {
    lunch_vegan = friday_vegan
    lunch_liha = friday_liha
  }

  const [buffet_vegan_name_xpath] = await page.$x(lunch_vegan)
  const buffet_vegan_name = await format_data(buffet_vegan_name_xpath)

  const [buffet_meat_name_xpath] = await page.$x(lunch_liha)
  const buffet_meat_name = await format_data(buffet_meat_name_xpath)

  const [buffet_price_xpath] = await page.$x(
    '//*[@id="lunchbox"]/div/div[3]/div[5]/div[2]/p'
  )
  const buffet_price = await format_data(buffet_price_xpath)

  const [buffet_salad_price_xpath] = await page.$x(
    '//*[@id="lunchbox"]/div/div[3]/div[3]/div[2]/p'
  )
  const buffet_salad_price = await format_data(buffet_salad_price_xpath)

  const [lunch_option_1_price_xpath] = await page.$x(
    '//*[@id="lunchbox"]/div/div[3]/div[6]/div[2]/p'
  )
  const lunch_option_1_price = await format_data(lunch_option_1_price_xpath)

  const [lunch_option_2_price_xpath] = await page.$x(
    '//*[@id="lunchbox"]/div/div[3]/div[7]/div[2]/p'
  )
  const lunch_option_2_price = await format_data(lunch_option_2_price_xpath)

  const [lunch_option_1_name_xpath] = await page.$x(
    '//*[@id="lunchbox"]/div/div[2]/div[6]/div[1]/p[1]'
  )
  const lunch_option_1_name = await format_data(lunch_option_1_name_xpath)

  const [lunch_option_2_name_xpath] = await page.$x(
    '//*[@id="lunchbox"]/div/div[2]/div[7]/div[1]/p[1]'
  )
  const lunch_option_2_name = await format_data(lunch_option_2_name_xpath)

  const onda_buffet_salad = {
    name: 'Salaatti buffet',
    price: buffet_salad_price + ' €',
  }
  const onda_lunch_vegan = {
    name: lunch_option_1_name,
    price: lunch_option_1_price + ' €',
  }
  const onda_lunch_meat = {
    name: lunch_option_2_name,
    price: lunch_option_2_price + ' €',
  }
  const onda_buffet_vegan = {
    name: buffet_vegan_name,
    price: buffet_price + ' €',
  }
  const onda_buffet_meat = {
    name: buffet_meat_name,
    price: buffet_price + ' €',
  }

  await browser.close()

  return [
    onda_buffet_salad,
    onda_lunch_vegan,
    onda_lunch_meat,
    onda_buffet_vegan,
    onda_buffet_meat,
  ]
}

module.exports = {
  scrape_onda,
}
