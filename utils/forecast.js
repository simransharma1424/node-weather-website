const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?&access_key=32ebc40c59175ded232fde5e54f0e658&query='+lat+','+long+'&units=f'
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to reach API', undefined)
        }else if(body.error){
            console.log(body)
            callback('Wrong latitude/longitude', undefined)
        }else{
            // callback(undefined, response.body)
            callback(undefined, body.current.weather_descriptions[0]+'\n'+'It is currently ' + body.current.temperature +' feels like ' + body.current.feelslike)
        }
    })
}

module.exports={
    forecast: forecast
}