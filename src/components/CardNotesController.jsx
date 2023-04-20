import React from 'react'
import { Card } from './Card'
export const CardNotesController = (props) => {
  return (
    props.notes?.map((element, index) => (
        <Card key={index} note={element} getNotes={props.getNotes}/>
    ))
  )
}
