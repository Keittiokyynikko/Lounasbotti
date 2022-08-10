const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const axios = require('axios');

async function scrape_bruket(url, date_index) {
    const promise = await new Promise((resolve, reject) => {
        const bruket = 'https://www.kampanja.co/dev/bruket/admin/api.php?a=lunch';
        axios.get(bruket)
        .then((res) => {
            const data = res.data

            const lunch_array = []
            
            for(i=0; i < data.length; i++) {
                if(data[i].weekday == date_index) {
                    lunch_array.push(data[i].dish)
                }
            }
            

            resolve(lunch_array)

        })

    })
    return promise
}

/*
async function format_data (data) {
    const get_txt_content = await data.getProperty('textContent')
    let formated_data = await get_txt_content.jsonValue()
    formated_data = formated_data.replace(/(\r\n|\n|\r)/gm, "")
    formated_data = formated_data.trim()
    return formated_data
}

/*
async function scrape_bruket(url, date_index) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);


    //Lunch-elements from website

    const monday_dish_1 = '//*[@id="weekday-1"]/div/div[1]/div[1]';
    const monday_dish_2 = '//*[@id="weekday-1"]/div/div[2]/div[1]';
    const monday_soup = '//*[@id="weekday-1"]/div/div[3]/div[1]';

    const tuesday_dish_1 = '//*[@id="weekday-2"]/div/div[1]/div[1]';
    const tuesday_dish_2 = '//*[@id="weekday-2"]/div/div[2]/div[1]';
    const tuesday_soup = '//*[@id="weekday-2"]/div/div[3]/div[1]';

    const wednesday_dish_1 = '//*[@id="weekday-3"]/div/div[1]/div[1]';
    const wednesday_dish_2 = '//*[@id="weekday-3"]/div/div[1]/div[1]';
    const wednesday_soup = '//*[@id="weekday-3"]/div/div[2]/div[1]';

    const thursday_dish_1 = '//*[@id="weekday-4"]/div/div[1]/div[1]';
    const thursday_dish_2 = '//*[@id="weekday-4"]/div/div[2]/div[1]';
    const thursday_soup = '//*[@id="weekday-4"]/div/div[3]/div[1]';

    const friday_dish_1 = '//*[@id="weekday-5"]/div/div[1]/div[1]';
    const friday_dish_2 = '//*[@id="weekday-5"]/div/div[2]/div[1]';
    const friday_soup = '//*[@id="weekday-5"]/div/div[3]/div[1]';

    const lunch_price = '//*[@id="lunch"]/div/p[2]/strong';



    let lunch_dish_1
    let lunch_dish_2
    let lunch_soup

    if(date_index == 1) {
        lunch_dish_1 = monday_dish_1
        lunch_dish_2 = monday_dish_2
        lunch_soup = monday_soup
    } else if(date_index == 2) {
        lunch_dish_1 = tuesday_dish_1
        lunch_dish_2 = tuesday_dish_2
        lunch_soup = tuesday_soup
    } else if(date_index == 3) {
        lunch_dish_1 = wednesday_dish_1
        lunch_dish_2 = wednesday_dish_2
        lunch_soup = wednesday_soup
    } else if(date_index == 4) {
        lunch_dish_1 = thursday_dish_1
        lunch_dish_2 = thursday_dish_2
        lunch_soup = thursday_soup
    } else if(date_index == 5) {
        lunch_dish_1 = friday_dish_1
        lunch_dish_2 = friday_dish_2
        lunch_soup = friday_soup
    }

    const [lunch_dish1_name_xpath] = await page.$x(lunch_dish_1);
    const lunch_dish1_name = await format_data(lunch_dish1_name_xpath)

    const [lunch_dish2_name_xpath] = await page.$x(lunch_dish_2);
    const lunch_dish2_name = await format_data(lunch_dish2_name_xpath)

    const [lunch_soup_name_xpath] = await page.$x(lunch_soup);
    const lunch_soup_name = await format_data(lunch_soup_name_xpath)

    const [lunch_price_xpath] = await page.$x(lunch_price);
    const lunch_price_txt = await format_data(lunch_price_xpath)
    const lunch_split = lunch_price_txt.split(" ")
    const lunch_price_formated = lunch_split[1]


    const bruket_lunch_dish1 = {"name": lunch_dish1_name, "price": lunch_price_formated}
    const bruket_lunch_dish2 = {"name": lunch_dish2_name, "price": lunch_price_formated}
    const bruket_soup = {"name": lunch_soup_name, "price": lunch_price_formated}

    return [bruket_lunch_dish1, bruket_lunch_dish2, bruket_soup, lunch_price_formated]

}*/

module.exports = {scrape_bruket}
