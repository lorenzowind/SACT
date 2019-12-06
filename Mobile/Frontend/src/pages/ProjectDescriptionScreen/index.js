import React from "react";
import { Redirect } from "react-router";

import logo from '../../assets/logo.png';
import back from '../../assets/back.png';
import next from '../../assets/next.png';

import "./styles.css";
import "../styles.css";

export default class InitScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            back: false,
            next: false,
            project: this.props.location.state.p
        }
    }

    handleChange_back = () => {
        this.setState({back: true});
    }

    handleChange_next = () => {
        this.setState({next: true});
    }

    render(){
        
        if (this.state.back) return <Redirect to={{pathname: "/projects-view"}}/>

        if (this.state.next) return <Redirect to={{pathname: "/projects-view-description-avaliation", state: {p: this.state.project}}}/>

        return(
        
            <div className="screen">

                <div className="background_">

                    <div className="init_">

                        <div>

                        <div className="header">

                            <div className="back">
                                <img src={back} alt="" onClick={this.handleChange_back}/>
                            </div>

                            <div className="logo_">
                                <img src={logo} alt=""/>
                            </div>
                            
                            <div className="next">
                                <img src={next} alt="" onClick={this.handleChange_next}/>
                            </div>

                        </div>

                        <div className="project_name_">
                            <h1>{this.state.project.name}</h1>
                        </div>

                        <div className="info">
                            <h1>Integrantes</h1>
                        </div>

                        {this.state.project.students.map((s) => (
                            <div className="project_students_" key={s}>
                                <h1>{s}</h1>
                            </div>
                        ))}

                        <div className="info">
                            <h1>Área de atuação</h1>
                        </div>

                        <div className="project_course_">
                            <h1>{this.state.project.course}</h1>
                        </div>

                        <div className="info">
                            <h1>Observações</h1>
                        </div>

                        <div className="project_observations">
                            <h1>{this.state.project.observations}</h1>
                        </div>

                        </div>

                    </div>

                </div>

            </div>

        )

    }

}