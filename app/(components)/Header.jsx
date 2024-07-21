"use client";
import { faChevronDown, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Header = () => {
  const [propertyTypes, setPropertyTypes] = useState(false);
  const [selected, setSelected] = useState(false);

  return (
    <header className="relative w-full bg-[url(/header-image.jpg)] bg-center bg-no-repeat bg-cover md:h-[50vh] flex flex-col items-center justify-center p-[2rem]">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="flex flex-col items-start justify-center gap-[1rem] w-full md:w-[60%]">
        <span className="flex items-center gap-[1rem] p-[0.5rem] rounded-3xl bg-white text-[#555] z-50">
          <button
            className={`${
              selected ? "" : "bg-red-600 text-white"
            }  rounded-3xl py-[0.5rem] px-[1rem]`}
            onClick={() => setSelected(false)}
          >
            For Sale
          </button>
          <button
            className={`${
              selected ? "bg-red-600 text-white" : ""
            } rounded-3xl py-[0.5rem] px-[1rem]`}
            onClick={() => setSelected(true)}
          >
            To Rent
          </button>
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
            className="p-[1rem] w-full md:w-[50%] outline-none focus:border-b-black focus:border-b"
          />
          <button className="bg-red-600 p-[1rem] rounded-lg text-white">
            <FontAwesomeIcon icon={faSearch} /> Search
          </button>
          {propertyTypes && (
            <div className="absolute flex flex-col gap-[2rem] p-[1rem] left-0 items-center bg-white translate-y-[70%] rounded-sm w-full md:w-[30%] transition-all z-50 shadow-lg">
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
