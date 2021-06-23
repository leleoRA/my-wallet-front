import styled from "styled-components";
import Form from "./Form";
import { useContext, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import Config from "../helper_functions/Config";
import logOut from "../helper_functions/logOut";

class EmptyForm {
  constructor() {
    this.email = "";
    this.password = "";
  }
}

export default function Login() {
  const [formState, setFormState] = useState(new EmptyForm());
  const history = useHistory();
  const { user, setUser, setLogs } = useContext(UserContext);
  function customSubmit() {
    axios
      .post("http://localhost:4000/login", formState)
      .then(({ data: user }) => {
        console.log(user);
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        const config = new Config(user.token);
        return axios.get("http://localhost:4000/logs", config);
      })
      .then(({ data: logs }) => {
        setLogs(logs);
        history.push("/");
      })
      .catch(err=>{
        if (err?.response?.status === 401){
          passwordRef.current.setCustomValidity("Senha incorreta");
          formRef.current.reportValidity();
        } else if (err?.response?.status === 404) { 
          emailRef.current.setCustomValidity("e-mail não cadastrado");
          formRef.current.reportValidity();        
        } else {
          alert(err);
        }
        logOut(user, setUser, history);
      });
  }

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const formRef = useRef(null);
  return (
    <PageWrapper>
      <Logo>MyWallet</Logo>
      <Form ref={formRef} customSubmit={customSubmit}>
        <input
          required
          ref={emailRef}
          type="email"
          placeholder="E-mail"
          value={formState.email}
          onChange={(e) => {
            emailRef.current.setCustomValidity("");
            formState.email = e.target.value;
            setFormState({ ...formState });
          }}
        />
        <input
          required
          type="password"
          placeholder="Senha"
          value={formState.password}
          ref={passwordRef}
          onChange={(e) => {
            passwordRef.current.setCustomValidity("");
            formState.password = e.target.value;
            setFormState({ ...formState });
          }}
        />
        <button>Entrar</button>
      </Form>
      <Footer>
        <Link to="/signup">Primeira vez? Cadastre-se!</Link>
      </Footer>
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
