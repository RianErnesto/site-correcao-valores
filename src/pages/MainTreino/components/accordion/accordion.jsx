import React, { useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import '../../../../_assets/css/accordion/accordion.css'

function AccordionContent(props) {
    function nothing() {
    }

    return (
        <Accordion defaultActiveKey="0" className={`mb-4 mt-3 custom-accordion-${props.isDark ? 'dark' : 'light'}`}>
            <Accordion.Item eventKey="0">
                <Accordion.Header><h5>Regra de correção</h5></Accordion.Header>
                <Accordion.Body>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="nova" id="flexRadioDefault1" disabled={localStorage.getItem('regraCorrecao') == 'antiga'} checked={localStorage.getItem('regraCorrecao') == "nova" || localStorage.getItem('regraCorrecao') == null} onChange={nothing} />
                        <label className="form-check-label" htmlFor="nova">
                            Nova <em style={{ fontSize: "0.8em" }}>(Depósitos a partir de 04/05/2012)</em>
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="antiga" id="flexRadioDefault2" disabled={localStorage.getItem('regraCorrecao') == 'nova' || localStorage.getItem('regraCorrecao') == null} checked={localStorage.getItem('regraCorrecao') == "antiga"} onChange={nothing} />
                        <label className="form-check-label" htmlFor="antiga">
                            Antiga <em style={{ fontSize: "0.8em" }}>(Depósitos até 03/05/2012)</em>
                        </label>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export default AccordionContent;