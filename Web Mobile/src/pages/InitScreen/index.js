import React from "react";
import { Redirect } from "react-router";
import MaskedInput from 'react-text-mask';

import logo from '../../assets/logo.png';

import "./styles.css";
import "../styles.css";

import api from "../../services/api";

export default class InitScreen extends React.Component {   
    
    constructor(props){
        super(props);
        localStorage.removeItem('token');
        this.state = { 
            enter: false,
            popup: [],
            popup_error: [],
            is_possible: null,
            cpf: null,
            id: null,
            projects: null,
            sections: [],
            criterias: [],
            projects_active: []
        };
    }

    handleChange_cpf = (event) => {
        this.setState({cpf: event.target.value});
    }
    
    handleChange_enter = async ev => {
        
        ev.preventDefault();

        const state = {
            cpf: this.state.cpf
        };
      
        const post_user = await api.post("/login", state).catch((err) => (console.log("erro")));

        if(post_user){

            if(post_user.data.status === 'true'){
                this.setState({is_possible: true});
                this.setState({id: post_user.data.id});
            }

            if(this.state.is_possible){

                localStorage.setItem('token', post_user.data.token);
                
                const post_projects = await api.get(`/users/${this.state.id}`).catch((err) => (console.log("erro")));
                if(post_projects)this.setState({projects: post_projects.data.projects}); 

                for(var i=0;i<this.state.projects.length;i++){

                    this.state.projects_active[i] = true;
                    
                    const post_sections = await api.get(`/projects/${this.state.projects[i].id}`).catch((err) => (console.log("erro")));
                    if(post_sections)this.state.sections[i] = post_sections.data.sections;
                    
                    var criterias = [];

                    for(var j=0;j<this.state.sections[i].length;j++){
                        const post_criterias = await api.get(`/sections/${this.state.sections[i][j].id}`).catch((err) => (console.log("erro")));
                        if(post_criterias)criterias[j] = post_criterias.data.criteria;
                    }
                    this.state.criterias[i] = criterias;
                
                }

                this.setState({enter: true});

            }
            else{
                this.setState({popup: [true]});
            }

        }
        else{
            this.setState({popup_error: [true]});
        }
      
    }

    handleChange_ok = () => {

        this.setState({popup: []});
        this.setState({popup_error: []});
        
        var element = document.getElementsByClassName("text_input");
        element[0].firstChild.value = '';

    }

    render(){

        const {enter} = this.state; 

        if (enter) return <Redirect to={{pathname: "/projects-view", state: {
            id: this.state.id, 
            projects: this.state.projects, 
            sections: this.state.sections, 
            criterias: this.state.criterias,
            projects_active: this.state.projects_active
        }}}/>
        
        return(

            <div className="screen">

                <div className="background">

                <div className="init">

                    <div>
            
                    <div className="logo">
                        <img src={logo} alt=""/>
                    </div>

                    <div className="text_input">
                        <MaskedInput
                        placeholder="CPF"
                        mask={[/[0-9]/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'-',/\d/,/\d/]}
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

                    {this.state.popup_error.map((i) => (

                        <div className="popup3" key={i}>

                        <div className="close">
                            <h1 onClick={this.handleChange_ok}>X</h1>
                        </div>

                        <div className="msg4">
                            <h1>CPF incorreto</h1>
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