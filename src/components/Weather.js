import React from 'react';



const Sunrise = (props) =>{
  return(
    <div>
      Sunrise time?
    {/* {props.sunrise && 'Sunrise: ' + props.sunrise } */}
    </div>
  )
}


const Weather = (props) => {
  return(
    
    <div className='weather'>
      <p>{props.city  && props.country ? props.city +','+ props.country : ''}</p>   
      <p>{props.temparature ? 'Temparature: ' + props.temparature + ' deg C' : ''}</p>
      <p>{props.humidity ? 'Humidity: ' + props.humidity : ''}</p>
      <p>{props.description ? 'Description: ' +  props.description : ''}</p> 
    </div>
  )
}
export default Weather;