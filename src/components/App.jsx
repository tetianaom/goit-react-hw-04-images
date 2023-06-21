import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import * as API from 'service/api';

export const App = ({ onSubmit }) => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [per_page] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [isShownButton, setIsShownButton] = useState(false);
  const [error, setError] = useState(null);

  const handleFormSubmit = newQuery => {
    setImages([]);
    setPage(1);
    setQuery(newQuery);
    setError(null);
    setIsShownButton(false);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  useEffect(() => {
    const abortCtrl = new AbortController();
    if (query) {
      async function loadImages() {
        try {
          setIsLoading(true);
          setError(null);

          const data = await API.getImages(query, page, abortCtrl.signal);

          if (!data.hits.length) {
            return 'Sorry. There are no images for your ...';
          }

          setImages(prevState => [...prevState, ...data.hits]);

          setIsShownButton(page < Math.ceil(data.totalHits / per_page));
        } catch (error) {
          setError('Something wrong');
        } finally {
          setIsLoading(false);
        }
      }
      loadImages();
    }
    return () => {
      abortCtrl.abort();
    };
  }, [query, page, per_page]);

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery images={images} />
      {!isLoading && images.length > 0 && isShownButton && (
        <Button onClick={loadMore} />
      )}
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
    </div>
  );
};
