import styled from 'styled-components';
import Form from './Form';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

class EmptyForm{
  constructor(){
    this.name = "";
    this.email = "";
    this.password = "";
    this.confirmPassword = "";
  }
}

export default function SignUp(){
  const [formState, setFormState] = useState(new EmptyForm());

  const confirmPasswordRef = useRef(null);
  return (
    <PageWrapper>
      <Logo>MyWallet</Logo>
      <Form>
        <input 
          required
          type="text"
          placeholder="Nome"
          value={formState.name}
          onChange={(e)=>{
            formState.name = e.target.value;
            setFormState({...formState});
          }}
        />
        <input 
          required
          type="email"
          placeholder="E-mail"
          value={formState.email}
          onChange={(e)=>{
            formState.email = e.target.value;
            setFormState({...formState});
          }}
        />
        <input
          required
          type="password"
          placeholder="Senha"
          value={formState.password}
          onChange={(e)=>{
            formState.password = e.target.value;
            setFormState({...formState});
          }}
        />
        <input
          required
          type = "password"
          placeholder = "Confirme a senha"
          value = {formState.confirmPassword}
          ref = {confirmPasswordRef}
          onChange={(e)=>{
            formState.confirmPassword = e.target.value;
            setFormState({...formState});
            if (formState.password === formState.confirmPassword){
              e.target.setCustomValidity('');
            } else {
              e.target.setCustomValidity('Senhas não coincidem');
            }
          }}
        />
        <button>Entrar</button>
      </Form>
      <Footer><Link to="/login">Já tem uma conta? Entre agora!</Link></Footer>
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



