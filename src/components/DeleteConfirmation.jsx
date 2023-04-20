import React from 'react'
import axios from 'axios';

export const DeleteConfirmation = ({id, setState, getNotes}) => {

  const confirm = async () => {
    setState(false);
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/task/${id}`);
    getNotes();
  }

  const cancel = () => {
    setState(false);
  }

  return (
    <div className='delete__confirmation__block'>
        <p>¿Deseas eliminar esta nota?</p>
        <div className='buttons__block'>
            <input className='button__update' type="submit" value='Confirmar' onClick={confirm}/>
            <input className='button__delete' type="submit" value='Cancelar' onClick={cancel}/>
        </div>
    </div>
  )
}
