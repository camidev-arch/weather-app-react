"use client";

import SearchIcon from "@mui/icons-material/Search";

const Input = () => {
  return (
    <form className="flex items-center w-1/2">
      <input
        type="text"
        className="w-full bg-transparent border-b-2 placeholder-white outline-none text-white"
        placeholder="Search"
      />
      <div className="ml-[-25px] text-white cursor-pointer">
        <SearchIcon />
      </div>
    </form>
  );
};

export default Input;
