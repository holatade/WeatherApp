const request = require('request')

const geoCode = (address, callback) => {
    const newUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=1&access_token=pk.eyJ1IjoiaG9sYXRhZGUiLCJhIjoiY2twc3A0c2x3MGtlZDJ1bW41eHV6dTM4eSJ9.Yuf4islVKZ3BOXT8r-C2gg`
    request({ url: newUrl, json: true }, (error, response) => {
        if (error) {
            return callback('Unable to connect to order service')
        }
        if (response.body.features.length === 0) {
            return callback('No location matches search result')
        }        
        else {
            console.log(response.body)
            const location = response.body.features[0].center
            callback(null, {
                lat:  location[1],
                long :  location[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode