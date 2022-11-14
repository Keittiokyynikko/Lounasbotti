const day_string = new Date().toDateString()

const header = (greeting) => {
  return {
    type: 'header',
    text: {
      type: 'plain_text',
      text: greeting,
    },
  }
}

const date = {
  type: 'context',
  elements: [
    {
      text: day_string,
      type: 'mrkdwn',
    },
  ],
}

const restaurant_header = (emoji, restaurant_name, url) => {
  return {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `${emoji}` + ' ' + `*${restaurant_name}*`,
    },
    accessory: {
      type: 'button',
      text: {
        type: 'plain_text',
        text: 'Sivusto',
        emoji: true,
      },
      value: 'click_me_123',
      url: url,
      action_id: 'button-action',
    },
  }
}

const lunch_section = (dish_name, dish_price) => {
  return {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: dish_name + ' ' + `*${dish_price}*`,
    },
  }
}

const lunch_section_name = (dish_name) => {
  return {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: dish_name,
    },
  }
}

const info_section = (message) => {
  return {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `*${message}*`,
    },
  }
}

module.exports = {
  date,
  header,
  restaurant_header,
  info_section,
  lunch_section,
  lunch_section_name,
}
