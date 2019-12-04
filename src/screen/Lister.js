import React from 'react';
import addSymbol from '../css/assets/add-symbol.png';
import '../css/Lister.css';
import * as db from '../db/Table';



class Search extends React.Component {
  render() {
    return (
      <div className='search-projects'>
        <h2 className='topic'>Pesquisar {db[this.props.data].name}</h2>
        <input className='searcher' type='text'></input>
        <button style={{display: 'inline'}}>Q</button>
      </div>
    );
  }
}

export class Add extends React.Component {
  handleClick() {

  }
  
  renderDialog() {
    return (<h2 className='topic' id="search">Adicionar {db[this.props.data].name}</h2>);
  }

  render () {
    return (
      <div>
        {this.renderDialog()}
        <button className='add'><img alt="add" src={addSymbol}></img></button>
      </div>
    )
  }
}

function List(props) {
  const values = db[props.data].tables().map(
    (value) => {
      return (
        <tr key={value[props.data.key]}>
          {db[props.data].types.map(
            att => <td key={att.toString()}> {value[att]} </td>
          )}
          <td><button>E</button></td>
        </tr>
      );
  });
  const header = db[props.data].header.map(
    (column) => <th>{column}</th>
  );
  return (
    <div>
      <table>
        <thead><tr>{header}</tr></thead>
        <tbody>{values}</tbody>
      </table>
    </div>
  );
}
function Project(props) {
  return (
    <div className="Lister">
      <h1>{db[props.name].name}</h1>
      <Search data={props.name}/>
      <Add data={props.name}/>
      <List data={props.name}/>
    </div>
  );
}

export default Project;
