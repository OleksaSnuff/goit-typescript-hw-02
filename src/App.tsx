import { useState, useEffect } from "react";
import css from "./App.module.css";
import SearchBar from "./components/SearchBar/SearchBar";
import fetchQuery from "./gallery-api";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import { InfinitySpin } from "react-loader-spinner";
import { FetchedData, PhotoData } from "./types";

function App() {
  const [query, setQuery] = useState<string>("");
  const [photos, setPhotos] = useState<PhotoData[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [currPage, setCurrPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(-1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalPhoto, setModalPhoto] = useState<PhotoData | null>(null);

  useEffect(() => {
    async function fetchPhoto(): Promise<void> {
      if (query.length > 0) {
        try {
          setLoader(true);
          setError(false);
          const fetchedData: FetchedData = await fetchQuery(query, currPage);
          setTotalPages(fetchedData.total_pages);
          setPhotos((photos) => [...photos, ...fetchedData.results]);
        } catch (error) {
          setError(true);
        } finally {
          setLoader(false);
        }
      }
    }
    fetchPhoto();
  }, [query, currPage]);

  const loadMore = (): void => {
    setCurrPage(currPage + 1);
  };

  function openModal(photo: PhotoData): void {
    setModalPhoto(photo);
    setIsModalOpen(true);
  }

  function closeModal(): void {
    setIsModalOpen(false);
  }

  return (
    <>
      <SearchBar setQuery={setQuery} setPhotos={setPhotos} />

      {error && <ErrorMessage />}

      {query.length > 0 && (
        <ImageGallery photoData={photos} onClick={openModal} />
      )}

      {loader && (
        <div className={css.spiner}>
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      )}

      {currPage <= totalPages && <LoadMoreBtn loadMore={loadMore} />}

      {isModalOpen && (
        <ImageModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          modalPhoto={modalPhoto}
        />
      )}
    </>
  );
}

export default App;
