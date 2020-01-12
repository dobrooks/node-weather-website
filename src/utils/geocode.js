const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZG9icm9va3MiLCJhIjoiY2s1MWF6bTYwMHYyMzNscWY0NzJqcm1icyJ9.cpUCWZhyR4klkGC4MrVk4Q&limit=1&"
    request({url: url, json: true}, (error, response) =>{
        if (error) {
            callback('Unable to connect to location services')
        } else if (response.body.features.length === 0) {
            callback('Bad Location Data')
        } else {
            callback('', {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })

        }

    })
}

module.exports = geocode