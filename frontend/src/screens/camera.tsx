import axios from "axios";
import React,{ useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import TitleAndText from "../components/TitleAndText";
import { useAppState } from "../hooks/useAppState";
import { ReactComponent as ArrowLeft } from "../icons/arrow-left.svg";

const CameraScreen = () => {
  const history = useHistory();
  const [ answer, setAnswer] = useState('');
  const { user, setState, state } = useAppState();

  if (!state?.hasImage) {
    history.push('/target')
  }

  const onReset = () => {
    history.push("/target");
    setState((state:any) => ({...state, hasImage: false}));
  }

  const registerGotcha = () => {
    const formData = new FormData();
    formData.append('file', state.image);
    formData.append('answer', answer)
    formData.append('killer', user._id)
    axios.post(`/attempt/${user._id}`, formData, {
      headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data;`,
      }
    }).then(({data}: any) => {
      onReset();
    })
  }

  return (
    <div className="flex flex-col justify-start items-center border-r border-l border-gray-300 h-screen w-full pb-16">
      <div className="container py-4">
        <button type="button" onClick={onReset}>
          <ArrowLeft />
        </button>
      </div>
      <div className="container py-4 flex flex-col justify-between flex-1">
        <img className="w-96 h-96 object-cover rounded-xl" height="512px" width="512px" src={state?.tempImage} alt={`${user?.target?.userName}`}/>

        <TitleAndText
          title="Question:"
          text={user?.target?.question}
        />

        <TitleAndText
          title="Your answer:"
          text={ <Input onChange={(e:any) => setAnswer(e.target.value)} placeholder="Answer"/>}
        />

        <Button onClick={() => registerGotcha()}>Gotcha</Button>
      </div>

    </div>
  );
};

export default CameraScreen;
