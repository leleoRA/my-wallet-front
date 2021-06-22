import styled from 'styled-components';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import {RiLogoutBoxRLine} from 'react-icons/ri'
import {AiOutlinePlusCircle, AiOutlineMinusCircle} from 'react-icons/ai';

export default function Home(){
  const {userFirstName} = useContext(UserContext);
  const [entries, setEntries] = useState([]);
  return (
    <PageWrapper>
      <Header>
        <p>Olá, {userFirstName}</p>
        <RiLogoutBoxRLine />
      </Header>
      <Main>
        {
          entries.length === 0 
          ? <Overlay><p>Não há registros de<br/>entrada ou saída</p></Overlay>
          : <p></p>
        }
      </Main>
      <Footer>
        <AnchorButton>
          <AiOutlinePlusCircle size="22"/>
          <p>Nova<br/>entrada</p>
        </AnchorButton>
        <AnchorButton>
          <AiOutlineMinusCircle size="22"/>
          <p>Nova<br/>saída</p>
        </AnchorButton>
      </Footer>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  padding: 25px 25px 16px 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;

  header{
    margin-bottom: 24px;
  }

  main{
    margin-bottom: 13px;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 26px;
  font-weight: bold;
  line-height: 30px;
  width: 100%;
  height: 30px;
`;

const Main = styled.main`
  width: 100%;
  background-color: white;
  border-radius: 5px;
  position: relative;
  height: calc(100vh - 25px - 30px - 24px - 13px - 114px - 16px);
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  color: #868686;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 20px;
  line-height: 23px;
`;

const Footer = styled.footer`
  display: flex;
  width: 100%;
  gap: 15px;
`;

const AnchorButton = styled(Link)`
  height: 114px;
  flex: 1 1 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  font-size: 17px;
  line-height: 20px;
  border-radius: 5px;
  background-color: #A328D6;
  font-weight: bold;
`;

