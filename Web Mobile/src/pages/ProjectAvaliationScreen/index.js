import React from "react";
import { Redirect } from "react-router";

import Slider from './ComponentSlider/index'

import back from '../../assets/back.png';

import "./styles.css";
import "../styles.css";

import api from "../../services/api";

export default class InitScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            back: false,
            back_init: false,
            project: this.props.location.state.p,
            projects: null
        }
    }

    handleChange_back = () => {
        this.setState({back: true});
    }

    handleChange_conclude = async ev => {

        var element = document.getElementsByClassName("project_slider");
        var index = 0;
        this.setState(   
            this.state.project.avaliations.topics.map((mt) => (
                mt.sub_topics.map((st) => (
                    st.ponctuation = element[index++].firstChild.firstChild.textContent
                ))
            ))
        )

        ev.preventDefault();

        const post_projects = await api.get(`/users/${this.props.location.state.user_id}`).catch((err) => (console.log("erro")));
        if(post_projects)this.setState({projects: post_projects.data.projects});

        for(var i=0;i<this.state.project.avaliations.topics.length;i++){
            for(var j=0;j<this.state.project.avaliations.topics[i].sub_topics.length;j++){

                var rate_ = this.state.project.avaliations.topics[i].sub_topics[j].ponctuation;
                var criteria_id = this.state.project.avaliations.topics[i].sub_topics[j].id;

                const json = {
                    rate: rate_   
                }

                const post_criteria = await api.post(`/prc/${this.state.project.id}/${criteria_id}/${this.props.location.state.user_id}`, json).catch((err) => (console.log("erro")));
            }
        }

        this.state.project.active = false;

        this.props.location.state.projects_active[this.state.project.index] = false;

        var actives = 0;

        for(var i=0;i<this.props.location.state.projects_active.length;i++){
            if(!this.props.location.state.projects_active[i])actives++;
        }

        if(actives === this.props.location.state.projects_active.length){
            
            const post_user = await api.get(`/users/${this.props.location.state.user_id}`).catch((err) => (console.log("erro")));
            var user = post_user.data;

            const json = {
                name: user.name,
                cpf: user.cpf,
                phone: user.phone,
                email: user.email,
                occupationArea: user.occupationArea,
                evaluatedPrjs: user.evaluatedPrjs,
                institution: user.institution,
                status: 'false'
            }

            const post_user_ = await api.put(`/users/${this.props.location.state.user_id}`, json).catch((err) => (console.log("erro")));

        }

        this.setState({back_init: true});

    }
    
    render(){

        var mt_control = 0, st_control;

        if (this.state.back) return <Redirect to={{pathname: "/projects-view-description", state: {
            p: this.state.project, 
            user_id: this.props.location.state.user_id,
            sections: this.props.location.state.sections,
            criterias: this.props.location.state.criterias,
            projects_active: this.props.location.state.projects_active
        }}}/>

        if (this.state.back_init) return <Redirect to={{pathname: "/projects-view", state: {
            p: this.state.project, 
            id: this.props.location.state.user_id,
            projects: this.state.projects,
            sections: this.props.location.state.sections,
            criterias: this.props.location.state.criterias,
            projects_active: this.props.location.state.projects_active
        }}}/>

        return(

            <div className="screen">

                <div className="background">

                    <div className="init_">

                        <div>

                        <div className="header">

                            <div className="back_">
                                <img src={back} alt="" onClick={this.handleChange_back}/>
                            </div>

                            <div className="info_"> 
                                <h1>FICHA DE AVALIAÇÃO</h1>
                            </div>
                        
                        </div>

                        {this.state.project.avaliations.topics.map((mt) => (

                            mt.title !== '' &&
                            
                            <div className="project_topic" key={mt.title}>

                                <div style={{display: 'none'}}>{mt_control++}</div>
                            
                                <div className="project_mainly_topic_title">
                                    <h1>{mt_control}{'. '}{mt.title}</h1>
                                </div>

                                <div style={{display: 'none'}}>{st_control = 1}</div>

                                {mt.sub_topics.map((st) => (

                                    <div className="project_sub_topic" key={st.title}>

                                    <div className="project_sub_topic_title">
                                        <h1>{mt_control}{'.'}{st_control++}{'. '}{st.title}</h1>
                                    </div>

                                    <div className="project_slider">
                                        <Slider/>
                                    </div>

                                    </div>

                                ))}
                            
                            </div>

                        ))}

                        <div className="button_conclude">
                            <input 
                            type="button" 
                            name="conclude"
                            value="Concluir"
                            onClick={this.handleChange_conclude}
                            />
                        </div>

                        </div>

                    </div>

                </div>

            </div>

        )

    }

}