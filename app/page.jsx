"use client";
import PropertyCard from "./(components)/PropertyCard";
import {
  faHouseChimneyWindow,
  faMoneyBills,
  faBuildingLock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Header from "./(components)/Header";
import React, { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

const Dashboard = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemNumber, setItemNumber] = useState(1);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(
          "https://fsboafrica.com/api/properties/latest"
        );

        const result = await response.json();

        if (
          result.status === "success" &&
          Array.isArray(result.data.latestPropertiesForSale)
        ) {
          setProperties(result.data.latestPropertiesForSale);
          setLoading(false);
        } else {
          alert("Failed to fetch properties");
          setProperties([]); // Default to empty array if the response is invalid
          setLoading(true);
        }
      } catch (error) {
        setError(error);
        setLoading(true);
        setProperties([]); // Default to empty array if the response is invalid
      }
    };

    const adjustItemNumber = () => {
      if (window.innerWidth > 768) {
        setItemNumber(3);
      } else {
        setItemNumber(1);
      }
    };

    adjustItemNumber();

    fetchProperties();
  }, [itemNumber]);

  return (
    <main>
      <Header />
      <section className="pb-[4rem]">
        <div className="max-w-[90vw] m-auto">
          <h2 className="text-left text-2xl text-[#333] my-[2rem]">
            Properties For Sale
          </h2>
          {loading && (
            <div className="grid grid-cols-3 gap-[2rem]">
              {new Array(itemNumber).fill(null).map((_, index) => (
                <div
                  key={index}
                  className={`rounded-[1rem] border animate-pulse bg-[#ccc] h-[80vh] ${
                    itemNumber > 1 ? "" : "w-[90vw] m-auto"
                  }`}
                ></div>
              ))}
            </div>
          )}
          {properties && (
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={itemNumber === 3 ? 20 : 0}
              slidesPerView={itemNumber}
              navigation
              pagination={{ clickable: true }}
              className="mySwiper"
            >
              {properties.map((singleItem) => (
                <SwiperSlide key={singleItem.id}>
                  <PropertyCard property={singleItem} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>
      <section className="pb-[4rem]">
        <div className="max-w-[90vw] m-auto">
          <h2 className="text-left text-2xl text-[#333] my-[2rem]">
            Properties For Rent
          </h2>
          {loading && (
            <div className="grid grid-cols-3 gap-[2rem]">
              {new Array(itemNumber).fill(null).map((_, index) => (
                <div
                  key={index}
                  className={`rounded-[1rem] border animate-pulse bg-[#ccc] h-[80vh] ${
                    itemNumber > 1 ? "" : "w-[90vw] m-auto"
                  }`}
                ></div>
              ))}
            </div>
          )}
          {properties && (
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={20}
              slidesPerView={itemNumber}
              navigation
              pagination={{ clickable: true }}
              className="mySwiper"
            >
              {properties.map((singleItem) => (
                <SwiperSlide key={singleItem.id}>
                  <PropertyCard property={singleItem} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>
      <section className="py-[4rem]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2rem] max-w-[90vw] m-auto">
          <div className="border border-[#ccc] p-[1rem] flex flex-col gap-[1rem] items-center rounded-md">
            <FontAwesomeIcon
              icon={faHouseChimneyWindow}
              className="text-[8rem] text-red-600"
            />
            <h2 className="font-bold text-xl text-[#444]">Buy a Property</h2>
            <p className="mb-[1rem]">
              Find your place with an immersive photo experience and the most
              listings, including things you won&apos;t find anywhere else.
            </p>
            <Link
              href="/properties/listings"
              className="text-red-600 border border-red-600 p-[0.5rem] rounded-xl text-xl hover:bg-red-600 hover:text-white w-full text-center"
            >
              Browse Properties For Sale
            </Link>
          </div>
          <div className="border border-[#ccc] p-[1rem] flex flex-col gap-[1rem] items-center rounded-md">
            <FontAwesomeIcon
              icon={faMoneyBills}
              className="text-[8rem] text-red-600"
            />
            <h2 className="font-bold text-xl text-[#444]">Sell a Property</h2>
            <p className="mb-[1rem]">
              Find your place with an immersive photo experience and the most
              listings, including things you won&apos;t find anywhere else.
            </p>
            <Link
              href="/properties/listings"
              className="text-red-600 border border-red-600 p-[0.5rem] rounded-xl text-xl hover:bg-red-600 hover:text-white w-full text-center"
            >
              See your options
            </Link>
          </div>
          <div className="border border-[#ccc] p-[1rem] flex flex-col gap-[1rem] items-center rounded-md">
            <FontAwesomeIcon
              icon={faBuildingLock}
              className="text-[8rem] text-red-600"
            />
            <h2 className="font-bold text-xl text-[#444]">Rent a Property</h2>
            <p className="mb-[1rem]">
              Find your place with an immersive photo experience and the most
              listings, including things you won&apos;t find anywhere else.
            </p>
            <Link
              href="/properties/listings"
              className="text-red-600 border border-red-600 p-[0.5rem] rounded-xl text-xl hover:bg-red-600 hover:text-white w-full text-center"
            >
              Find Rentals
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
