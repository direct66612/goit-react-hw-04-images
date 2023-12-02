import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImagesBySearch } from 'API/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ThreeCircles } from 'react-loader-spinner';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [images, setImages] = useState([]);
  const [imageQuery, setImageQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const handleSubmit = imageName => {
    if (imageQuery === imageName) {
      return;
    }
    setImageQuery(imageName);
    setPage(1);
    setImages([]);
    setLoadMore(false);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };
  useEffect(() => {
    const fetchData = async () => {
      if (!imageQuery) return;
      setLoading(true);

      try {
        const imagesStorage = await fetchImagesBySearch(imageQuery, page);

        if (imagesStorage.hits.length !== 0) {
          setImages(prevImages => [...prevImages, ...imagesStorage.hits]);
          setLoadMore(page < Math.ceil(imagesStorage.totalHits / 12));
        } else {
          alert('No found! Please try again.');
        }
      } catch (error) {
        setImages([]);
        alert('Please try reloading this page!');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [imageQuery, page]);

  const handleClick = image => {
    setIsShowModal(true);
    setLargeImageURL(image.largeImageURL);
  };

  const handleModalClose = () => {
    setIsShowModal(false);
    setLargeImageURL('');
  };
  return (
    <div className="App">
      <Searchbar handleSubmit={handleSubmit} />

      {!imageQuery && <h2>Try to find something!</h2>}

      {loading && (
        <ThreeCircles
          height="100"
          width="100"
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor=""
          innerCircleColor=""
          middleCircleColor=""
        />
      )}

      <ImageGallery
        items={images}
        loading={loading}
        handleClick={handleClick}
      />

      {images.length > 0 && loadMore && <Button handleClick={handleLoadMore} />}

      {isShowModal && (
        <Modal largeImageURL={largeImageURL} onClose={handleModalClose} />
      )}
    </div>
  );
};
