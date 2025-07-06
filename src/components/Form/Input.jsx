import React from 'react'

export default function Input(props) {
  return (
    <input type={props.type} name={props.name} id={props.id} className={`${"input "} ${props.className}`} placeholder={props.placeholder} />
  )
}
