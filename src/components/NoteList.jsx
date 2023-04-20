import React, { useState, useEffect } from 'react'
import axios from 'axios';

import { CardNotesController } from './CardNotesController';

export const NoteList = () => {
  const [notes, setNotes] = useState([]);

  const getNotes = () => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/task`)
      .then((response) => { 
        const taskResponse = response.data.map(element => element);
        setNotes(taskResponse);
      } )
  }

  useEffect(() => {
    getNotes();      
  }, [])
  return (
    <div className="task__created__block">
      <CardNotesController notes={notes} getNotes={getNotes}/>
    </div>
  )
}
