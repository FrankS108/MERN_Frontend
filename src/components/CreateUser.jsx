import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { CardUserController } from './CardUserController';
import { Error } from './Error';

export const CreateUser = () => {
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async(event) => {
    event.preventDefault();
    if([name].includes('')){
      setError('Llenar todos los campos');
      setInterval(() => {
        setError('');
      }, 10000);
    }
    const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {name});
    const updateUsers = [...users, data];
    setUsers(updateUsers);
  }

  const getUsers = () => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users`) //VITE_BACKEND_URL
      .then((response) => { 
        let usersResponse = response.data.map(element => element);
        setUsers(usersResponse);
    })
  }
  useEffect(() => {
    getUsers();
  }, [])
  
  return (
    <div className="users__block">
        <div className="create__user__block">
            {error && <Error message={error}/>}
            <h3 className="create__user__title">Crear nuevo usuario</h3>
            <form>
                <input name="name" type="text" value={name} onChange={e => setName(e.target.value)}/>
                <input type="submit" onClick={handleSubmit} value="Crear"/>
            </form>
        </div>
        
        <CardUserController users={users} getUsers={getUsers}/>
    </div>
  )
}
