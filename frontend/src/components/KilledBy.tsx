import React from 'react'

interface KilledByProps {
  attempt: any
}

// We don't need a XX Mb lib to solve this yet :D
const weekday=new Array(7);
weekday[0]="Sun";
weekday[1]="Mon";
weekday[2]="Tue";
weekday[3]="Wed";
weekday[4]="Thu";
weekday[5]="Fri";
weekday[6]="Sat";

const KilledBy = ({ attempt }: KilledByProps) => {
  const approvedDate = new Date(attempt?.approveDate);
  const [day, hours, minutes] = [approvedDate.getDay(), approvedDate.getHours(), approvedDate.getMinutes()]
  return (
    <div className="font-medium mb-8">
      <span className="text-gray-400 mr-2">{`${weekday[day]}, ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`}</span>
      <p className="font-regular text-sm"><span className="text-red-500 font-bold">{attempt?.target?.userName}</span> was found by <span className="text-green-500 font-bold">{attempt?.killer?.userName}</span></p>
      <p className="font-regular text-sm"><span className="font-bold text-base">Q: </span>{attempt?.target?.question}</p>
      <p className="font-regular"><span className="font-bold text-base">A: </span>{attempt?.answer}</p>
      <div className="w-96 max-w-full rounded-xl mb-2">
        <img className="rounded-xl" src={attempt?.imageUrl}alt={attempt?.target?.userName}/>
      </div>
    </div>
  )
}

export default KilledBy
