import styled from 'styled-components';
import Form from './Form';
import { useState } from 'react';
import { Link } from 'react-router-dom';

class EmptyForm{
  constructor(){
    this.value = "";
    this.description = "";
  }
}

export default function NewExpenditure(){
  const [formState, setFormState] = useState(new EmptyForm());

  return (
    <PageWrapper>
      <Header>
        <p>Nova saída</p>
      </Header>
      <Form>
        <input 
          required
          type="number"
          min="0"
          placeholder="Valor"
          value={formState.email}
          onChange={(e)=>{
            formState.email = e.target.value;
            setFormState({...formState});
          }}
        />
        <input
          required
          type="text"
          placeholder="Descrição"
          value={formState.password}
          onChange={(e)=>{
            formState.password = e.target.value;
            setFormState({...formState});
          }}
        />
        <button>Salvar saída</button>
      </Form>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  padding: 25px 25px 16px 25px;
  min-height: 100vh;
  width: 100%;

  header{
    margin-bottom: 35px;
  }

  form{
    margin-bottom: 36px;
  }
`;

const Header = styled.header`
  font-size: 26px;
  font-weight: bold;
  line-height: 30px;
  width: 100%;
  height: 30px;
`;
