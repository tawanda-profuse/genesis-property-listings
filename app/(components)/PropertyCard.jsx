"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faAt } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";

const PropertyCard = ({ property, flex = true }) => {
  return (
    <div className={`rounded-[1rem] border border-[#ccc] cursor-pointer ${!flex ? "flex justify-center gap-[1rem] p-r[1rem]" : ""}`}>
      <Image
      priority
        src={property?.images[0].filePath}
        alt={property?.title}
        width={500}
        height={100}
        style={{ borderRadius: flex ? "1rem 1rem 0 0" : "1rem 0 0 1rem" }}
      />
      <div className="w-[90%] m-auto my-[1rem] flex flex-col gap-[1rem]">
        <p className="font-medium text-lg text-red-500">{property?.type}</p>
        <h2 className="font-semibold text-xl">{property?.title}</h2>
        <address>{property?.address}</address>
        <p>{!flex && property?.description}</p>
        <div className="flex justify-start gap-[1rem]">
          <span>Beds: {property?.bedrooms}</span>
          <span>Baths: {property?.bathrooms}</span>
          <span>{property?.propertySize}</span>
        </div>
      </div>
      <div className={`flex ${!flex ? "flex-col" : "flex-row"} justify-between m-auto border border-t-[#ccc] p-[1rem]`}>
        <div className={`flex gap-[0.5rem]`}>
          <button>
            <FontAwesomeIcon
              icon={faWhatsapp}
              className="text-[tomato] border border-[tomato] p-[0.5rem] rounded-md text-xl hover:bg-red-100"
            />
          </button>
          <button>
            <FontAwesomeIcon
              icon={faPhone}
              className="text-[tomato] border border-[tomato] p-[0.5rem] rounded-md text-xl hover:bg-red-100"
            />
          </button>
          <button>
            <FontAwesomeIcon
              icon={faAt}
              className="text-[tomato] border border-[tomato] p-[0.5rem] rounded-md text-xl hover:bg-red-100"
            />
          </button>
        </div>
        <Link
          href={`/properties/${property.id}`}
          className="text-[tomato] border border-[tomato] p-[0.5rem] rounded-xl text-xl hover:bg-red-100"
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
