import React from "react";
import NavBar from "./components/navbar/navbar";
import Table from "./components/table/table";

function MainTreino() {
  const [isDark, setIsDark] = React.useState(true);
  const [link, setLink] = React.useState("TodosIndices");

  document.querySelector("body").style.backgroundColor = isDark ? "#272727" : "#fff";

  function changeDark(childData) {
    setIsDark(childData);
  }

  function changeLink(childData) {
    setLink(childData);
  }

  return (
    <div>
      <NavBar parentCallback={changeDark} />
      <Table isDark={isDark} />
    </div>
  );
}

export function CorrigirValor() {
  const [regraCorrecao, setRegraCorrecao] = React.useState("");

  function changeRegraCorrecao(e) {
    setRegraCorrecao(e.target.name);
    localStorage.setItem("regraCorrecao", e.target.name);
  }

  return (
    <form>
      <div>
        <label htmlFor="exampleInputEmail1" className="form-label">Data Inicial (DD/MM/AAAA)</label>
        <input type="date" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div>
        <label htmlFor="exampleInputEmail2" className="form-label">Data Final (DD/MM/AAAA)</label>
        <input type="date" className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" />
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
      <button type="submit" className="btn btn-success">Calcular</button>
    </form>
  );
}

export default MainTreino;