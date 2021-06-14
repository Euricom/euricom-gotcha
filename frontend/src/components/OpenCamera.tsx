import React from "react";
import { useHistory } from "react-router-dom";
import { useAppState } from "../hooks/useAppState";
import Resizer from "react-image-file-resizer";

const OpenCamera = ({
  onReset = () => {},
  onSuccess = () => {},
  icon,
}: any) => {
  const history = useHistory();
  const { setState } = useAppState();

  const sendImage = async (event: any) => {
    // 10Mib max file
    const maxFileSize = 10485760;
    const reader = new FileReader();
    const file = event.target.files[0];
    const image: any = await resizeFile(file, 'file');
    const tempImage: any = await  resizeFile(file, 'base64');

    reader.addEventListener("load", (event: any) => {
      if (image.size >= maxFileSize) {
        onReset();
        return;
      }

      onSuccess();
      setState((state: any) => ({ ...state, image, tempImage }));
      history.push("/camera");
    });

    reader.readAsDataURL(image);
  };

  const resizeFile = (file: any, type: 'file' | 'base64') =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "JPEG",
        80,
        0,
        (uri) => {
          resolve(uri);
        },
        type
      );
    });

  return (
    <label
      htmlFor="camera"
      className="w-11 h-11 flex justify-center items-center rounded-xl transition-transform transform scale-100"
      onClick={onReset}
    >
      <input
        id="camera"
        type="file"
        capture
        accept="image/*"
        onChange={(e) => sendImage(e)}
        className="h-0 w-0"
      />
      {icon}
    </label>
  );
};

export default OpenCamera;
