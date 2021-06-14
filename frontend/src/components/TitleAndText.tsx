import React, { isValidElement, ReactNode } from 'react'

interface TitleAndTextProps {
  title: string | ReactNode,
  text: string | ReactNode
}

const TitleAndText = ({title, text} : TitleAndTextProps) => {
  const isTextComponent = isValidElement(text)
  return (
    <div>
      <p className="font-roboto font-black text-lg">{title}</p>
      {isTextComponent ? <div>{text}</div> : <p className="font-roboto text-base">{text}</p>}
    </div>
  )
}

export default TitleAndText
