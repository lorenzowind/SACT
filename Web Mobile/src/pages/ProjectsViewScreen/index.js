import React from "react";
import { Redirect } from "react-router";

import "./styles.css";
import "../styles.css";

const token = localStorage.token;
const header = {
  headers: { Authorization: "bearer " + token }
};

var cont_inactive = 0;

class Project {
    constructor(
        index_,
        id_,
        active_,
        name_,
        class_name_,
        course_,
        students_,
        observations_,
        avaliations_
    ){
        this.index = index_;
        this.id = id_;
        this.active = active_
        this.name = name_;
        this.class_name = class_name_;
        this.course = course_;
        this.students = students_;
        this.observations = observations_;
        this.avaliations = avaliations_;
    }  
}
  
class Avaliation {
    constructor(topics_){
        this.topics = topics_;
    }
}
  
class MainlyTopic {
    constructor(title_, sub_topics_){
        this.title = title_;
        this.sub_topics = sub_topics_;
    }
}
  
class SubTopic {
    constructor(title_, ponctuation_, id_){
        this.title = title_;
        this.ponctuation = ponctuation_;
        this.id = id_; 
    }
}

export default class InitScreen extends React.Component {

    constructor(props){
        super(props);

        var projects_received = this.props.location.state.projects;
        var sections_received = this.props.location.state.sections;
        var criterias_received = this.props.location.state.criterias;
        var projects = [];

        cont_inactive = 0;

        for(var i=0;i<projects_received.length;i++){
            
            var available;

            if(this.props.location.state.projects_active[i])available = true;
            else{
                cont_inactive++;
                available = false;
            } 

            var students = projects_received[i].members.split(',');
            var sections = [];
            var criterias = [];
            var avaliation = [];

            for(var j=0;j<sections_received[i].length;j++){
                
                sections[j] = sections_received[i][j];

                var sub_topics = [];

                for(var k=0;k<criterias_received[i][j].length;k++){
                    criterias[k] = criterias_received[i][k];
                    sub_topics[k] = new SubTopic(criterias[j][k].name, 0, criterias[j][k].id);
                }
                
                avaliation[j] = new MainlyTopic(sections[j].name,sub_topics);

            }

            var avaliations;
            
            if(sections_received[i].length !== 0)avaliations = new Avaliation(avaliation);
            else avaliations = new Avaliation([new MainlyTopic('',[new SubTopic('',0)])]);
            
            projects[i] = new Project(
                i,projects_received[i].id,
                available,
                projects_received[i].name,
                projects_received[i].class,
                projects_received[i].course,
                students,
                projects_received[i].obs,
                avaliations
            );
        }

        this.state = { 
            enter: false,
            logout: false,
            projects: projects,
            project: null,
            popup: [],
            user_id: this.props.location.state.id
        }

    }

    handleChange_select = (project) => {

        if(project.active){
            this.setState({enter: true, project: project});
        }

    }

    handleChange_ok = () => {
        this.setState({popup: []});
        this.setState({logout: true});
    }

    treat_name = (name) => {
        var name_ = name;
        if(name_.length > 10){
            return name_.substring(0,9) + '...';
        }
        return name_;
    }

    componentDidMount = () => {

        var element = document.getElementsByClassName("rectangule");

        for(var i=0;i<this.props.location.state.projects_active.length;i++){
            
            if(!this.props.location.state.projects_active[i]){
                
                var element_ = element[i].getElementsByClassName("project_name");
                element_[0].style.backgroundImage = "linear-gradient(to right, #00fc08 0%, #aeffb0 98%)";

            }

        }

    }

    render(){

        if (this.state.enter) return <Redirect to={{pathname: "/projects-view-description", state: {
            p: this.state.project, 
            user_id: this.state.user_id, 
            projects: this.state.projects,
            sections: this.props.location.state.sections,
            criterias: this.props.location.state.criterias,
            projects_active: this.props.location.state.projects_active
        }}}/>
        
        if (this.state.logout) return <Redirect to = "/"/>
        
        if(cont_inactive === this.props.location.state.projects.length)this.state.popup = [true];

        return(

            <div className="screen">

                <div className="background">

                    <div className="init_">

                        <div className="projects">

                            <div>

                            {this.state.projects.map((p) => (

                            <div className="rectangule" key={p.name}>

                            <div className="project_name" onClick={this.handleChange_select.bind(this, p)}>
                                <h1>{this.treat_name(p.name)}</h1>
                            </div>

                            <div className="project_class">
                                <h1>{p.class_name}</h1>
                            </div>

                            <div className="project_course">
                                <h1>{p.course}</h1>
                            </div>

                            <div className="students">

                            {p.students.map((s) => (
                                <div className="project_students" key={s}>
                                    <h1>{s}</h1>
                                </div>
                            ))}

                            </div>

                            </div>

                            ))}

                            </div>

                        </div>


                        {this.state.popup.map((i) => (

                            <div className="popup2" key={i}>

                            <div className="close">
                                <h1 onClick={this.handleChange_ok}>X</h1>
                            </div>

                            <div className="msg1">
                                <h1>PARABÉNS</h1>
                            </div>

                            <div className="msg2">
                                <h1>Você concluiu todas as suas fichas de avaliações!</h1>
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