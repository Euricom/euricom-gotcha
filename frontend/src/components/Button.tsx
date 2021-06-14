import React, { FC, forwardRef } from 'react'

const Button: FC<any> = forwardRef<HTMLButtonElement>(({children, type = 'button', buttonType = 'Primary', ...rest}: any, ref) => {
  return (
    <button
     type={type}
     {...rest}
     ref={ref}
     className={`py-2 px-4 text-white rounded-md font-rumraisin text-2xl w-full
      ${buttonType === 'Primary' && 'bg-blue-500'}
      ${buttonType === 'Error' && 'bg-red-500'}
      ${buttonType === 'Success' && 'bg-green-500'}
     `}>
      {children}
    </button>
  )
});

export default Button;
