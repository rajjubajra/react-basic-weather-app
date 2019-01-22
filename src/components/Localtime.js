import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';


const Localtime = (props) => {
 
  const unixTimestamp = props.sunrise;
        return (
            <Moment unix tz={props.country} >
              {unixTimestamp}
            </Moment>
        );

}
export default Localtime;