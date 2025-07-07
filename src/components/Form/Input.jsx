import React from 'react'
import '../Input.scss'
export default function Input(props) {
  return (
    <input type={props.type} name={props.name} id={props.id} className={`${"input "} ${props.className}`} min={1} placeholder={props.placeholder} />
  )
}
