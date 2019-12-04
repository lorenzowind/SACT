import React from "react";
import { Redirect } from "react-router";

import logo from '../../assets/logo.png';

import "./styles.css";
import "../styles.css";

export default class InitScreen extends React.Component {   
    
    constructor(props){
        super(props);
        this.state = { 
            cpf: '', 
            enter: false 
        };
    }

    handleChange_cpf = (event) => {
        this.setState({cpf: event.target.value});
    }
    
    handleChange_enter = () => {
        this.setState({enter: true});
    }

    render(){

        const {enter} = this.state; 

        if (enter) return <Redirect to="/projects-view" push={true} />;
        
        return(

            <div className="screen">

                <div className="background">
            
                <div className="logo">
                    <img src={logo} alt=""/>
                </div>

                <div className="text_input">
                    <input 
                    type="text" 
                    name="cpf" 
                    placeholder="CPF"
                    onChange={this.handleChange_cpf}
                    />
                </div>

                <div className="button_enter">
                    <input 
                    type="button" 
                    name="enter"
                    value="Entrar"
                    onClick={this.handleChange_enter}
                    />
                </div>
                
                </div>

            </div>

        )
    }

}