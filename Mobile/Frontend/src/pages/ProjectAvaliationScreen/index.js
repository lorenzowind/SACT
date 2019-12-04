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
            project: this.props.location.state.p
        }
    }

    handleChange_back = () => {
        this.setState({back: true});
    }
    
    render(){

        var mt_control = 1, st_control;

        if (this.state.back) return <Redirect to={{pathname: "/projects-view-description", state: {p: this.state.project}}}/>

        return(

            <div className="screen">

                <div className="background">

                    <div className="header">

                        <div className="back">
                            <img src={back} alt="" onClick={this.handleChange_back}/>
                        </div>

                        <div className="info_">
                            <h1>Ficha de Avaliação</h1>
                        </div>
                    
                    </div>

                    {this.state.project.avaliations.topics.map((mt) => (
                        
                        <div className="project_topic">
                        
                            <div className="project_mainly_topic" key={mt.title}>
                                <h1>{mt_control++}{'. '}{mt.title}</h1>
                            </div>

                            <div style={{display: 'none'}}>{st_control = 1}</div>

                            {mt.sub_topics.map((st) => (

                                <div className="project_sub_topic" key={st.title}>
                                    
                                    <h1>{mt_control}{'.'}{st_control++}{'. '}{st.title}</h1>
                                    
                                    <div className="project_slider">
                                        <Slider/>
                                    </div>
                                
                                </div>

                            ))}
                        
                        </div>

                    ))}

                </div>

            </div>

        )

    }

}