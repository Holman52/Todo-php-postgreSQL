import React from 'react'
import './inputItem.scss'
export default function InputItem(props) {
  return (
    <input
      type={props.type} 
      name={props.name} 
      id={props.id} 
      className={`${"inputItem"} ${props.className}`} 
      min={1} placeholder={props.placeholder} 
      max={4}  
      value={props.value}
      onChange={props.onChange}/>
  )
}
