import React from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import '../../../../_assets/css/modal/modal.css';
import { CorrigirValor } from "../../../../pages/MainTreino/MainTreino";
import { ShowValor } from "../../../../pages/MainTreino/MainTreino";

function ModalCalculate(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className={`custom-modal-${props.isDark ? "dark" : "light"}`}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CorrigirValor setCurrentModal={props.setCurrentModal} isDark={props.isDark} />
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn btn-success" onClick={props.onHide}>Fechar</Button>
            </Modal.Footer>
        </Modal>
    );
}

function ModalResults(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className={`custom-modal-${props.isDark ? "dark" : "light"}`}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ShowValor setCurrentModal={props.setCurrentModal}/>
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn btn-success" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

function ModalContent(props) {
    const [currentModal, setCurrentModal] = React.useState(false);
    React.useEffect(() => {
       setCurrentModal(false);
    }, []
    ); 

    function changeCurrentModal() {
        setCurrentModal(!currentModal);
    }

    function handleHide() {
        props.setModalShow(false);
    }
    return (
        <>
            {props.children}

            {currentModal ? 
                <ModalResults title={props.title} isDark={props.isDark} show={props.modalShow} onHide={() => handleHide()} setCurrentModal={changeCurrentModal} /> : 
                <ModalCalculate title={props.title} isDark={props.isDark} show={props.modalShow} onHide={() => handleHide()} setCurrentModal={changeCurrentModal}/>
            }
        </>
    );
}

export default ModalContent;