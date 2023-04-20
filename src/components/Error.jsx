import React from 'react'

export const Error = ({message}) => {
  return (
    <div className='error__block'>
        <p className='error__message'>{message}</p>
    </div>
  )
}
