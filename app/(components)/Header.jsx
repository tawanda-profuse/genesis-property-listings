"use client";
import { faChevronDown, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Header = () => {
  const [propertyTypes, setPropertyTypes] = useState(false);

  return (
    <header className="w-full bg-[url(/header-image.jpg)] md:h-[50vh] flex flex-col items-center justify-center p-[2rem]">
      <div className="flex flex-col items-start justify-center gap-[1rem] w-[60%]">
        <span className="flex items-center gap-[1rem] p-[0.5rem] rounded-3xl bg-white text-[#555]">
          <button className="bg-red-600 text-white rounded-3xl py-[0.5rem] px-[1rem]">
            For Sale
          </button>
          <button className="rounded-3xl py-[0.5rem] px-[1rem]">To Rent</button>
        </span>
        <div className="bg-white text-[#555] flex flex-col md:flex-row gap-[2rem] md:gap-0 justify-between items-center w-full p-[1rem] rounded-xl relative">
          <button
            className="flex justify-between items-center w-[30%]"
            onClick={() => {
              setPropertyTypes(!propertyTypes);
            }}
          >
            Property Types <FontAwesomeIcon icon={faChevronDown} />
          </button>
          <input
            type="text"
            placeholder="Suburb City, Province, Country"
            className="p-[1rem] w-[50%] outline-none focus:border-b-black focus:border-b"
          />
          <button className="bg-red-600 p-[1rem] rounded-lg text-white">
            <FontAwesomeIcon icon={faSearch} /> Search
          </button>
          {propertyTypes && (
            <div className="absolute flex flex-col gap-[2rem] p-[1rem] left-0 items-center bg-white translate-y-[30%] rounded-sm w-[30%] transition-all z-50 shadow-lg">
              <h4 className="font-bold self-start">Commercial</h4>
              <span>Commercial</span>
              <span>Educational</span>
              <span>Leisure/Hospitality</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;