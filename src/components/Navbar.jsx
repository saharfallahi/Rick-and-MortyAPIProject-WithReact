import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "./Modal";
import { Character } from "./CharacterList";

function Navbar({ children }) {
  return (
    <nav className="navbar">
      <Logo />
      {children}
    </nav>
  );
}

export default Navbar;

function Logo() {
  return <div className="navbar__logo">
    <img src="/public/logo.png" alt="" />
  </div>;
}

export function Search({ query, setQuery }) {
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      type="text"
      className="text-field"
      placeholder="search..."
    />
  );
}

export function SearchResult({ numOfResults }) {
  return <div className="navbar__result">found {numOfResults} character</div>;
}

export function Favorites({ favorites,onDeleteFavorites }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Modal title="List of Favorites" open={isOpen} onOpen={setIsOpen}>
        {favorites.map((item) => (
          <Character key={item.id} item={item}>
            <button className="icon red" onClick={()=>{onDeleteFavorites(item.id)}}>
              <TrashIcon />
            </button>
          </Character>
        ))}
      </Modal>
      <button className="heart" onClick={() => setIsOpen(true)}>
        <HeartIcon className="icon" />
        <span className="badge">{favorites.length}</span>
      </button>
    </>
  );
}
