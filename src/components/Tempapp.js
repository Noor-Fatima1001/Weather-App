import axios from 'axios'
import React, {  useState } from 'react';
import "./CSS/style.css";


 const Tempapp = () => {
    const [data, setData] = useState({
        celsius : 10,
        name : "london",
        humidity : 10,
        speed : 2,
        image:"/assets/clouds.png"
    })
    const [name,setName] = useState('');
    const [error,setError] = useState('');
    
    
    const handleClick = () => {
        if(name !== ""){
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=8e6f9dc2beeb3770a078bb34cf9fbdd6&units=metric`;
            axios.get(apiUrl)
            .then(res =>{
                let imagePath  = "";
               { if(res.data.weather[0].main === "Cloud"){
                    imagePath="/assets/cloud.png"
                }
                else if(res.data.weather[0].main === "Clear"){
                    imagePath="/assets/clear.png"
                }
                else if(res.data.weather[0].main === "Drizzle"){
                    imagePath="/assets/drizzle.png"
                }
                else if(res.data.weather[0].main === "Mist"){
                    imagePath="/assets/mist.png"
                }
                else if(res.data.weather[0].main === "Rain"){
                    imagePath="/assets/rain.png"
                }
                else{
                    imagePath='/assets/clouds.png'
                }}

                console.log(res.data);
                 setData({...data, celsius:res.data.main.temp ,name:res.data.name, humidity:res.data.main.humidity, speed:res.data.wind.speed, image:imagePath})
                 setError('');
                })
            .catch(err => {if (err.response.status === 404){
                setError("Invalid city name")
            }
            else{
                setError('');
            }
            console.log(err)});
    
        }
    }
    
  return (
     
      <div className='container'>
        <div className="weather">
            <div className="search">
                <input type="text" placeholder='Enter name' onChange={e => setName(e.target.value)}/>
                <button><img src="/assets/search.png" onClick={handleClick} alt=""/></button>
            </div>
            <div className="error">
                <p>{error}</p>
            </div>
            <div className="winfo">
                <img src={data.image}  alt=''  className="icon"/>
          <h1>{Math.round(data.celsius)}°c</h1>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col">
                <img src="/assets/humidity.png" alt=""/>
                <div className="Humidity">
                    <p>{Math.round(data.humidity)}%</p>
                    <p>Humidity</p>
                </div>
            </div>
            <div className="col">
                <img src="/assets/wind.png" alt=""/>
                <div className="Wind">
                    <p>{Math.round(data.speed)}km/h</p>
                    <p>Wind</p>
                </div>
            </div>
            
          </div>
            </div>
        </div>
      </div>
    
  )
}
export default Tempapp;