const request=require('request');
const forecast=(latitude,longitude,callback)=>
{
    const url='http://api.weatherstack.com/current?access_key=b278fab8043bc8e69a0daf16e3a0f495&query='+latitude+','+longitude+'&units=m';
        request({url,json :true},(error,{body}={})=>{
        if(error)
        {
            callback('Unable to connect to weather Stack',undefined);
        }
        else if(body.error)
        {
            callback('Unable to find the location',undefined);
        }
        else{
            // callback(undefined,{
            //     currentWeather:response.body.current.weather_descriptions[0],
            //     currentTemp:response .body.current.temperature,
            //     Feeltemp:response.body.current.feelslike,
            // })
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}
module.exports=forecast
