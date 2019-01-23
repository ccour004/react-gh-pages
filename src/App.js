import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
constructor(props){
        super(props);
	this.state = {};
}

  componentDidMount(){
        console.log(window.location.hash);
        if(window.location.hash.includes('#')){
		axios.get("https://www.googleapis.com/drive/v2/files?access_token="+window.location.hash.split('&')[0].split('=')[1])
		.then(res =>{
		    const response = res.data;
		    this.setState({response});
		});
	}
  }

  parseResponse(){
  }

  render() {
const baseURL = "https://accounts.google.com/o/oauth2/v2/auth",
	scope = "https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.metadata.readonly",
	redirect_uri = "http://localhost:3000",
	response_type = "token", client_id = "219412377030-f3vst5pe2d1srk8b6tjeaocdai04bfkf.apps.googleusercontent.com",
	sign_in_page = baseURL+'?scope='+scope+"&include_granted_scopes=true&redirect_uri="+redirect_uri+"&response_type="+response_type+"&client_id="+client_id;

console.log(this.state.response);
    if(this.state.response && this.state.response.items){
        var items = this.state.response.items.map((item) => <li>{item.title}</li>);
        return <div><ul>{items}</ul></div>;
    }
    return (
      <div>
        <a href={sign_in_page}>Sign in</a>
     </div>);
  }
}

export default App;

/*
https://accounts.google.com/o/oauth2/v2/auth?
 scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.metadata.readonly&
 include_granted_scopes=true&
 state=state_parameter_passthrough_value&
 redirect_uri=	http://localhost:3000&
 response_type=token&
 client_id=219412377030-f3vst5pe2d1srk8b6tjeaocdai04bfkf.apps.googleusercontent.com
*/

/*EXAMPLE RESPONSE:

http://localhost:3000/#state=state_parameter_passthrough_value&access_token=ya29.GluaBm2hZrZpMGSO7VyRaRBGP4Olx6Y2ae72RaBs017ZZdPioQ5t80GHCk4n2NOz8NEpmjor8D41_rJ460nr6xC_6_cvre_ExZ6VIZTX2zZMOJHp9_asfbelBkGJ&token_type=Bearer&expires_in=3600&scope=openid%20email%20https://www.googleapis.com/auth/plus.me%20https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/drive.metadata.readonly

EXAMPLE API CALL:
https://www.googleapis.com/drive/v2/files?access_token=ya29.GluaBm2hZrZpMGSO7VyRaRBGP4Olx6Y2ae72RaBs017ZZdPioQ5t80GHCk4n2NOz8NEpmjor8D41_rJ460nr6xC_6_cvre_ExZ6VIZTX2zZMOJHp9_asfbelBkGJ


*/
