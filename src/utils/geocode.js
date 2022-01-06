const request=require('request')
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZW1wcml0YW0yMTIiLCJhIjoiY2t4azhyZTFpMWNwMTJwa2p4NXE0Nnk1eSJ9.Np6ijhePshYw-x4aOkn2RQ&limit=1'
    request({url,json:true},(error,{body}={})=>{
        if(error)
        {
            callback('unable to connect to location services!',undefined)
        }
        else if(body.features.length===0)
        {
            callback('unable to find location.try another search',undefined)
        }
        else{
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location: body.features[0].place_name,
            })
        }

    })
}
module.exports=geocode