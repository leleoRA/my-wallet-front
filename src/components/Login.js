import styled from 'styled-components';
import Form from './Form';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home(){
  const [formState, setFormState] = useState({email:"",password:""});

  return (
    <PageWrapper>
      <Logo>MyWallet</Logo>
      <Form>
        <input 
          type="email"
          placeholder="E-mail"
          value={formState.email}
          onChange={(e)=>{
            formState.email = e.target.value;
            setFormState({...formState});
          }}
        />
        <input
          type="password"
          placeholder="senha"
          value={formState.password}
          onChange={(e)=>{
            formState.password = e.target.value;
            setFormState({...formState});
          }}
        />
        <button>Entrar</button>
      </Form>
      <Footer><Link to="/">Primeira vez? Cadastre-se!</Link></Footer>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;

  h1{
    margin-bottom: 24px;
  }

  form{
    margin-bottom: 36px;
  }
`
const Logo = styled.h1`
  font-size: 32px;
  line-height: 50px;
  font-family: 'Saira Stencil One', cursive;
`;

const Footer = styled.footer`
  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
`;



