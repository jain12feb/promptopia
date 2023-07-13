"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";
import { toast } from "react-toastify";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-0 space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  function allLetter(inputtxt) {
    var letters = /^[#][A-Za-z]+$/;
    if (inputtxt.match(letters)) {
      return true;
    } else {
      toast.error("You Can't Use Sybmols");
      inputtxt = inputtxt.split("");
      inputtxt.pop();
      setSearchText(inputtxt.join(""));
      return true;
    }
  }

  const filterPrompts = (searchtext) => {
    // if (allLetter(searchtext)) {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
    // }
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="mt-10 mx-auto w-full max-w-xl flex justify-center items-center flex-col gap-2">
      <form className="relative w-full flex justify-center items-center">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="block w-full rounded-md border border-gray-200 bg-white py-2.5 font-satoshi pl-10 pr-12 text-sm shadow-lg font-medium focus:border-black focus:outline-none focus:ring-0"
        />
        {searchText && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => setSearchText("")}
          >
            <svg
              className="w-4 h-4 text-gray-500 hover:text-gray-900 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />{" "}
            </svg>
          </button>
        )}
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
       (
          <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
        )
      )}
    </section>
  );
};

export default Feed;
