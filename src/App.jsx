import { useCallback, useMemo, useState } from 'react';
import styles from './App.module.css';

import SearchBar from './components/SearchBar/SearchBar.jsx';
import ErrorMessage from './components/ErrorMessage/ErrorMessage.jsx';
import Loader from './components/Loader/Loader.jsx';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn.jsx';
import ImageGallery from './components/ImageGallery/ImageGallery.jsx';
import ImageModal from './components/ImageModal/ImageModal.jsx';

import { fetchImages } from './api/unsplashApi.js';

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleFetchImages = useCallback(async (q, p) => {
    setIsError(false);
    setIsLoading(true);

    try {
      const { results, totalPages } = await fetchImages(q, p);

      if (results.length === 0 && p === 1) {
        setImages([]);
        setTotalPages(0);
        return;
      }

      setImages(prev => {
        if (p === 1) {
          return results;
        }
        const existingIds = new Set(prev.map(img => img.id));
        const filtered = results.filter(img => !existingIds.has(img.id));
        return [...prev, ...filtered];
      });

      setTotalPages(totalPages);
    } catch (e) {
      console.error(e);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSearch = useCallback(
    value => {
      const q = value.trim();
      if (!q) return;
      if (q === query && !isError) return;

      setQuery(q);
      setPage(1);
      handleFetchImages(q, 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [query, isError, handleFetchImages]
  );

  const handleLoadMore = useCallback(() => {
    const next = page + 1;
    setPage(next);
    handleFetchImages(query, next).then(() => {
      setTimeout(() => {
        window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
      }, 50);
    });
  }, [handleFetchImages, page, query]);

  const openModalAt = useCallback(idx => {
    setCurrentIndex(idx);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const goPrev = useCallback(() => {
    setCurrentIndex(i => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const goNext = useCallback(() => {
    setCurrentIndex(i => (i + 1) % images.length);
  }, [images.length]);

  const canLoadMore = useMemo(
    () => images.length > 0 && page < totalPages,
    [images.length, page, totalPages]
  );

  return (
    <>
      <SearchBar onSubmit={handleSearch} />

      <main className="main">
        <div className={styles.wrapper}>
          {isError && <ErrorMessage />}

          {!isError && (
            <>
              <ImageGallery images={images} onImageClick={openModalAt} />

              {!isLoading && query && images.length === 0 && (
                <p className={styles.info}>
                  Nothing found for your request “{query}”.
                </p>
              )}

              {!isLoading &&
                query &&
                images.length > 0 &&
                page >= totalPages && (
                  <p className={styles.info}>
                    These are all the results for the query “{query}”.
                  </p>
                )}

              {canLoadMore && <LoadMoreBtn onClick={handleLoadMore} />}

              {isLoading && <Loader />}
            </>
          )}
        </div>
      </main>

      <ImageModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        images={images}
        currentIndex={currentIndex}
        goPrev={goPrev}
        goNext={goNext}
      />
    </>
  );
}

export default App;
