import React from "react";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import '../../../../_assets/css/popover/popover.css';

function PopoverContent(props) {
    const popover = (
      <Popover id="popover-basic" className={`custom-popover-${props.isDark ? "dark" : "light"}`}>
        <Popover.Header as="h3">{props.title}</Popover.Header>
        <Popover.Body>
            {props.content}
        </Popover.Body>
      </Popover>
    );
  
  
    return (
      <OverlayTrigger trigger="click" placement={props.position} overlay={popover}>
        {props.children}
      </OverlayTrigger>
    )
  }

  export default PopoverContent;