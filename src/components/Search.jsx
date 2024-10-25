import React, { useEffect, useState } from "react";
import axios from "axios";

const Search = ({ onSelectImage }) => {
  const [query, setQuery] = useState("random");
  const [images, setImage] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${query}&page=1&per_page=${12}&client_id=38ciL6_i9JNvo5xWXYkhWjiyGzhKouiujdItg3PUwA0`
      );
      console.log("Hello", response.data.results);
      setImage(response.data.results);
    } catch (error) {
      console.log("Error in fetching image", error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <>
      <div>
        <div className="flex justify-center">
          <input
            className="border-2 border-amber-500 w-[50%] m-3 p-3 rounded-lg shadow-md"
            type="text"
            placeholder="Search for Image"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="border-2 border-amber-500 m-3 p-3 rounded-lg text-center font-semibold text-amber-400"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <div className="flex flex-wrap justify-center space-x-5 w-full h-[80%] mx-3 my-3 ">
          {images.map((image) => (
            <div
              className="flex flex-col justify-items-center mx-3 my-3"
              key={image.id}
            >
              <img
                className=" object-cover rounded-md shadow-md mx-3 h-full"
                src={image.urls.small}
                alt={image.alt_description}
              />
              <button
                className="border-2 border-gray-300 rounded-md px-2 py-1 my-2 mx-3 shadow-md"
                onClick={() => onSelectImage(image.urls.full)}
              >
                Add Caption
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Search;
