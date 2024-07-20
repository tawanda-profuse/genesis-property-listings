"use client";
import Image from "next/image";
import { useParams } from "next/navigation"; // Updated import path
import { useEffect, useState } from "react";

export default function PropertyDetails() {
  const { id } = useParams(); // This will work if `id` is available
  const [property, setProperty] = useState(null);

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

  return (
    <div>
      <div className="flex">
        <div>
          <h1>{property.title}</h1>
          <address>{property.address}</address>
        </div>
        <h1>$11000/mo</h1>
      </div>
      <Image
        src={property.images[0].filePath}
        alt={property.title}
        width={500}
        height={500}
      />
      <h3>Description</h3>
      <p>{property.description}</p>
      <h3>Property Details</h3>
      <div className="grid grid-cols-3">
        <span>Property Id: {property.id}</span>
        <span>Property Type: {property.type}</span>
        <span>Property Status: {property.status}</span>
      </div>
      <div className="grid grid-cols-3">
        <span>Property Size: {property.propertySize}</span>
        <span>Year Built: {property.yearBuilt}</span>
        <span>Property Price: ${property.price}</span>
      </div>
      <h3>Property Features</h3>
    </div>
  );
}
