import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";
import Pagination from "../components/Pagination";
import QuestionList from "../components/QuestionList";
import axios from "axios";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const fetchQuestions = async () => {
    try {
      // Only return if it's initial load and no search query and no filter
      if (isInitialLoad && !query && filter === "All") {
        return;
      }

      const res = await axios.get(`http://localhost:5000/api/questions`, {
        params: {
          search: query,
          type: filter !== "All" ? filter : undefined,
          page: currentPage,
        },
      });

      const data = res.data;
      setQuestions(data.questions);
      setTotalPages(Math.ceil(data.total / 10));
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  // Separate useEffect for filter changes as we were not getting the correct data when filter was changed
  useEffect(() => {
    if (!isInitialLoad || filter !== "All") {
      fetchQuestions();
    }
  }, [filter]); 


  useEffect(() => {
    if (!isInitialLoad) {
      fetchQuestions();
    }
  }, [currentPage]);

  const handleSearch = () => {
    setIsInitialLoad(false);
    setCurrentPage(1);
    fetchQuestions();
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setIsInitialLoad(false);
    setCurrentPage(1);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="search-page">
      <div className="hub-title">
        <h1>Question<span>Hub</span></h1>
        <p>Discover, Search, Learn</p>
      </div>
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
      <FilterDropdown filter={filter} setFilter={handleFilterChange} />
      {questions.length > 0 ? (
        <>
          <QuestionList questions={questions} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              scrollToTop();
            }}
          />
        </>
      ) : (
        <div className="no-results">
          {isInitialLoad
            ? "Enter a search term to find questions"
            : "No questions found"}
        </div>
      )}
    </div>
  );
}

export default SearchPage;