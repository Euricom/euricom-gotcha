import React from 'react'
import KilledBy from '../components/KilledBy'
import useGetAllAttempt from '../hooks/useAllAttempts'
import { ReactComponent as User } from '../icons/user.svg'
import { ReactComponent as XCircle } from '../icons/x-circle.svg'

const InfoScreen = () => {
  const { data } = useGetAllAttempt();

  return (
    <div className="flex flex-col justify-start items-center h-screen w-full pb-16 ">
      <main className="container  flex justify-center items-center border-b py-4 border-gray-300">
      <p className="text-2xl font-rumraisin">Gotcha feed</p>
      </main>
      <section className="container border-b py-4 border-gray-300 flex-1">
        { data?.map((attempt:any) => <KilledBy time={new Date(attempt?.approveDate)} text={<><span className="text-red-500">{attempt?.target?.userName}</span> by <span className="text-green-500">{attempt?.killer?.userName}</span> </>}></KilledBy>)}

      </section>
      <section className="container flex justify-between border-b py-4 border-gray-300">
        <div><span className="flex items-center font-roboto text-xl font-medium text-green-500"><User/> {} playing</span></div>
        <div><span className="flex items-center font-roboto text-xl font-medium text-red-500"><XCircle/> {} found</span></div>
      </section>
    </div>
  )
}

export default InfoScreen
