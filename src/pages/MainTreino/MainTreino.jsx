import React from "react";
import NavBar from "./components/navbar/navbar";
import Table from "./components/table/table";
import AlertContent from "./components/alert/alert";
import AccordionContent from "./components/accordion/accordion";

function MainTreino() {
  const [isDark, setIsDark] = React.useState(true);
  const [link, setLink] = React.useState("");

  document.querySelector("body").style.backgroundColor = isDark ? "#272727" : "#fff";

  function onPageLoad() {
    setIsDark(localStorage.getItem("isDark") === "true");
    localStorage.getItem("link") == null ? setLink("Tabela Índices da Poupança") : setLink(localStorage.getItem("link"));
  }

  function changeDark(childData) {
    localStorage.setItem("isDark", childData);
    setIsDark(childData);
  }

  function changeLink(childData) {
    localStorage.setItem("link", childData);
    setLink(childData);
  }

  function activeTab() {
    switch (link) {
      case "Importar Planilha":
        return null;
      case "Tabela Índices da Poupança":
        return <Table isDark={isDark} />;
      case "Sobre":
        return <Sobre isDark={isDark} />;
    }
  }

  window.onload = onPageLoad;

  return (
    <div>
      <NavBar isDark={isDark} activeTab={link} setActiveTab={changeLink} parentCallback={changeDark} />
      {activeTab()}
    </div>
  );
}

export function ShowValor(props) {
  return (
    <form>
      <div>
        <label htmlFor="exampleInputEmail1" className="form-label">Texto Teste</label>
        <input type="text" readOnly className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="dataInicio" value={"Texto Teste"} />
      </div>
      <div>
        <label htmlFor="exampleInputEmail2" className="form-label">Texto Teste 2</label>
        <input type="text" readOnly className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" name="dataFim" value={"Texto Teste 2"} />
      </div>
      <div>
        <label htmlFor="exampleInputEmail3" className="form-label">Texto Teste 3</label>
        <input type="text" readOnly className="form-control" id="exampleInputEmail3" aria-describedby="emailHelp" />
      </div>
      <button type="submit" className="btn btn-success" onClick={() => props.setCurrentModal()}>Voltar</button>
    </form>
  );
}

export function CorrigirValor(props) {
  let data = new Date();
  let ano = data.getFullYear();
  let mes = data.getMonth() + 1 < 10 ? "0" + (data.getMonth() + 1) : data.getMonth() + 1;
  let dia = data.getDate() < 10 ? "0" + data.getDate() : data.getDate();

  const [regraCorrecao, setRegraCorrecao] = React.useState("");
  const [dataInicio, setDataInicio] = React.useState("1991-02-01");
  const [dataFim, setDataFim] = React.useState(`${ano}-${mes}-${dia}`);
  const [valor, setValor] = React.useState(0);

  const [showError, setShowError] = React.useState(false);
  const [errorTitle, setErrorTitle] = React.useState("Erro de Validação");
  const [errorMessage, setErrorMessage] = React.useState("");

  React.useEffect(() => {
    localStorage.getItem("dataInicio") !== null && setDataInicio(localStorage.getItem("dataInicio"));
    localStorage.getItem("dataFim") !== null && setDataFim(localStorage.getItem("dataFim"));
    localStorage.getItem("valor") !== null && setValor(localStorage.getItem("valor"));
    localStorage.getItem("regraCorrecao") !== null && setRegraCorrecao(localStorage.getItem("regraCorrecao"));
  }
    , []);

  function setShowFalse(show) {
    setShowError(show);
  }

  function calcular(e) {
    e.preventDefault();
    if (dataInicio > dataFim) {
      setErrorMessage("Data Inicial não pode ser maior que a Data Final");
      setShowError(true);
      return;
    }
    if (dataInicio < "1991-02-01") {
      setErrorMessage("Data Inicial não pode ser anterior a 01/02/1991");
      setShowError(true);
      return;
    }

    props.setCurrentModal();
    localStorage.removeItem("dataInicio");
    localStorage.removeItem("dataFim");
    localStorage.removeItem("valor");
    localStorage.removeItem("regraCorrecao");
  }

  function datesChanged(e) {
    let dataDeInicio;
    let dataDeFim;

    switch (e.target.name) {
      case "dataInicio":
        dataDeInicio = new Date(e.target.value + "T00:00:00");
        dataDeFim = new Date(dataFim + "T00:00:00");
        if (dataDeInicio < new Date("2012-05-04T00:00:00")) {
          setRegraCorrecao("antiga");
          localStorage.setItem("regraCorrecao", "antiga");
        }
        else {
          localStorage.setItem("regraCorrecao", "nova");
          setRegraCorrecao("nova");
        }
        setDataInicio(e.target.value);
        localStorage.setItem("dataInicio", e.target.value);
        break;
      case "dataFim":
        dataDeFim = new Date(e.target.value + "T00:00:00");
        dataDeInicio = new Date(dataInicio + "T00:00:00");

        setDataFim(e.target.value);
        localStorage.setItem("dataFim", e.target.value);
        break;
    }

  }

  return (
    <form>
      <div>
        <label htmlFor="exampleInputEmail1" className="form-label">Data Inicial (DD/MM/AAAA)</label>
        <input type="date" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="dataInicio" onChange={datesChanged} value={dataInicio} />
      </div>
      <div>
        <label htmlFor="exampleInputEmail2" className="form-label">Data Final (DD/MM/AAAA)</label>
        <input type="date" className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" name="dataFim" onChange={datesChanged} value={dataFim} />
      </div>
      <div>
        <label htmlFor="exampleInputEmail3" className="form-label">Valor a ser Corrigido</label>
        <input type="number" step="10" className="form-control" id="exampleInputEmail3" aria-describedby="emailHelp" />
      </div>
      <AccordionContent isDark={props.isDark} />
      <AlertContent show={showError} setShowFalse={setShowFalse} title={errorTitle} message={errorMessage} />
      <button type="submit" className="btn btn-success" onClick={calcular}>Calcular</button>
    </form>
  );
}

function Sobre(props) {
  return (
    <div className={`container-fluid text-${props.isDark ? "white" : "dark"} text-center mt-5`}>
      <h1>Sobre a página Correção de Valores</h1>
      <div className="d-flex justify-content-around mt-5 mb-5">
        <div style={{ maxWidth: "45%" }}>O site foi feito para ajudar a fazer a conversão de valores depositados na cobrança em cima do índice de juros divulgado pelo Banco Central do Brasil. O primeiro valor registrado do índice data de 01 de Fevereiro de 1991, por conta disso a data inicial para cálculo de correção deve ser dessa mesma data. O sistema permite a conversão de cruzeiro para cruzeiro-real e de cruzeiro-real para nossa moeda atual, visto que a conversão é importante para o cálculo do juros em cima das moedas. Destaca-se que o sistema encontra-se na sua versão inicial, então é possível que hajam erros e bugs pelo site, nesse caso favor entrar em contato por e-mail com o desenvolvedor para tratar de solucionar o erro.</div>
        <div className="vr"></div>
        <div style={{ maxWidth: "45%" }}>Este site foi desenvolvido pelo programador Rian Ernesto e é administrado pelos sócios da <a href="https://google.com" target="_blank">Zenith One Innovation</a>, uma startup de soluções tecnológicas recente no mercado. As tecnologias utilizadas na construção do site foram o framework ReactJs para Javascript, e a biblioteca Bootstrap.</div>
      </div>
      <div className="w-100">
        <div className="btn-group w-25" role="group" aria-label="Basic example">
          <a type="button" className="btn btn-secondary" href="mailto:rianernesto9@gmail.com"><img src="src/_assets/icons/envelope.svg" alt="email" /></a>
          <a type="button" className="btn btn-secondary" href="https://github.com/RianErnesto" target="_blank"><img src="src/_assets/icons/github.svg" alt="github" /></a>
          <a type="button" className="btn btn-secondary"><img src="src/_assets/icons/instagram.svg" alt="instagram" /></a>
          <a type="button" className="btn btn-secondary" href="https://www.linkedin.com/in/rian-leao-35a0321a0/" target="_blank"><img src="src/_assets/icons/linkedin.svg" alt="linkedin" /></a>
        </div>
      </div>
      <img src="src/_assets/img/Zenith.png" className="rounded mt-5" alt="..." />
    </div>
  );
}

export default MainTreino;