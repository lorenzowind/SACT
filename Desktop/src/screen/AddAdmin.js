import React from 'react';
import  '../css/AddAdmin.css';
import sair from '../css/assets/exit.png';
import adm from '../css/assets/admin.png';


function Header() {
  return (
      <table align ="center" style={{width:"100%"}}>
        <tr>
          <td align="left">
            <div align="left">
              <img src={sair} id="admIcon" ></img> 
            </div>
          </td>
          <td align = "center" style={{width:"70%"}}>
            <div align="center">
              <h3 align="center">
                <u>Cadastro de Administrador</u>
              </h3>
            </div>
          </td>
          <td>
            <div align="right">
              <div className="loginInfo">
                logout
                <a2><img src={adm} style={{width:"20%"}}></img></a2>
                ADM   
              </div>
            </div> 
          </td>
        </tr> 
      </table>
  );
}

function Content() {
  return (
      <table align = "center" >
        <tr>
          <td>
            <h4> 1. Nome </h4>
            <input type="text" name="Nome" placeholder = "Nome" /> 
          </td>
          <td>
            <h4> 3. CPF </h4>
            <input type="text" name="cpf" placeholder="CPF"/> 
          </td>
        </tr>
        
        <tr>
          <td> 
            <h4> 2. Area de Atuação </h4>
            <div id="checkboxes">
              <input type="checkbox" name="info"   /> Informática <br />
              <input type="checkbox" name="meca"   /> Mecatrônica <br />
              <input type="checkbox" name="eletro" /> Eletronica  <br />
            </div>
          </td>
        
          <td>
            <h4 className="remargin" > 4. RA</h4>
            <input type="text" name="ra" placeholder=" 123456" />
          </td>
        </tr>
        <tr>
          <td />
          <td>
            <h4 className="remargin" > 3. Senha </h4>
            <input type="text" name="senha" placeholder=" 123456"/>
          </td>
        </tr>
        <tr>
          <td></td>
          <td align ="right">
            <div className="button">
              <input type="button"name="login" id="login" value="Login"></input>
            </div>
          </td>
        </tr>
      </table>
  );
}

function AddAdmin() {
  return (
    <div className="App">
      <Header />
      <Content />
    </div>
    );
}

export default AddAdmin;
