import React, {useState, useEffect} from 'react'
import { Error } from './Error';
import { Response } from './Response';
import axios from 'axios';

export const CreateNote = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [response, setResponse] = useState('');

    async function getUsers(){
        await axios.get(`http://localhost:4000/api/users`)
        .then((response) => { 
            const usersResponse = response.data.map((element) => element);
            setUsers(usersResponse);
            setName(usersResponse[0]?.name);
        } )
    }

    useEffect(() => {
        getUsers();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(users.length < 1){
            setError('Debes crear un usuario');
            setInterval(() => {
                setError('');
            }, 10000);
            return;
        }


        if([title, description, name, date].includes('')){
            setError('Llenar todos los campos');
            setInterval(() => {
                setError('');
            }, 10000);
            return;
        }
        await axios.post(`http://localhost:4000/api/task`, {
            title, description, name, date
        }).then(response => {
            setResponse("Creado Correctamente");
            setInterval(() => {
                setResponse('');
            }, 10000);
        });
    };

    return (
        <div className="task__block__form edit__form">
            <div className="form__block">
                <h3 className='task__form__title'>Crear nota</h3>
                <form action="">
                    {error && <Error message={error}/>}
                    {response && <Response message={response}/>}
                    <div className="input__block">
                        <label>Título</label>
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)}/>
                    </div>
                    <div className="input__block">
                        <label>Descripción</label>
                        <textarea name="" id="" cols="30" rows="10"  value={description} onChange={e => setDescription(e.target.value)}></textarea>
                    </div>
                    <div className="input__block">
                        <label>Usuario</label>
                        <select name="" id=""  value={name} onChange={e => setName(e.target.value)}>
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
                        <input className='button__update' type="submit" value='Crear' onClick={handleSubmit}/>
                    </div>

                </form>
            </div>
        </div>
    )
}
