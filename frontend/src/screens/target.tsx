import React from 'react';
import TitleAndText from '../components/TitleAndText'
import { useAppState } from '../hooks/useAppState';
import useGetAttempt from '../hooks/useAttempts';

const TargetScreen = () => {
  const { user } = useAppState();
  const targetAttempt = useGetAttempt(user?.target?._id);
  return (
    <div className="flex flex-col justify-start items-center border-r border-l border-gray-300 h-screenNav w-full">
      <main className="container border-b border-r border-l py-4 border-gray-300">
        <p className="font-rumraisin text-5xl py-2">Your target:</p>
        <p className={`font-roboto text-3xl font-bold ${user?.killed && 'text-red-500'} ${!!targetAttempt?.data?.length && 'text-yellow-500'} ${!user?.killed && !targetAttempt?.data?.length && 'text-green-500'} mb-4`}>
          {user?.killed && 'No Target'}
          {!!targetAttempt?.data?.length && 'Awaiting approval'}
          {!user?.killed && !targetAttempt?.data?.length && user?.target?.userName}
          </p>
        <TitleAndText
          title="Question:"
          text={user?.killed ? 'You no longer have a target' : user?.target?.question}
        />
      </main>
      <section className="container border-r border-l py-4 border-gray-300 flex-1 scroll-y-auto">
        <TitleAndText
            title="Rules:"
            text={<><p className="my-4">When taking a selfie of your target, both your and the targets face have to be clearly visible! After your selfie is taken you can give the answer to their question.
            If both the selfie and answer are valid your target will be eliminated.</p>
            <p className="mb-4">If you are found a check icon will be displayed in the navigation and you'll have to validate the selfie displayed with the answer honestly.</p>

            <p>You can always check the feed to see who was found and how many are still playing.</p></>}
          />
      </section>
    </div>
  )
}

export default TargetScreen
