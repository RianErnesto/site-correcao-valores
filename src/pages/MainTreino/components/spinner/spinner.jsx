import React from "react";
import Spinner from 'react-bootstrap/Spinner'
import Button from "react-bootstrap/esm/Button";

function SpinnerContent() {
    return (
        <div className="d-flex justify-content-center mt-5">

            <Button variant="success" disabled style={{fontSize: "30px"}}>
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    style={{ width: "30px", height: "30px", marginRight: "10px"}}
                />
                Loading...
            </Button>
        </div>
    );
}

export default SpinnerContent;