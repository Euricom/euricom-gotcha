import React from 'react';
import TitleAndText from '../components/TitleAndText'
import { useAppState } from '../hooks/useAppState';
import useGetAttempt from '../hooks/useAttempts';

const TargetScreen = () => {
  const { user } = useAppState();
  const targetAttempt = useGetAttempt(user?.target?._id);
  return (
    <div className="flex flex-col justify-start items-center border-r border-l border-gray-300 h-screen w-full pb-16 ">
      <main className="container border-b py-4 border-gray-300">
        <p className="font-rumraisin text-5xl py-2">Your target:</p>
        <p className={`font-roboto text-3xl font-bold ${user?.killed ? 'text-red-500' : 'text-green-500' } mb-4`}>
          {user?.killed && 'No Target'}
          {!!targetAttempt?.data?.length && 'Awaiting aproval'}
          {!user?.killed && !targetAttempt?.data?.length && user?.target?.userName}
          </p>
        <TitleAndText
          title="Question:"
          text={user?.killed ? 'You no longer have a target' : user?.target?.question}
        />
      </main>
      <section className="container py-4">
        <TitleAndText
            title="Rules:"
            text={<><p className="my-4">Take a picture of your taget to shoot them, the targets face has to be clearly visible! After you shot your target fill in your answer to their question.
            With a correct answer no mercy will be shown and your target will be killed.</p>
            <p className="mb-4">If you are shot a screen will pop up saying you got shot you'll have to check if your face is visible and correct answer is given, we trust on your honesty.(group pictures don't count)</p>

            <p>You can always check the kill feed for remaining players and a kill feed.Good luck hunting!</p></>}
          />
      </section>
    </div>
  )
}

export default TargetScreen
