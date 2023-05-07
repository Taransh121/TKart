import React from 'react';
import "./Card.css"

export const Card = (props) => {
  return (
    <div className='card' {...props}>
      {(props.headerleft) || (props.headerright) && (

      <div className="card-header">
        {
          props.headerleft && <div> {props.headerleft} </div>
        }
        {
          props.headerright && props.headerright
        }
      </div>
      )}
        {props.children}
    </div>
  )
}
