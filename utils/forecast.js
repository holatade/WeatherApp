const request = require('request')

const forecast = ({lat,long},callback) => {
    const url = `http://api.weatherstack.com/current?access_key=6f3c816ebb967ceb8849582e3cb2a2eb&query=${lat},${long}&units=f`
    request({ url, json: true }, (error, response) => {
        if (error) {
            return callback('Unable to connect to order service')
        }
        if (response.body.error) {
            return callback(response.body.error.info)
        }
        const { temperature, feelslike, weather_descriptions } = response.body.current
        callback(undefined,`${weather_descriptions[0]}. It is currently ${temperature} degrees,but it feels like ${feelslike} degrees `)
    })
}

module.exports = forecast