import React from 'react'
import KilledBy from '../components/KilledBy'
import useGetAllAttempt from '../hooks/useAllAttempts'
import useGetPlayerCount from '../hooks/usePlayerCount'
import { ReactComponent as User } from '../icons/user.svg'
import { ReactComponent as XCircle } from '../icons/x-circle.svg'

const InfoScreen = () => {
  const { data } = useGetAllAttempt();
  const playerCount = useGetPlayerCount();

  return (
    <div className="flex flex-col justify-start items-center h-screen w-full pb-16 ">
      <main className="container  flex justify-center items-center border-b py-4 border-gray-300">
      <p className="text-2xl font-rumraisin">Gotcha feed</p>
      </main>
      <section className="container border-b py-4 border-gray-300 flex-1 overflow-auto space-y-4">
        { data?.map((attempt:any) => <KilledBy key={attempt?.target?._id} attempt={attempt}></KilledBy>)}
      </section>
      <section className="container flex justify-between border-b py-4 border-gray-300">
        <div><span className="flex items-center font-roboto text-xl font-medium text-green-500"><User className="mr-2"/> {playerCount.data.playing} playing</span></div>
        <div><span className="flex items-center font-roboto text-xl font-medium text-red-500"><XCircle className="mr-2"/> {playerCount.data.found} found</span></div>
      </section>
    </div>
  )
}

export default InfoScreen
