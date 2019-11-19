import React from 'react';
import './Project.css';
import * as db from './db/ProjectTable';

class SearchProject extends React.Component {
  
  render() {
    return (
      <div className='search-projects'>
        <h2 className='topic'>Pesquisar Projetos</h2>
        <input className='searcher' type='text'></input>
        <button style={{display: 'inline'}}>Q</button>
      </div>
    );
  }
}



class AddProjects extends React.Component {
  
  handleClick() {

  }
  
  render () {
    return (
      <div>
        <h2 className='topic' style={{display: 'inline'}}>Adicionar Projetos</h2>
        <button >+</button>
      </div>
    )
  }
}

function ListProject() {
  const data = db.tablesProject().map(
    (obj) => {
      console.log(obj.id);
      return (
        <tr key={obj.id}>
          <td>{obj.project}</td>
          <td>{obj.area}</td>
          <td>{obj.integrantes}</td>
          <td>{obj.turma}</td>
          <td><button>E</button></td>
        </tr>
      );
  });
  
  return (
    <div>
      <table>
        <tr>
          <th>Projeto</th>
          <th>Área de Atuação</th>
          <th>Integrantes</th>
          <th>Turma</th>
          <th />
        </tr>
      </table>
      <table>{data}</table>
    </div>
  );
}
function Project() {
  return (
    <div>
      <SearchProject />
      <AddProjects />
      <ListProject />
    </div>
  );
}

export default Project;
