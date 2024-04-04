"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import "./hadith.css";
import { Icon } from "@iconify/react";

const API_URL = "https://www.hadithapi.com/public/api/hadiths";
const API_KEY = "$2y$10$Nua3kSX7XV8rj0yx5dKNCOjMNh6I0nuhZif5IoxvDczCjfbR02Cr2";

const HadithsPage = () => {
  const [hadiths, setHadiths] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentHadithIndex, setCurrentHadithIndex] = useState(0);

  useEffect(() => {
    fetchHadiths(currentPage);
  }, [currentPage]);

  const fetchHadiths = async (page) => {
    try {
      const response = await axios.get(
        `${API_URL}?apiKey=${API_KEY}&page=${page}`
      );
      setHadiths(response.data.hadiths.data);

      setTotalPages(response.data.total);
    } catch (error) {
      console.error("Error fetching hadiths:", error);
    }
  };

  const handleNextHadith = () => {
    setCurrentHadithIndex((prevIndex) => (prevIndex + 1) % hadiths.length);
  };

  const handlePrevHadith = () => {
    setCurrentHadithIndex((prevIndex) =>
      prevIndex === 0 ? hadiths.length - 1 : prevIndex - 1
    );
  };

  const currentHadith = hadiths[currentHadithIndex];

  const handleCopyToClipboard = () => {
    const currentHadith = hadiths[currentHadithIndex];
    if (currentHadith) {
      navigator.clipboard
        .writeText(currentHadith.hadithEnglish)
        .then(() => {
          console.log("Text copied to clipboard");
        })
        .catch((error) => {
          console.error("Failed to copy text to clipboard:", error);
        });
    }
  };

  return (
    <div className="hadithContainer">
      <div className="hadithWrapper">
        <div className="hadithTitle">
          <h1>Hadiths</h1>
          <button onClick={handleCopyToClipboard}>
            <Icon icon="bi:copy" width="1.8rem" height="1.8rem" />
          </button>
        </div>

        <div className="hadithText">
          <p>{currentHadith?.hadithEnglish}</p>
        </div>

        <div className="btnWrapper">
          <button
            onClick={handleNextHadith}
            disabled={currentHadithIndex === 0}
            className="scanderyBtn"
          >
            Previous
          </button>
          <button onClick={handlePrevHadith} className="primaryyBtn">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HadithsPage;
