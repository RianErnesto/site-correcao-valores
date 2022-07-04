import React from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import '../../../../_assets/css/modal/modal.css';
import { CorrigirValor } from "../../../../pages/MainTreino/MainTreino";

function MyVerticallyCenteredModal(props) {
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
                <CorrigirValor />
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn btn-success" onClick={props.onHide}>Fechar</Button>
            </Modal.Footer>
        </Modal>
    );
}

function ModalContent(props) {
    return (
        <> 
            {props.children}

            <MyVerticallyCenteredModal
                title={props.title}
                show={props.modalShow}
                onHide={() => props.setModalShow(false)}
                isDark={props.isDark}
            />
        </>
    );
}

export default ModalContent;