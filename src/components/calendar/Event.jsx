import React, { useState, useRef } from 'react'
import ReactDOM from 'react-dom'

import { Overlay, Tooltip } from 'react-bootstrap'
import 'react-big-calendar/lib/css/react-big-calendar.css'

export function Event(event) {
  const [showTooltip, setShowTooltip] = useState(false)

  const closeTooltip = () => {
    setShowTooltip(false)
  }

  const openTooltip = () => {
    setShowTooltip(true)
  }
  const ref = useRef(null)

  const getTarget = () => {
    return ReactDOM.findDOMNode(ref.current)
  }

  return (
    <div ref={ref}>
      <span onMouseOver={openTooltip}>{event.title}</span>
      <Overlay
        rootClose
        target={getTarget}
        show={showTooltip}
        placement="top"
        onHide={closeTooltip}>
        <Tooltip id="test">
          <TooltipContent event={event} onClose={closeTooltip} />
        </Tooltip>
      </Overlay>
    </div>
  )
}
