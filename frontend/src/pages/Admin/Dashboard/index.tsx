import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import HeaderAdm from '../../../components/Header';

import TrofeuImg from '../../../assets/icon_trophy.png';
import RelatorioImg from '../../../assets/icon_document.png';
import InformacoesImg from '../../../assets/icon_info.png';
import DownloadImg from '../../../assets/icon_download.png';
import CertoImg from '../../../assets/icon_check.png';

import {
  Background,
  Container,
  Content,
  Ranking,
  Relatorio,
  ListNames,
  ListIcones,
  DonwloadsDiv,
  Fichas,
  Avaliadores,
  Informacoes,
  ButtonHidden,
  Popup,
  ListAvaliadores,
  ItemAvaliador,
} from './styles';

const Dashboard: React.FC = () => {
  const [hiddenPopup, setHiddenPopup] = useState(true);

  function hiddenAlert() {
    setHiddenPopup(!hiddenPopup);
  }
  return (
    <Background>
      <Container>
        <HeaderAdm isAuthenticated />
        <Content>
          {!hiddenPopup ? (
            <Popup>
              <div style={{ width: '100%', color: '#0004ff' }}>
                <ButtonHidden onClick={hiddenAlert}>X</ButtonHidden>
              </div>
              <h1
                style={{
                  color: '#0004ff',
                  fontSize: '24pt',
                  textAlign: 'center',
                }}
              >
                Andamento dos Avaliadores
              </h1>

              <ListAvaliadores>
                <ItemAvaliador style={{ justifyContent: 'space-between' }}>
                  <h1
                    style={{
                      justifySelf: 'start',
                      textAlign: 'left',
                      alignItems: 'center',
                    }}
                  >
                    Fulano
                  </h1>
                  <h1
                    style={{
                      justifySelf: 'end',
                      color: ' #707070',
                      textAlign: 'center',
                      fontWeight: 'normal',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    5/5{' '}
                    <img
                      src={CertoImg}
                      alt="Correto"
                      style={{ width: '25px', height: '25px' }}
                    />
                  </h1>
                </ItemAvaliador>
                <ItemAvaliador style={{ justifyContent: 'space-between' }}>
                  <h1
                    style={{
                      justifySelf: 'start',
                      textAlign: 'left',
                      alignItems: 'center',
                    }}
                  >
                    Fulano
                  </h1>
                  <h1
                    style={{
                      justifySelf: 'end',
                      color: ' #707070',
                      textAlign: 'center',
                      fontWeight: 'normal',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    5/5{' '}
                    <img
                      src={CertoImg}
                      alt="Correto"
                      style={{ width: '25px', height: '25px' }}
                    />
                  </h1>
                </ItemAvaliador>
                <ItemAvaliador style={{ justifyContent: 'space-between' }}>
                  <h1
                    style={{
                      justifySelf: 'start',
                      textAlign: 'left',
                      alignItems: 'center',
                    }}
                  >
                    Fulano
                  </h1>
                  <h1
                    style={{
                      justifySelf: 'end',
                      color: ' #707070',
                      textAlign: 'center',
                      fontWeight: 'normal',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    5/5{' '}
                    <img
                      src={CertoImg}
                      alt="Correto"
                      style={{ width: '25px', height: '25px' }}
                    />
                  </h1>
                </ItemAvaliador>
                <ItemAvaliador style={{ justifyContent: 'space-between' }}>
                  <h1
                    style={{
                      justifySelf: 'start',
                      textAlign: 'left',
                      alignItems: 'center',
                    }}
                  >
                    Fulano
                  </h1>
                  <h1
                    style={{
                      justifySelf: 'end',
                      color: ' #707070',
                      textAlign: 'center',
                      fontWeight: 'normal',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    5/5{' '}
                    <img
                      src={CertoImg}
                      alt="Correto"
                      style={{ width: '25px', height: '25px' }}
                    />
                  </h1>
                </ItemAvaliador>
                <ItemAvaliador style={{ justifyContent: 'space-between' }}>
                  <h1
                    style={{
                      justifySelf: 'start',
                      textAlign: 'left',
                      alignItems: 'center',
                    }}
                  >
                    Fulano
                  </h1>
                  <h1
                    style={{
                      justifySelf: 'end',
                      color: ' #707070',
                      textAlign: 'center',
                      fontWeight: 'normal',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    5/5{' '}
                    <img
                      src={CertoImg}
                      alt="Correto"
                      style={{ width: '25px', height: '25px' }}
                    />
                  </h1>
                </ItemAvaliador>
                <ItemAvaliador style={{ justifyContent: 'space-between' }}>
                  <h1
                    style={{
                      justifySelf: 'start',
                      textAlign: 'left',
                      alignItems: 'center',
                    }}
                  >
                    Fulano
                  </h1>
                  <h1
                    style={{
                      justifySelf: 'end',
                      color: ' #707070',
                      textAlign: 'center',
                      fontWeight: 'normal',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    5/5{' '}
                    <img
                      src={CertoImg}
                      alt="Correto"
                      style={{ width: '25px', height: '25px' }}
                    />
                  </h1>
                </ItemAvaliador>
                <ItemAvaliador style={{ justifyContent: 'space-between' }}>
                  <h1
                    style={{
                      justifySelf: 'start',
                      textAlign: 'left',
                      alignItems: 'center',
                    }}
                  >
                    Fulano
                  </h1>
                  <h1
                    style={{
                      justifySelf: 'end',
                      color: ' #707070',
                      textAlign: 'center',
                      fontWeight: 'normal',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    5/5{' '}
                    <img
                      src={CertoImg}
                      alt="Correto"
                      style={{ width: '25px', height: '25px' }}
                    />
                  </h1>
                </ItemAvaliador>
              </ListAvaliadores>
            </Popup>
          ) : (
            ''
          )}
          <Ranking>
            <Link to="/ranking">
              <img src={TrofeuImg} alt="Trofeu" height={155} />
              <footer>Ranking</footer>
            </Link>
          </Ranking>
          <Relatorio>
            <div id="group-icon">
              <img src={RelatorioImg} alt="Relatório" height={50} />
              Relatórios
            </div>
            <hr />

            <DonwloadsDiv>
              <ListNames>
                <li>Relatório ranking geral </li>
                <li>Relatório ranking por curso </li>
                <li>Relatório ranking por nota </li>
              </ListNames>
              <ListIcones>
                <li>
                  <img src={DownloadImg} alt="Download" height={35} />
                </li>
                <li>
                  <img src={DownloadImg} alt="Download" height={35} />
                </li>
                <li>
                  <img src={DownloadImg} alt="Download" height={35} />
                </li>
              </ListIcones>
            </DonwloadsDiv>
          </Relatorio>
          <Fichas>
            <div>
              <h1>32</h1>
              <h2>/50</h2>
            </div>
            <footer>Fichas já avaliadas</footer>
          </Fichas>
          <Avaliadores onClick={hiddenAlert}>
            <div>
              <h1>10</h1>
              <h2>/40</h2>
            </div>
            <footer>Avaliadores já concluiram</footer>
          </Avaliadores>
          <Informacoes>
            <div id="group-icon">
              <img src={InformacoesImg} alt="Informaçoes" height={50} />
              Informações
            </div>
            <hr />
            <ul>
              <li>
                <Link to="/evaluators">Avaliadores</Link>
              </li>
              <li>
                <Link to="/projects">Projetos</Link>
              </li>
              <li>
                <Link to="/avaliations">Fichas de Avaliação</Link>
              </li>
              <li>
                <Link to="/admins">Administradores</Link>
              </li>
            </ul>
          </Informacoes>
        </Content>
      </Container>
    </Background>
  );
};

export default Dashboard;
