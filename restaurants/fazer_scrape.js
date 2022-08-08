const cheerio = require('cheerio')
const axios = require('axios')
const fetch = require('isomorphic-unfetch')
const {DOMParser, XMLSerializer} = require('xmldom')

async function scrape_fazer() {

    let xmlContent
    const url = 'https://www.foodandco.fi/modules/MenuRss/MenuRss/CurrentWeek?costNumber=0069&language=fi'
    fetch(url).then((res) => {
        res.text().then((xml) => {
            let parser = new DOMParser()
        })
    })

}

module.exports = {scrape_fazer}