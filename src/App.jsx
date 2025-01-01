import Navbar, { Favorites, Search, SearchResult } from "./components/Navbar";
import "./App.css";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import useCharacters from "./hooks/useCharacters";
import useLocalStorage from "./hooks/useLocalStorage";


function App() {
  const [query, setQuery] = useState("");
  const { isLoading, characters } = useCharacters(
    "https://rickandmortyapi.com/api/character?name",
    query
  );
  const [selectedId, setSelectedId] = useState(null);
  const [favorites, setFavorites] = useLocalStorage("FAVORITES",[]);

  const handleSelectCharacter = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  const handleAddFavorites = (character) => {
    setFavorites((prevFav) => [...prevFav, character]);
  };

  const handleDeleteFavorites = (id) => {
    setFavorites((prevFav) => prevFav.filter((fav) => fav.id !== id));
  };

  const isInFavorites = favorites.map((fav) => fav.id).includes(selectedId);

  return (
    <div className="app">
      {/* <Toaster /> */}
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResults={characters.length} />
        <Favorites
          favorites={favorites}
          onDeleteFavorites={handleDeleteFavorites}
        />
      </Navbar>
      <div className="main">
        <CharacterList
          selectedId={selectedId}
          characters={characters}
          isLoading={isLoading}
          onSelectCharacter={handleSelectCharacter}
        />
        <CharacterDetail
          selectedId={selectedId}
          onAddFavorites={handleAddFavorites}
          isInFavorites={isInFavorites}
        />
      </div>
    </div>
  );
}

export default App;
