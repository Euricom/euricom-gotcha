import React, { ReactNode } from 'react'

interface KilledByProps {
  time:Date,
  text: string | ReactNode
}

const KilledBy = ({time = new Date(), text}: KilledByProps) => {
  return (
    <p className="font-medium">
      <span className="text-gray-300 mr-2">{time.toLocaleTimeString()}:</span>
      {text}
    </p>
  )
}

export default KilledBy
