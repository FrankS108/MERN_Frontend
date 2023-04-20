import React, { useState } from 'react'
import { DeleteConfirmation } from './DeleteConfirmation';
import { useNavigate } from 'react-router-dom';
export const Card = ({note, getNotes}) => {
  const navigate = useNavigate();

  const [deleteNote, setDelete] = useState(false);

  const transformDate = (data) => {
    const dateObj = new Date(data);
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    const day = ("0" + (dateObj.getDate()+1)).slice(-2) ;
    const year = dateObj.getFullYear();
    const shortDate = `${day}/${month}/${year}`;
    return shortDate;
  }

  const deleteTask = () => {
    setDelete(true);
  }

  function update(){
    navigate(`/edit/${note._id}`);
  }

  return (
    <div className="task__block">
        {deleteNote && <DeleteConfirmation id={note._id} setState={setDelete} getNotes={getNotes}/>}
        <div className="column__color"></div>
        <div className="task__information">
          <h3 className="task__title">{note.title}</h3>
          <h4 className="task__user">{note.name}</h4>
          <p className="task__description">{note.description}</p>
          <p className="task__date">{transformDate(note.date)}</p>
          <div className='buttons__block'>
            <input className='button__update' type="submit" value='Editar' onClick={update}/>
            <input className='button__delete' type="submit" value='Eliminar' onClick={deleteTask}/>
          </div>
        </div>
    </div>
  )
}
