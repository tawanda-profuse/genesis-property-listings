"use client";
import PropertyCard from "@/app/(components)/PropertyCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faTableCells } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function Listings() {
  const [listings, setListings] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("for-sale");
  const [currentPage, setCurrentPage] = useState(1);
  const [view, setView] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    async function fetchListing() {
      try {
        const response = await fetch(
          `https://fsboafrica.com/api/properties/${filter}?search=${filter}`
        );
        const data = await response.json();
        if (data.status === "success") {
          setListings(data.data);
          setIsLoading(false);
        } else {
          setListings(null);
          setIsLoading(true);
        }
      } catch (error) {
        setListings(null);
        setIsLoading(true);
        console.error("Error fetching property:", error);
      }
    }

    fetchListing();
  }, [filter]);

  const indexOfLastListing = currentPage * itemsPerPage;
  const indexOfFirstListing = indexOfLastListing - itemsPerPage;
  const currentListings = listings?.slice(
    indexOfFirstListing,
    indexOfLastListing
  );

  const handleFilterChange = (newFilter) => {
    setIsLoading(true);
    setFilter(newFilter);
    setCurrentPage(1); // Reset to page 1 on filter change
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <main className="flex flex-col md:flex-row justify-between items-start py-[2rem] px-[4rem] gap-[2rem]">
      <aside className="w-full md:w-[30%] flex flex-col items-center gap-[2rem] px-[1rem] py-[2rem] border border-[#ccc] rounded-xl">
        <select
          className="flex justify-between items-center border border-[#ccc] rounded-xl w-full p-[1rem] text-[#999] px-[1rem] cursor-pointer"
          onChange={(e) => handleFilterChange(e.target.value)}
        >
          <option selected>Property Types</option>
          <option value="for-sale" selected={filter === "for-sale"}>
            For Sale
          </option>
          <option value="to-rent" selected={filter === "to-rent"}>
            For Rent
          </option>
        </select>
        <input
          type="text"
          placeholder="Suburb, City, Province, Country"
          className="py-[1rem] border border-[#ccc] rounded-xl w-full p-[1rem]"
        />
        <span className="flex items-center gap-[0.5rem]">
          <input
            type="number"
            placeholder="Min. Price"
            className="w-[50%] py-[1rem] border border-[#ccc] rounded-xl p-[1rem]"
          />
          <input
            type="number"
            placeholder="Max. Price"
            className="w-[50%] py-[1rem] border border-[#ccc] rounded-xl p-[1rem]"
          />
        </span>
        <span className="flex items-center gap-[0.5rem]">
          <input
            type="number"
            placeholder="Min. Beds"
            className="w-[50%] py-[1rem] border border-[#ccc] rounded-xl p-[1rem]"
          />
          <input
            type="number"
            placeholder="Max. Beds"
            className="w-[50%] py-[1rem] border border-[#ccc] rounded-xl p-[1rem]"
          />
        </span>
      </aside>
      <section className="w-full md:w-[80%]">
        <div className="flex justify-between items-center bg-white py-[0.5rem] px-[1rem] mb-[2rem] rounded-lg border border-[#ccc]">
          <span>Sort by:</span>
          <span>{listings ? listings.length : 0} Search Results</span>
          <span className="flex gap-[0.5rem]">
            <button onClick={() => setView(false)}>
              <FontAwesomeIcon
                icon={faList}
                className={`text-red-600 border border-red-600 p-[0.8rem] rounded-md ${
                  !view ? "bg-red-100" : ""
                }`}
              />
            </button>
            <button onClick={() => setView(true)}>
              <FontAwesomeIcon
                icon={faTableCells}
                className={`text-red-600 border border-red-600 p-[0.8rem] rounded-md ${
                  view ? "bg-red-100" : ""
                }`}
              />
            </button>
          </span>
        </div>
        <div
          className={`grid grid-cols-1 md:grid-cols-3 ${
            view ? "md:grid-cols-3" : "md:grid-cols-1"
          } gap-[1rem]`}
        >
          {loading &&
            new Array(3)
              .fill(null)
              .map((_, index) => (
                <div
                  className="w-full rounded-[1rem] h-[100vh] bg-[#ccc] animate-pulse"
                  key={index}
                ></div>
              ))}
          {currentListings &&
            currentListings
              .slice(0, 10)
              .map((item, index) => (
                <PropertyCard key={index} property={item} flex={view} />
              ))}
        </div>
        <div className="flex justify-center gap-[1rem] mt-[2rem]">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentListings?.length < itemsPerPage}
          >
            Next
          </button>
        </div>
      </section>
    </main>
  );
}
