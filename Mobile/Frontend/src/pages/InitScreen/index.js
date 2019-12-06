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
            enter: false,
            popup: [],
            is_possible: true
        };
    }

    handleChange_cpf = (event) => {
        this.setState({cpf: event.target.value});
    }
    
    handleChange_enter = () => {
        if(this.state.is_possible){
            this.setState({enter: true});
        }
        else{
            this.setState({popup: [true]});
        }
    }

    handleChange_ok = () => {
        this.setState({popup: []});
    }

    render(){

        const {enter} = this.state; 

        if (enter) return <Redirect to="/projects-view" push={true} />;
        
        return(

            <div className="screen">

                <div className="background">

                <div className="init">

                    <div>
            
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

                    {this.state.popup.map((i) => (

                        <div className="popup1" key={i}>

                        <div className="close">
                            <h1 onClick={this.handleChange_ok}>X</h1>
                        </div>

                        <div className="msg1">
                            <h1>PARABÉNS</h1>
                        </div>

                        <div className="msg2">
                            <h1>Você concluiu todas as suas fichas de avaliações!</h1>
                        </div>

                        <div className="msg2">
                            <h1>Você não pode navegar na aplicação!</h1>
                        </div>

                        <div className="msg3">
                            <h1>Venha conhecer os outros projetos presentes na feira!</h1>
                        </div>

                        <div className="button_ok">
                            <input 
                            type="button" 
                            name="ok"
                            value="OK"
                            onClick={this.handleChange_ok}
                            />
                        </div>

                    </div>

                    ))}
                
                </div>
                
                </div>

            </div>

        )
    }

}