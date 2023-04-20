import React from 'react'
import { CardUser } from './CardUser';

export const CardUserController = (props) => {
  return (
    <div className="users__created__block">
        {
            props.users?.map((element, index) => (
                <CardUser key={index} user={element} getUsers={props.getUsers}/>
            ))
        }      
    </div>
  )
}
