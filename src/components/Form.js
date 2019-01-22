import React from 'react';



const Form = (props) => {
  return(
    <div>
      <form onSubmit={props.getWeather}>
        <input 
          type='text' 
          name='city' 
          placeholder='City name' 
          onChange={props.handleOnChange}
          value={props.city}
          
        />
        <input 
          type='text' 
          name='country' 
          placeholder='Country' 
          onChange={props.handleOnChange}
          value={props.country}
        />
        <button>Get Weather</button>
      </form>
    </div>
  )
}
export default Form;