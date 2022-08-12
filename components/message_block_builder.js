const day_string = new Date().toDateString()

//Viikonpäivä
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const current_date = new Date().getDay();


const divider = {
    "type": "divider"
}

const header = (greeting) => {
    return {
        "type": "header",
        "text": {
            "type": "plain_text",
            "text": ":cook: " + greeting
        }
    }
}

const date = {
    "type": "context",
    "elements": [{
        "text": day_string,
        "type": "mrkdwn"
    }]
}

const restaurant_header = (restaurant_name, url) => {
    return {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": `*${restaurant_name}*`
        },
        "accessory": {
            "type": "button",
            "text": {
                "type": "plain_text",
                "text": "Sivusto",
                "emoji": true
            },
            "value": "click_me_123",
            "url": url,
            "action_id": "button-action"
        }
    }
}


const lunch_section = (dish_name, dish_price) => {
    return {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": dish_name + " " + dish_price
        }
    }
}

/*
async function slack_message_build() {
    const onda = 'https://ravintolaonda.fi/';
    const onda_lunch = await scrape_onda(onda, current_date)

    const pihka = 'https://www.pihka.fi/pihka-lintulahti/'
    const pihka_lunch = await scrape_pihka(pihka)

    const pantry = 'https://thepantry.fi/sornainen/#lounas/'
    const pantry_lunch = await scrape_pantry(pantry, current_date)

    const bruket = 'https://www.kampanja.co/dev/bruket/admin/api.php?a=lunch';
    const bruket_lunch = await scrape_bruket(bruket, current_date)

    const fazer = 'https://www.foodandco.fi/modules/MenuRss/MenuRss/CurrentDay?costNumber=0069&language=fi'
    const fazer_lunch = await scrape_fazer()

    const promise = await new Promise((resolve, reject) => {

        const onda_name_block = restaurant_name("ONDA")
        const onda_info_block = restaurant_info(onda)        
        const onda_dish_array = []
        const onda_dish_blocks = []
        for(i=0; i<onda_lunch.length; i++) {
            onda_dish_array[i] = {"name": onda_lunch[i].name, "price": onda_lunch[i].price}
            onda_dish_blocks[i] = lunch_section(onda_lunch[i].name, onda_lunch[i].price)
        }

        //console.log(onda_dish_blocks)
        
        resolve(onda_dish_blocks)
    })

    return promise
}
*/

async function restaurant_lunch_section_build_1(restaurant, url, date, index, callback) {

    const restaurant_url = url;
    const restaurant_menu = await callback(restaurant_url, date)

    const promise = await new Promise((resolve, reject) => {

        const restaurant_dish_array = []
        const restaurant_dish_blocks = []
        for (i = 0; i < restaurant_menu.length; i++) {
            restaurant_dish_array[i] = {
                "name": restaurant_menu[i].name,
                "price": restaurant_menu[i].price
            }
            restaurant_dish_blocks[i] = lunch_section(restaurant_menu[i].name, restaurant_menu[i].price)
        }

        //console.log(onda_dish_blocks)

        resolve(restaurant_dish_blocks[i])
    })

    return promise

}

module.exports = {
    header,
    restaurant_header,
    restaurant_lunch_section_build_1
}