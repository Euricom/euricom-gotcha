import React from 'react'

interface KilledByProps {
  attempt: any
}

// We don't need a XX Mb lib to solve this yet :D
const weekday=new Array(7);
weekday[0]="Mon";
weekday[1]="Tue";
weekday[2]="Wed";
weekday[3]="Thu";
weekday[4]="Fri";
weekday[5]="Sat";
weekday[6]="Sun";

const KilledBy = ({ attempt }: KilledByProps) => {
  const approvedDate = new Date(attempt?.approveDate);
  const [day, hours, minutes] = [approvedDate.getDay(), approvedDate.getHours(), approvedDate.getMinutes()]
  return (
    <div className="font-medium mb-8">
      <div className="w-96 max-w-full rounded-xl mb-2">
        <img className="rounded-xl" src={attempt?.imageUrl}alt={attempt?.target?.userName}/>
      </div>
      <span className="text-gray-400 mr-2">{`${weekday[day]} ${hours}:${minutes}`} :</span>
      <p className="font-bold"><span className="text-red-500">{attempt?.target?.userName}</span> was found by <span className="text-green-500">{attempt?.killer?.userName}</span></p>
    </div>
  )
}

export default KilledBy
