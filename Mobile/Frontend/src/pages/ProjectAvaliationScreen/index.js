import React from "react";
import { Redirect } from "react-router";

import Slider from './ComponentSlider/index'

import back from '../../assets/back.png';

import "./styles.css";
import "../styles.css";

export default class InitScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            back: false,
            back_init: false,
            project: this.props.location.state.p
        }
    }

    handleChange_back = () => {
        this.setState({back: true});
    }

    handleChange_conclude = () => {
        var element = document.getElementsByClassName("project_slider");
        var index = 0;
        this.setState(   
            this.state.project.avaliations.topics.map((mt) => (
                mt.sub_topics.map((st) => (
                    st.ponctuation = element[index++].firstChild.firstChild.textContent
                ))
            ))
        )
        this.setState({back_init: true});
    }
    
    render(){

        var mt_control = 0, st_control;

        if (this.state.back) return <Redirect to={{pathname: "/projects-view-description", state: {p: this.state.project}}}/>

        if (this.state.back_init) return <Redirect to = "/projects-view"/>

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

                        {this.state.project.avaliations.topics.map((mt) => (
                            
                            <div className="mainly_topic" key={mt.title}>

                                {mt.sub_topics.map((st) => (

                                    <div className="sub_topic" key={st.title}>

                                        <h1>{st.title}: {st.ponctuation}</h1>

                                    </div>

                                ))}

                            </div>

                        ))}

                        </div>

                    </div>

                </div>

            </div>

        )

    }

}