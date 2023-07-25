const { Router } = require('express');
const res = require('express/lib/response');

const router = Router();



const url="https://api.openweathermap.org/data/2.5/weather?";
//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
//Londra:51.49424932362783, -0.11278334899332279
//Livorno:43.53596384956125  10.342982818171183
const lat=43.53596384956125;
const lon=10.342982818171183;
const position = 30;

const appid="264aab19d66f9645b60f8adb292221f6";
const urlRoller="http://192.168.33.1/rpc/Cover.GoToPosition?";

const idRollerCamerina="c049ef8e3bc4";
const ipRollerCamerina="192.168.1.253";


  async function getWeather() {
    const response = await fetch(url+"lat="+lat+"&lon="+lon+"&appid="+appid);
    const weather = await response.json();
    return weather;
    
  }
//http://192.168.33.1/rpc/Cover.GoToPosition?id=0&pos=20
 async function closingHandler(){
  const response = await fetch("http://"+ipRollerCamerina+"/rpc/Cover.GoToPosition?id="+idRollerCamerina+"&pos="+position);
  console.log(await response.json());
  return response;
 }

router.get("/weather",async (req,res)=>{
    const weather = await getWeather();
    const windSpeed = weather.wind.speed;
    const rain1h = weather.rain;
    if(windSpeed>=5.5){
      const closingresult= await closingHandler()
        .then(()=>console.log("closing done"))
        .then(()=>res.sendStatus(200))
        .catch((err)=>console.log(err))
    }else{
        res.send("wind is low");
    }
})

module.exports = router;