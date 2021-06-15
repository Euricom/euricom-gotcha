import axios from "axios";
import React,{ useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import OpenCamera from "../components/OpenCamera";
import TitleAndText from "../components/TitleAndText";
import { useAppState } from "../hooks/useAppState";
import { ReactComponent as Camera } from "../icons/camera.svg";

const CameraScreen = () => {
  const history = useHistory();
  const [ answer, setAnswer] = useState('');
  const { user, state, setState } = useAppState();

  const onReset = () => {
    setState({ tempImage: null})
    history.push("/target");
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
      <div className="container py-4 flex flex-col justify-between flex-1">
        {!state?.tempImage && <OpenCamera>
          <div className="w-full h-full border-2 border-dashed border-gray-400 flex flex-col items-center justify-center cursor-pointer rounded-xl">
            <Camera className="w-16 text-gray-400"/>
            <p className="text-gray-400 font-roboto text-lg font-bold">Click to add image</p>
          </div>
          </OpenCamera>}
        {state?.tempImage && <OpenCamera><img className="w-96 h-96 object-cover rounded-xl" height="512px" width="512px" src={state?.tempImage} alt={`${user?.target?.userName}`}/></OpenCamera>}

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
