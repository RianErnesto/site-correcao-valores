import React from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

function AlertContent(props) {

    function setShowFalse() {
        props.setShowFalse(false);
    }

    return (
        <>
            <Alert show={props.show} variant="success">
                <Alert.Heading>How's it going?!</Alert.Heading>
                <p>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
                    lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
                    fermentum.
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={() => setShowFalse(false)} variant="outline-success">
                        Close me y'all!
                    </Button>
                </div>
            </Alert>
        </>
    );
}

export default AlertContent;