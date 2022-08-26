import React from 'react'

import { Button, Row } from 'react-bootstrap'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const IconStyle = {
  cursor: 'pointer',
}

export const TooltipContent = ({ onClose, event }) => {
  return (
    <>
      <FontAwesomeIcon
        icon={faWindowClose}
        className="pull-right"
        style={IconStyle}
        onClick={onClose}
      />
      <div>{event.title}</div>
      <div>Some other Info</div>
      <strong>Holy guacamole!</strong> Check this info.
      <Row>
        <Button variant="light">Button 1</Button>
        <Button variant="light">Button 2</Button>
      </Row>
    </>
  )
}
