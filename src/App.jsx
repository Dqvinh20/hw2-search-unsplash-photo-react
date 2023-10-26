import { useEffect, useState } from "react";
import "./App.css";
import Loading from "./components/Loading";
import SearchBar from "./components/SearchBar";
import GridImageList from "./components/GridImageList";
import { searchPhoto } from "./api/photo";

function App() {
  const [query, setQuery] = useState("");
  const [imagesList, setImagesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const onSearchSubmit = async (value) => {
    if (value === query && page !== 1) {
      setImagesList([]);
      setPage(1);
      return;
    }
    setQuery(value);
  };

  const onSearchInputChange = (value) => {
    setQuery(value);
  };

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;

    if (bottom) {
      setPage((page) => page + 1);
    }
  };

  useEffect(() => {
    setIsLoading(true);

    const getImages = async () => {
      if (!query) return;
      const response = await searchPhoto({
        query,
        page,
      });
      setImagesList((prev) => [...prev, [...response.results]]);
      setIsLoading(false);
    };

    const debounce = setTimeout(() => getImages(), 1000);
    return () => clearTimeout(debounce);
  }, [query, page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Render
  const renderContent = () => {
    if (!isLoading && query && imagesList.length === 0) {
      return (
        <div className="flex justify-center items-center">
          <p className="text-2xl text-gray-400 ">No results found</p>
        </div>
      );
    }

    if (!query) {
      return (
        <div className="flex justify-center items-center">
          <p className="text-2xl text-gray-400 ">
            Please input to search for images
          </p>
        </div>
      );
    }

    return imagesList.map((images, index) => (
      <GridImageList key={index} images={images} />
    ));
  };

  return (
    <div className="min-h-screen  overflow-hidden p-4">
      <div className="flex flex-col gap-4">
        <SearchBar
          value={query}
          onSubmit={onSearchSubmit}
          onChange={onSearchInputChange}
        />
        <div className="flex-1 flex flex-col gap-4">
          {renderContent()}
          {query && isLoading && (
            <Loading className="flex justify-center items-center " />
          )}
        </div>
      </div>
    </div>
  );
}
export default App;
