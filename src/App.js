import { useState } from "react";
import Search from "./components/Search";
import ImageEditor from "./components/ImageEditor";

export default function App() {
  const [selectImage, setSelectImage] = useState(null);

  return (
    <>
      <div className="md:container md:mx-auto">
        <h1 className="font-bold text-amber-500 text-5xl text-center m-3 p-3">
          Image Editor
        </h1>
        {!selectImage ? (
          <Search onSelectImage={setSelectImage} />
        ) : (
          <ImageEditor imageUrl={selectImage} />
        )}
      </div>
    </>
  );
}
