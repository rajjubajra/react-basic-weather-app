import React, { Component } from 'react';
import './App.css';


import Title from './components/Title';
import Form from './components/Form';
import Weather from './components/Weather';


const API_KEY = '74ee083f72b903f23ab071da1167d7b2';
const initalStates = {
  loading: false,
  city: '',
  country: '',
  temparature: '',
  humidity: '',
  description: '',
  error: '',
  notfound: false,
  units: 'metric'
}

class App extends Component {
  constructor(){
    super();
    this.state = initalStates;
  }


  handleOnChange = (event) => {
    this.setState({[event.target.name]: event.target.value })
    //console.log('city name', this.state.city, 'country ', this.state.country);
  }

  getWeather = async (event) => {
    
    event.preventDefault();

     let city = this.state.city;
     let country = this.state.country;
    
     const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=${this.state.units}&appid=${API_KEY}`);
     const Data = await api_call.json();
      
     Data.code === 404 ? this.setState({notfound: true}) : this.setState({notfound: false});
    
     if(city && country){

          if(!Data.sys.country || !Data.name){
            this.setState({notfound: true})
          }else{
          this.setState({
                    city: Data.name,
                    country: Data.sys.country,
                    temparature: Data.main.temp,
                    humidity: Data.main.humidity,
                    description: Data.weather[0].description,
                    sunrise: Data.sys.sunrise,
                    sunset: Data.sys.sunset,
                    error: '' })
          }          
      }else{
          this.setState({error: 'Please enter the value'});} 

  }

  render() {

   
      return (
              <div className="App">
              
              <Title />
              
                <div className='errormsg'>{this.state.error ? this.state.error : ''}</div>

              <Form 
                  getWeather={this.getWeather} 
                  city={this.state.city} 
                  country={this.state.country} 
                  handleOnChange={this.handleOnChange}
                />

              { this.state.notfound === true ? '<p>Data not found</p>' :
            
              <Weather 
                  city={this.state.city}
                  country={this.state.country}
                  temparature={this.state.temparature}
                  humidity={this.state.humidity}
                  description={this.state.description}
                  sunrise={this.state.sunrise}
                  sunset={this.state.sunset}
                />
              }
              </div>
            );
      }
          
   
}

export default App;
