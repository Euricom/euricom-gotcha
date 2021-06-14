import React from 'react'

const Input = ({className, ...rest}: any) => {
  return (
    <input {...rest} className={`w-full border-b border-gray-300 leading-8 text-lg ${className}`}/>
  )
}

export default Input
