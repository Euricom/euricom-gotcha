import React from 'react'
import { useHistory } from 'react-router';
import Button from '../components/Button'
import TitleAndText from '../components/TitleAndText'
import { useAppState } from '../hooks/useAppState';
import useGetAttempt from '../hooks/useAttempts';
import useUpdateAttempt from '../hooks/useUpdateAttempt';

const AttemptScreen = () => {

  const { user } = useAppState();
  const { data } = useGetAttempt(user?._id);
  const history = useHistory()
  const {mutate} = useUpdateAttempt()

  if (!data || !(data.length > 0)) {
    history.push('/target');
    return <></>;
  }

  const updateAttempt = (value:boolean) => {
    mutate({approved: value, id: data[0]?._id});
    history.push('/target');
  }

  return (
    <div className="flex flex-col justify-start items-center border-r border-l border-gray-300 h-screen w-full pb-16">
      <div className="container py-4 flex flex-col justify-between flex-1">
        <p className="text-2xl font-rumraisin">You where found</p>
        <img className="w-96 h-96 object-cover rounded-xl" height="512px" width="512px" src={`${process.env.REACT_APP_API_URL}/attempt/${data[0]?.imageId}`} alt={`${user?.target?.userName}`}/>

        <TitleAndText
          title="Your question:"
          text={user?.question}
        />

        <TitleAndText
          title="Answered:"
          text={data[0]?.answer}
        />

      <div className="grid grid-cols-2 gap-4">
        <Button buttonType="Success" onClick={() => updateAttempt( true)}>Approve</Button>
        <Button buttonType="Error" onClick={() => updateAttempt( false)}>Decline</Button>
      </div>
      </div>

    </div>
  )
}

export default AttemptScreen
