import React from "react";
import PopoverContent from "../popover/popover";
import ModalContent from "../modal/modal";
import "../../../../_assets/css/slider/slider.css";
import { apiFrom2012 } from "../../../../services/api";

function NavBar(props) {
  function onTrigger() {
    props.parentCallback(!props.isDark);
  }

  function onChangeTab(e) {
    switch(e.currentTarget.textContent) {
      case "Importar Planilha":
        props.setActiveTab(e.currentTarget.textContent);
        break;
      case "Tabela Índices da Poupança":
        props.setActiveTab(e.currentTarget.textContent);
        break;
      case "Sobre":
        props.setActiveTab(e.currentTarget.textContent);
        break;
    }
  }

  const titleNavBar = "Zenith Correção de Valores";

  return (
    <nav
      className={`navbar navbar-expand-lg bg-${props.isDark ? "dark navbar-dark" : "light"
        }`}
    >
      <div className="container-fluid">
        {titleNavBar ? (
          <span className={"navbar-brand mb-0 h1"}>
            {titleNavBar}
          </span>
        ) : null}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <NavBarItems activeTab={props.activeTab} onChangeTab={onChangeTab} isDark={props.isDark} />
          </ul>
          <SliderDarkMode isDark={props.isDark} setIsDark={onTrigger} />
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className={`btn btn-success`} type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

function NavBarItems(props) {
  const [indice, setIndice] = React.useState(0);

  apiFrom2012.get('/').then(response => {
    setIndice(response.data[response.data.length - 1].valor);
  }
  ).catch(error => {
    setDataTable([]);
    console.log(error);
  }
  ).finally(() => {
  }
  );

  return (
    <>
      <li className="nav-item">
        <NormalLink active={props.activeTab == "Importar Planilha"} onChangeTab={props.onChangeTab} href="#" text="Importar Planilha" />
      </li>
      <li className="nav-item">
        <PopoverLink onChangeTab={props.onChangeTab}  href="#" text="Índice da Poupança" isDark={props.isDark} indice={indice} />
      </li>
      <li className="nav-item">
        <NormalLink active={props.activeTab == "Tabela Índices da Poupança"} onChangeTab={props.onChangeTab}  href="#" text="Tabela Índices da Poupança" />
      </li>
      <li className="nav-item">
        <ModalLink onChangeTab={props.onChangeTab}  href="#" text="Corrigir Valor" isDark={props.isDark}/>
      </li>
      <li className="nav-item">
        <NormalLink active={props.activeTab == "Sobre"} onChangeTab={props.onChangeTab}  href="#" text="Sobre" />
      </li>
    </>
  );
}

function NormalLink(props) {
  return (
    <a onClick={props.onChangeTab} className={`nav-link ${props.active ? "active" : null}`} href={props.href}>{props.text}</a>
  );
}

function PopoverLink(props) {
  return (
    <PopoverContent title="Índice atual da Poupança" content={props.indice} position="bottom" isDark={props.isDark}>
      <a onClick={props.onChangeTab} className={`nav-link ${props.active ? "active" : null}`} href={props.href}>{props.text}</a>
    </PopoverContent>
  );
}

function ModalLink(props) {
  const [modalShow, setModalShow] = React.useState(false);

  const titleModal = "Correção de Valor";

  return (
    <ModalContent modalShow={modalShow} setModalShow={setModalShow} title={titleModal} isDark={props.isDark}>
      <a className={`nav-link ${props.active ? "active" : null}`} href={props.href} onClick={(e) => {setModalShow(true); props.onChangeTab(e)}}>{props.text}</a>
    </ModalContent>
  );
}

function SliderDarkMode(props) {
  return (
    <div className="form-check form-switch form-check-reverse me-5">
      <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={props.isDark} onChange={props.setIsDark} />
      <label className={`form-check-label text-${props.isDark ? "light" : "dark"}`} htmlFor="flexSwitchCheckChecked">Modo Escuro</label>
    </div>
  );
}


export default NavBar;
