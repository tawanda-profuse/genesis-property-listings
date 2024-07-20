"use client";
import {
  faFacebook,
  faLinkedin,
  faWhatsapp,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useParams } from "next/navigation"; // Updated import path
import { useEffect, useState } from "react";
import axios from "axios";

export default function PropertyDetails() {
  const { id } = useParams(); // This will work if `id` is available
  const [property, setProperty] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (id) {
      console.log("Fetching property with id:", id); // Debug log
      async function fetchProperty() {
        try {
          const response = await fetch(
            `https://fsboafrica.com/api/properties/details/${id}`
          );
          const data = await response.json();
          if (data.status === "success") {
            setProperty(data.data);
          } else {
            console.error("Failed to fetch property");
          }
        } catch (error) {
          console.error("Error fetching property:", error);
        }
      }

      fetchProperty();
    }
  }, [id]);

  if (!property) {
    return <div>Loading...</div>;
  }

  const sendEnquiry = async () => {
    await axios
      .post("https://fsboafrica.com/api/enquiries/create", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        dialingCode: "+263",
        phoneNumber: phoneNumber,
        message: message,
        listingId: id,
        ownedBy: "tawandamsengezi@gmail.com",
      })
      .then(() => {
        alert("Thank you! Message successfully sent.");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <main className="py-[2rem] px-[4rem]">
      <div className="flex w-full flex-wrap gap-[2rem] md:gap-0 justify-between items-end mb-[2rem]">
        <div className="flex-auto md:flex-1 flex flex-col gap-[2rem] md:gap-[0.5rem]">
          <h1 className="text-2xl font-bold">{property.title}</h1>
          <address>{property.address}</address>
        </div>
        <h1 className="flex-auto md:flex-1 w-full text-xl font-bold">
          $11000/mo
        </h1>
        <span className="flex-auto md:flex-[0.8] w-full flex justify-between">
          <FontAwesomeIcon
            icon={faFacebook}
            className="bg-white text-blue-500 text-4xl p-[0.1rem] cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faWhatsapp}
            className="bg-green-400 text-white text-4xl p-[0.1rem] cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faLinkedin}
            className="bg-white text-blue-800 text-4xl p-[0.1rem] cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faXTwitter}
            className="bg-black text-white text-4xl p-[0.1rem] cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faEnvelope}
            className="bg-[#333] text-white text-4xl p-[0.1rem] cursor-pointer"
          />
        </span>
      </div>
      <div className="flex gap-[1rem] flex-wrap">
        <section className="flex-auto md:flex-1 flex flex-col gap-[1rem] justify-center">
          <Image
            src={property.images[0].filePath}
            alt={property.title}
            width={100}
            height={500}
            style={{ width: "100%", height: "70vh" }}
          />
          <h3 className="font-bold text-xl">Description</h3>
          <p>{property.description}</p>
          <h3 className="font-bold text-xl">Property Details</h3>
          <div className="grid grid-cols-3">
            <p>
              <span className="font-bold">Property Id</span>: {property.id}
            </p>
            <p>
              <span className="font-bold">Property Type</span>: {property.type}
            </p>
            <p>
              <span className="font-bold">Property Status</span>:{" "}
              {property.status}
            </p>
          </div>
          <div className="grid grid-cols-3">
            <p>
              <span className="font-bold">Property Size</span>:{" "}
              {property.propertySize}
            </p>
            <p>
              <span className="font-bold">Year Built</span>:{" "}
              {property.yearBuilt}
            </p>
            <p>
              <span className="font-bold">Property Price</span>: $
              {property.price}
            </p>
          </div>
          <h3 className="font-bold text-xl">Property Features</h3>
        </section>
        <aside className="flex-auto md:flex-[0.4] flex flex-col gap-[1rem]">
          <Image
            src="/genesis-logo.png"
            alt="logo"
            width={200}
            height={200}
            style={{ width: "100%" }}
          />
          <h3 className="font-bold text-xl">Housing Investment</h3>
          <button className="w-full border-2 border-red-600 text-red-600 py-[0.5rem] px-[1rem] rounded-lg hover:bg-red-600 hover:text-white">
            <FontAwesomeIcon icon={faWhatsapp} /> Whatsapp Agent
          </button>
          <button className="w-full border-2 border-red-600 text-red-600 py-[0.5rem] px-[1rem] rounded-lg hover:bg-red-600 hover:text-white">
            <FontAwesomeIcon icon={faPhone} /> Call Agent
          </button>
          <input
            type="text"
            placeholder="First Name"
            className="p-[1rem] border border-[#ccc] rounded-lg outline-none"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="p-[1rem] border border-[#ccc] rounded-lg outline-none"
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="p-[1rem] border border-[#ccc] rounded-lg outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="p-[1rem] border border-[#ccc] rounded-lg outline-none"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <textarea
            placeholder="Message"
            className="p-[1rem] border border-[#ccc] rounded-lg outline-none"
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button
            className="w-full border-2 bg-red-600 hover:bg-white hover:text-red-600 text-white p-[1rem] rounded-3xl"
            onClick={sendEnquiry}
          >
            Send Message
          </button>
          <p>
            By sending enquiry messages, you agree to Sold.co.zw&apos;s{" "}
            <a href="/" className="text-red-600 hover:underline">
              Terms & Conditions
            </a>{" "}
          </p>
        </aside>
      </div>
    </main>
  );
}
