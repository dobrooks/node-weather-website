const request = require('request')

const geocodegmap = (address, callback) => {
    const url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(address) + "&key=AIzaSyBGmNEc5dGI3RIyA956C1soDqfbuz1N3oI"
    request({url, json: true}, (error, response) =>{
        if (error) {
            callback('Unable to connect to location services')
        } else if (response.body.results === 0) {
            callback('Bad Location Data')
        } else {
            callback('', {
                latitude: response.body.results[0].geometry.location.lat,
                longitude: response.body.results[0].geometry.location.lng,
                location: response.body.results[0].formatted_address
            })

        }

    })
}

module.exports = geocodegmap


//  url uses property shorthand since the object name and value are the same  url: url => becomes url