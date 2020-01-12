const request = require('request')


// request({url: urlweather, json: true}, (error, response) => {

const forecast = (long,lat,callback) => {
    const url = "https://api.darksky.net/forecast/2601ebf0a2c680ce9fe0da1dc7cdaba3/" + encodeURIComponent(long) +","+ encodeURIComponent(lat) + "?units=us&lang=en"
    request({url, json: true}, (error, {body}) =>{
        if (error) {
            callback('Unable to connect to location services')
        } else if (body.error) {
            callback('Bad Location Data')
        } else {
            const summary = body.currently.summary
            const temperature = body.currently.temperature
            const chance = body.currently.precipProbability

            callback('', summary + " " + temperature + ' degrees  ' + chance + '% chance of percipitation')

        }

    })
}

module.exports = forecast

//  url uses property shorthand since the object name and value are the same  url: url => becomes url

// The response object in the request is destructured

