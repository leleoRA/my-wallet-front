import styled from "styled-components";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import Form from "../components/Form";

class FormState {
  constructor() {
    this.name = "";
    this.email = "";
    this.password = "";
    this.confirmPassword = "";
  }
}

export default function SignUp() {
  const history = useHistory();

  const [formState, setFormState] = useState(new FormState());
  const [isInteractive, setIsInteractive] = useState(true);

  function submitSignup() {
    setIsInteractive(false);
    const body = { ...formState };
    delete body["confirmPassword"];
    axios
      .post("http://localhost:4000/signup", body)
      .then(() => history.push("/"))
      .catch((e) => {
        alert(e);
        setIsInteractive(true);
      });
  }

  return (
    <PageWrapper>
      <Logo>MyWallet</Logo>
      <Form customSubmit={submitSignup}>
        <input
          required
          disabled={!isInteractive}
          type="text"
          placeholder="Nome"
          value={formState.name}
          onChange={(e) => updateFormState(e, formState, setFormState, "name")}
        />
        <input
          required
          disabled={!isInteractive}
          type="email"
          placeholder="E-mail"
          value={formState.email}
          onChange={(e) => updateFormState(e, formState, setFormState, "email")}
        />
        <input
          required
          disabled={!isInteractive}
          type="password"
          placeholder="Senha"
          value={formState.password}
          onChange={(e) =>
            updateFormState(e, formState, setFormState, "password")
          }
        />
        <input
          required
          disabled={!isInteractive}
          type="password"
          placeholder="Confirme a senha"
          value={formState.confirmPassword}
          onChange={(e) => {
            updateFormState(e, formState, setFormState, "confirmPassword");
            if (formState.password === formState.confirmPassword) {
              e.target.setCustomValidity("");
            } else {
              e.target.setCustomValidity("Senhas não coincidem");
            }
          }}
        />
        <button disabled={!isInteractive}>Cadastrar</button>
      </Form>
      <Footer>
        <Link to="/login">Já tem uma conta? Entre agora!</Link>
      </Footer>
    </PageWrapper>
  );
}

function updateFormState(e, state, setState, key) {
  state[key] = e.target.value;
  setState({ ...state });
}

const PageWrapper = styled.div`
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;

  h1 {
    margin-bottom: 24px;
  }

  form {
    margin-bottom: 36px;
  }
`;
const Logo = styled.h1`
  font-size: 32px;
  line-height: 50px;
  font-family: "Saira Stencil One", cursive;
`;

const Footer = styled.footer`
  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
`;
