import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Error } from './Error';


export const EditTask = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    const params = useParams();

    const transformDate = (value) => {
        const dateObj = new Date(value);
        const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
        const day = ("0" + (dateObj.getDate()+1)).slice(-2);
        const year = dateObj.getFullYear();
        const shortDate = `${year}-${month}-${day}`;
        setDate(shortDate);
    }

    async function getNote(){
        const id = params.id;
        await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/task/${id}`)
        .then((response) => { 
          const task = response.data;
          setTitle(task.title);
          setDescription(task.description);
          setName(task.name);
          transformDate(task.date);
        } )
    }

    async function getUsers(){
        await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users`)
        .then((response) => { 
            const usersResponse = response.data.map((element) => element);
            setUsers(usersResponse);
        } )
    }

    const [note, setNote] = useState({});
    useEffect(() => {
       getNote();
       getUsers();
    }, [])
    
   const save = async (event) => {
    event.preventDefault();
    if([title, description, name, date].includes('')){
        setError('Llenar todos los campos');
        setInterval(() => {
            setError('');
        }, 10000);
        return;
    }

    const id = params.id;
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/task/${id}`, {
            title, description, name, date
        });
        navigate('/');
    }

    const cancel = () => {
        navigate('/');
    }
    
    return (
        <div className="task__block__form edit__form">
            <div className="form__block">
                <h3 className='task__form__title'>Editar nota</h3>
                <form action="">
                    {error && <Error message={error}/>}
                    
                    <div className="input__block">
                        <label>Titulo</label>
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)}/>
                    </div>
                    <div className="input__block">
                        <label>Descripción</label>
                        <textarea name="" id="" cols="30" rows="10"  value={description} onChange={e => setDescription(e.target.value)}></textarea>
                    </div>
                    <div className="input__block">
                        <label>Usuario</label>
                        <select name="" id="" value={name} onChange={e => setName(e.target.value)}>
                            {
                                users?.map((user, index)=> (
                                    <option key={index} value={user.name}>{user.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="input__block">
                        <label>Fecha</label>    
                        <input type="date" name="" id="" value={date} onChange={e => setDate(e.target.value)}/>
                    </div>
                    <div className='buttons__block form__buttons'>
                        <input className='button__update' type="submit" value='Guardar' onClick={save}/>
                        <input className='button__delete' type="button" value='Cancelar' onClick={cancel}/>
                    </div>

                </form>
            </div>
        </div>
    )
}
