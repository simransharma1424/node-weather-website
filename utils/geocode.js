const request = require('request')

const geocode = (address, callback) => {
  const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2ltcmFuMTUyNCIsImEiOiJja2Z6cmN1aWIwMGJxMnFxd29pbjA0YzFiIn0.GUgjku6c44CDUVkqbuCoCA'
  request({url, json:true}, (error, {body})=>{
    if(error){
      // console.log(error)
      callback('geocode: Unable to connect to the API!', undefined)
    }else if(body.features.length===0){
      callback('geocode: Unable to find location!!',undefined)
    }else{
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}


module.exports = {
  geocode: geocode
}