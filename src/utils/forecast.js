const request=require("request")
//json:true will parse the data in obj so we can access any property.

const forecast=(latitude,longitude,callback)=>{
    const url="https://api.darksky.net/forecast/4bd6f6f76cd13d53c85e0d7a84af8f3d/"+latitude+","+longitude+"?units=si"
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback("Unable to connect to weather services!",undefined)
        }
        else if(response.body.error){
            callback("Unable to find location.Try another search!", undefined)
        }
        else{
            callback(undefined, response.body.daily.data[0].summary+" It is currently "+response.body.currently.temperature+" degrees out."+" There is a "+response.body.currently.precipProbability+"% chance of rain. There would be highest temperature of "+response.body.daily.data[0].temperatureHigh+" degree celcius and lowest would be of "+response.body.daily.data[0].temperatureLow+" degree celcius."            
            )
        }
    })
}


module.exports= forecast