import React from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

function AlertContent(props) {

    function setShowFalse() {
        props.setShowFalse(false);
    }

    return (
        <>
            <Alert show={props.show} variant="danger">
                <Alert.Heading>{props.title}</Alert.Heading>
                <p>
                    {props.message}
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={() => setShowFalse(false)} variant="outline-danger">
                        Fechar
                    </Button>
                </div>
            </Alert>
        </>
    );
}

export default AlertContent;