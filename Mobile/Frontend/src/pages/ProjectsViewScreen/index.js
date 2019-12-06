import React from "react";
import { Redirect } from "react-router";

import "./styles.css";
import "../styles.css";

class Project {
    constructor(
        active_,
        name_,
        class_name_,
        course_,
        students_,
        observations_,
        avaliations_
    ){
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
    constructor(title_, ponctuation_){
        this.title = title_;
        this.ponctuation = ponctuation_; 
    }
}

export default class InitScreen extends React.Component {

    constructor(props){
        super(props);

        var cont = 5;
        var projects = [];
        for(var i=1;i<=cont;i++){
            var students = [
                'Aluno ' + (i*10+1),
                'Aluno ' + (i*10+2),
                'Aluno ' + (i*10+3) 
            ];
            //var observations = 'Teste';
            var observations = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum';
            var avaliations = 
                new Avaliation(
                    [
                        new MainlyTopic(
                            "Projeto e pesquisa",
                            [
                                new SubTopic(
                                    "Delimitação clara do problema",
                                    0.0
                                ),new SubTopic(
                                    "Metodologia/Coleta de dados/Análise",
                                    0.0
                                ),new SubTopic(
                                    "Relevância social/Aplicabilidade da solução",
                                    0.0
                                ),new SubTopic(
                                    "Inovação e Originalidade",
                                    0.0
                                )
                            ]
                        ),new MainlyTopic(
                            "Apresentação",
                            [
                                new SubTopic(
                                    "Oralidade",
                                    0.0
                                ),new SubTopic(
                                    "Apresentação do Banner",
                                    0.0
                                ),new SubTopic(
                                    "Apresentação Visual/Stand",
                                    0.0
                                ),new SubTopic(
                                    "Funcionamento do protótipo",
                                    0.0
                                )
                            ]
                        )
                    ]
                );
            projects[i] = new Project(
                true,
                'Projeto ' + i,
                '1AA',
                'Abcdef',
                students,
                observations,
                avaliations
            );
        }

        this.state = {
            projects: projects, 
            enter: false,
            project: null,
            logout: false,
            popup: [],
            is_posible: true
        }
        
    }

    handleChange_select = (project) => {
        //var element = document.getElementsByClassName("rectangule");
        //var element_ = element[0].getElementsByClassName("project_name");
        //element_[0].style.backgroundImage = "linear-gradient(to right, #00fc08 0%, #aeffb0 98%)";
        if(this.state.is_posible){
            this.setState({enter: true, project: project});
        }
        else {
            this.setState({popup: [true]});
        }
    }

    handleChange_ok = () => {
        this.setState({logout: true});
    }

    render(){

        if (this.state.enter) return <Redirect to={{pathname: "/projects-view-description", state: {p: this.state.project}}}/>
        
        if (this.state.logout) return <Redirect to = "/"/>

        return(

            <div className="screen">

                <div className="background">

                    <div className="init_">

                        <div className="projects">

                            <div>

                            {this.state.projects.map((p) => (

                            <div className="rectangule" key={p.name}>

                            <div className="project_name" onClick={this.handleChange_select.bind(this, p)}>
                                <h1>{p.name}</h1>
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