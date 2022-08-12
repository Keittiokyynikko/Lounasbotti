const day_string = new Date().toDateString();

const header = (greeting) => {
    return {
        type: "header",
        text: {
            type: "plain_text",
            text: ":cook: " + greeting,
        },
    };
}

const date = {
    type: "context",
    elements: [{
        text: day_string,
        type: "mrkdwn",
    }, ],
};

const restaurant_header = (restaurant_name, url) => {
    return {
        type: "section",
        text: {
            type: "mrkdwn",
            text: `*${restaurant_name}*`,
        },
        accessory: {
            type: "button",
            text: {
                type: "plain_text",
                text: "Sivusto",
                emoji: true,
            },
            value: "click_me_123",
            url: url,
            action_id: "button-action",
        },
    }
};

const lunch_section = (dish_name, dish_price) => {
    return {
        type: "section",
        text: {
            type: "mrkdwn",
            text: dish_name + " " + `*${dish_price}*`,
        },
    };
}

const info_section = (message) => {
    return {
        type: "section",
        text: {
            type: "mrkdwn",
            text: `*${message}*`
        }
    }
}

async function restaurant_lunch_section_build_1(
    url,
    date,
    index,
    callback
) {
    const restaurant_url = url;
    const restaurant_menu = await callback(restaurant_url, date)

    const promise = await new Promise((resolve, reject) => {
        const restaurant_dish_array = [];
        const restaurant_dish_blocks = []
        for (var i = 0; i < restaurant_menu.length; i++) {
            restaurant_dish_array[i] = {
                name: restaurant_menu[i].name,
                price: restaurant_menu[i].price,
            };
            restaurant_dish_blocks[i] = lunch_section(
                restaurant_menu[i].name,
                restaurant_menu[i].price
            );
        }

        //console.log(onda_dish_blocks)

        resolve(restaurant_dish_blocks);
    })

    return promise[index];
}

async function restaurant_lunch_section_build_2(
    url,
    date,
    index,
    callback
) {
    const restaurant_url = url;
    const restaurant_menu = await callback(restaurant_url, date)

    const promise = await new Promise((resolve, reject) => {
        const restaurant_dish_array = [];
        const restaurant_dish_blocks = []
        for (var i = 0; i < restaurant_menu.length; i++) {
            restaurant_dish_array[i] = {
                name: restaurant_menu[i].name
            };
            restaurant_dish_blocks[i] = lunch_section(
                restaurant_menu[i].name
            );
        }

        //console.log(onda_dish_blocks)

        resolve(restaurant_dish_blocks);
    })

    return promise[index];
}

module.exports = {
    date,
    header,
    restaurant_header,
    restaurant_lunch_section_build_1,
    restaurant_lunch_section_build_2,
    info_section
};