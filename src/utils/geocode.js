const request=require("request")


const geocode=(address,callback)=>{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1Ijoic2lkZGhpLXciLCJhIjoiY2tkZzg3bTlyNHB2OTJ5cXZqNnd3bXlpciJ9.qBWo1lrEairaqSVcb7vSDA&limit=1"
    request({url:url, json:true},(error,response)=>{
        if(error){//internet error
            callback("Unable to connect to location services!",undefined)//this is callback not console.log() to print.
        }
        else if(response.body.features[0]===undefined){//address error
            callback("Unable to find location.Try another search!",undefined)
        }
        else{
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name,
            })
        }
    })
}


module.exports= geocode