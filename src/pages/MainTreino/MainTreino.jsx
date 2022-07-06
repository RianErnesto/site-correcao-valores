import React from "react";
import NavBar from "./components/navbar/navbar";
import Table from "./components/table/table";
import AlertContent from "./components/alert/alert";

function MainTreino() {
  const [isDark, setIsDark] = React.useState(true);
  const [link, setLink] = React.useState("Tabela Índices da Poupança");

  document.querySelector("body").style.backgroundColor = isDark ? "#272727" : "#fff";

  function changeDark(childData) {
    setIsDark(childData);
  }

  function changeLink(childData) {
    setLink(childData);
  }

  function activeTab() {
    switch (link) {
      case "Importar Planilha":
        return null;
      case "Tabela Índices da Poupança":
        return <Table isDark={isDark} />;
      case "Sobre":
        return null;
    }
  }

  return (
    <div>
      <NavBar activeTab={link} setActiveTab={changeLink} parentCallback={changeDark} />
      {activeTab()}
    </div>
  );
}

export function CorrigirValor() {
  let data = new Date();
  let ano = data.getFullYear();
  let mes = data.getMonth() + 1 < 10 ? "0" + (data.getMonth() + 1) : data.getMonth() + 1;
  let dia = data.getDate() < 10 ? "0" + data.getDate() : data.getDate();

  const [regraCorrecao, setRegraCorrecao] = React.useState("");
  const [dataInicio, setDataInicio] = React.useState(Date("1991-02-01T00:00:00"));
  const [dataFim, setDataFim] = React.useState(`${ano}-${mes}-${dia}`);
  const [valor, setValor] = React.useState(0);

  const [showError, setShowError] = React.useState(false);

  function setShowFalse(show) {
    setShowError(show);
  }

  function changeRegraCorrecao(e) {
    setRegraCorrecao(e.target.name);
    localStorage.setItem("regraCorrecao", e.target.name);
  }

  function datesChanged(e) {
    
    switch (e.target.name) {
      case "dataInicio":
        let dataInicio = new Date(e.target.value + "T00:00:00");
        let dataFim = new Date(dataFim + "T00:00:00");
        setDataInicio(e.target.value);
        // localStorage.setItem("dataInicio", e.target.value);
        break;
      case "dataFim":
        let dataFim = new Date(e.target.value + "T00:00:00");
        let dataInicio = new Date(dataInicio + "T00:00:00");
        setDataFim(e.target.value);
        // localStorage.setItem("dataFim", e.target.value);
        break;
    }

  }

  return (
    <form>
      <div>
        <label htmlFor="exampleInputEmail1" className="form-label">Data Inicial (DD/MM/AAAA)</label>
        <input type="date" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="dataInicio" onChange={datesChanged} value="1991-02-01"/>
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div>
        <label htmlFor="exampleInputEmail2" className="form-label">Data Final (DD/MM/AAAA)</label>
        <input type="date" className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" name="dataFim" onChange={datesChanged} value={dataFim}/>
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div>
        <label htmlFor="exampleInputEmail3" className="form-label">Valor a ser Corrigido</label>
        <input type="email" className="form-control" id="exampleInputEmail3" aria-describedby="emailHelp" />
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <h5 className="mt-2 mb-2">Regra de correção</h5>
      <div className="form-check mb-2">
        <input className="form-check-input" type="radio" name="nova" id="flexRadioDefault1" checked={localStorage.getItem('regraCorrecao') == "nova" || localStorage.getItem('regraCorrecao') == null} onChange={changeRegraCorrecao}/>
        <label className="form-check-label" htmlFor="nova">
          Nova <em style={{fontSize: "0.8em"}}>(Depósitos a partir de 04/05/2012)</em>
        </label>
      </div>
      <div className="form-check mb-4">
        <input className="form-check-input" type="radio" name="antiga" id="flexRadioDefault2" checked={localStorage.getItem('regraCorrecao') == "antiga"} onChange={changeRegraCorrecao}/>
        <label className="form-check-label" htmlFor="antiga">
          Antiga <em style={{fontSize: "0.8em"}}>(Depósitos até 03/05/2012)</em>
        </label>
      </div>
      <AlertContent show={showError} setShowFalse={setShowFalse}/>
      <button type="submit" className="btn btn-success">Calcular</button>
    </form>
  );
}

export default MainTreino;