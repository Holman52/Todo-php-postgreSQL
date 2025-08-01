import React from 'react'
import './button.scss'
export default function Button(props) {
  return (
    <button type={props.type} className={`${"btn"} ${props.className}`}>{props.title}</button>
  )
}
