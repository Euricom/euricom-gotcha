import React from 'react'
import KilledBy from '../components/KilledBy'
import useGetAlive from '../hooks/useAlivePlayers'
import useGetAllAttempt from '../hooks/useAllAttempts'
import useGetPlayerCount from '../hooks/usePlayerCount'
import { ReactComponent as User } from '../icons/user.svg'
import { ReactComponent as XCircle } from '../icons/x-circle.svg'

const InfoScreen = () => {
  const { data, isSuccess } = useGetAllAttempt();
  const playerCount = useGetPlayerCount();
  const alivePlayer = useGetAlive();

  return (
    <div className="flex flex-col justify-start items-center border-r border-l border-gray-300 h-screenNav w-full">
      <main className="container flex justify-center items-center border-b border-r border-l py-4 border-gray-300">
      <p className="text-2xl font-rumraisin">Gotcha feed</p>
      </main>
      <section className="container border-b border-r border-l py-4 border-gray-300 flex-1 overflow-auto space-y-4">
        {alivePlayer?.data?.length === 1 && <p className="text-2xl font-bold font-roboto"><span className="text-green-500">{alivePlayer?.data[0].userName}</span> won!</p>}
        { isSuccess && data.length > 0 && data?.map((attempt:any) => <KilledBy key={attempt?.target?._id} attempt={attempt}></KilledBy>)}
        { isSuccess && data.length === 0 && <div className="flex items-center justify-center font-bold text-gray-500 font-roboto"><p>No one got found yet...</p></div>}
      </section>
      <section className="container flex justify-between border-b border-r border-l py-4 border-gray-300">
        <div><span className="flex items-center font-roboto text-xl font-medium text-green-500"><User className="mr-2"/> {playerCount.data.playing} playing</span></div>
        <div><span className="flex items-center font-roboto text-xl font-medium text-red-500"><XCircle className="mr-2"/> {playerCount.data.found} found</span></div>
      </section>
    </div>
  )
}

export default InfoScreen
