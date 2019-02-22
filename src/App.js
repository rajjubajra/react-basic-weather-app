import React, { Component } from 'react';
import './App.css';
import Title from './components/Title';
import Form from './components/Form';
import Weather from './components/Weather';

/** CSS STYLE */
const initalStates = {
  city: '',
  country: '',
  temparature: '',
  humidity: '',
  description: '',
  emptyField: false,
  isloading: false,
  notfound: false,
  units: 'metric'
}



const API_KEY = '74ee083f72b903f23ab071da1167d7b2';

class App extends Component {
  constructor(props){
    super(props);
    this.state = initalStates;
  }
   
  

    handleOnChange = (event) => {
      console.log('HANDLE CHANGED');
      this.setState({[event.target.name]: event.target.value })
      //console.log('city name', this.state.city, 'country ', this.state.country);
    }


    /** request weather api data on submit form */
    getWeather = async (event) => {
      
      event.preventDefault();

      let city = this.state.city;
      let country = this.state.country;

      if(city && country){
              /** Call api */
              const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=${this.state.units}&appid=${API_KEY}`)
              
              const Data = await api_call.json()

              /** Throw data not found message if status 404 */
              // Data.cod === '404' && this.setState({notfound: true});

              if(Data.cod === '404'){
                    this.setState(initalStates);
                    this.setState({notfound: true})
              }else{
                    /**Populate respective states */
                    Data && this.setState({isloading: true});
                    this.setState({
                                      city: Data.name,
                                      country: Data.sys.country,
                                      temparature: Data.main.temp,
                                      humidity: Data.main.humidity,
                                      description: Data.weather[0].description,
                                      notfound: false,
                                      emptyField: false
                                   })    
              }

      }else{
              this.setState(initalStates);
              this.setState({emptyField: true});  
      }

    

  }

  componentDidMount(){
    console.log(
      'EMPTY FIELD', this.state.emptyField,
      'isloading', this.state.isloading, 
      'NOT FOUND', this.state.notfound
      );
  }


  componentWillUnmount(){
    /**clean all states after render */
    console.log('unMount');
   
  }

  render() {
      console.log('RENDER');
      return (
      <div className="App">
              
              <Title />

            <section>

                   <div>
                      
                    {this.state.emptyField &&  <div className='errormsg'>Form fields are empty</div> }
                    {this.state.notfound &&  <div className='errormsg'>Please enter valid City and Country</div> }
                      
                      <Form 
                        getWeather={this.getWeather} 
                        city={this.state.city} 
                        country={this.state.country} 
                        handleOnChange={this.handleOnChange}
                      />
                    </div>

                    <div>
                      {
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
            </section>             

      </div>);  
      }

      
          
   
}

export default App;
