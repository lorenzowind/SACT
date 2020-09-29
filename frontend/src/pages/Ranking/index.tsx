import React from 'react';
import HeaderAdm from '../../components/HeaderAdm';
import ContainerRanking from '../../components/ContainerRanking';
import BackImg from '../../assets/images/Back/Back.png';

import TrofeuImg from '../../assets/images/Trofeu/Trofeu.png';

import { Link } from 'react-router-dom';

import { Container, Content, RankingGrid, RankingGeral } from './styles';

const Ranking: React.FC = () => {
  return (
    <Container>
      <HeaderAdm isAuthenticated={true} />
      <Content>
        <Link
          to="/dashboard"
          style={{
            gridArea: 'back',
            height: 71,

            cursor: 'pointer',
            marginTop: 10,
          }}
        >
          <img src={BackImg} alt="Voltar" height={71} />
        </Link>

        <RankingGrid>
          <RankingGeral>
            <h1>Ranking Geral</h1>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img src={TrofeuImg} alt="Troféu" height={133} />

              <ul>
                <li>1° Projeto 1</li>
                <li>2° Projeto 2</li>
                <li>3° Projeto 3</li>
              </ul>
            </div>
          </RankingGeral>

          <ContainerRanking
            courser={'Informática'}
            firstProject={'Projeto 1'}
            secondProject={'Projeto 2'}
            thirdProject={'Projeto 3'}
            sigla={'info'}
            spaceTop={75}
          />
          <ContainerRanking
            courser="Mecatrônica"
            firstProject={'Projeto 1'}
            secondProject={'Projeto 2'}
            thirdProject={'Projeto 3'}
            sigla={'meca'}
            spaceTop={45}
          />
          <ContainerRanking
            courser="Eletrônica"
            firstProject={'Projeto 1'}
            secondProject={'Projeto 2'}
            thirdProject={'Projeto 3'}
            sigla={'eletro'}
            spaceTop={45}
          />
        </RankingGrid>
      </Content>
    </Container>
  );
};

export default Ranking;
