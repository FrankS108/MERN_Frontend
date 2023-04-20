import React from 'react'
import axios from 'axios';
export const CardUser = (props) => {

  const deleteUser = async() => {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/users`, props.user);
    props.getUsers();
  }
  return (
    <div className="user__block" onClick={deleteUser}>
        <p className="user__name">{props.user?.name}</p>
    </div>
  )
}
