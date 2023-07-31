import { useState, useEffect } from 'react';
import {
  ImageGalleryList,
  BsCardImageSvg,
  ImCryingSvg,
  ErrorMessage,
} from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from '../Button/Button';
import { toast } from 'react-toastify';

import SearchingApiServices from 'services/pixabayApi';

const searchingApiServices = new SearchingApiServices();

function ImageGallery({ itemTag }) {
  const [galleryItems, setGalleryItems] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [isButtonActive, setIsButtonActive] = useState(true);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    if (!itemTag) {
      return;
    }
    setStatus('pending');
    setIsButtonActive(true);
    searchingApiServices.query = itemTag;
    searchingApiServices.resetPage();
    searchingApiServices
      .fetchPhotoCards()
      .then(({ hits }) => {
        if (hits.length === 0) {
          throw new Error(`No pictures found for ${itemTag}`);
        }
        if (hits.length < 12) {
          setIsButtonActive(false);
        }
        setGalleryItems(hits);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [itemTag]);

  const getMorePictures = () => {
    setLoadMore(true);
    searchingApiServices
      .fetchPhotoCards()
      .then(({ hits }) => {
        if (hits.length === 0) {
          toast.warn(`Sorry! There are no more "${itemTag}" pictures!`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
          setLoadMore(false);
          setIsButtonActive(false);
          return;
        }
        setGalleryItems(prevState => [...prevState, ...hits]);
        setStatus('resolved');
        setLoadMore(false);
        setIsButtonActive(true);
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  };

  if (status === 'idle') {
    return <BsCardImageSvg />;
  }

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'rejected') {
    return (
      <>
        <ErrorMessage>{error.message}</ErrorMessage>
        <ImCryingSvg />
      </>
    );
  }

  if (status === 'resolved') {
    return (
      <>
        <ImageGalleryList>
          {galleryItems.map(item => {
            const { id, webformatURL, tags, largeImageURL } = item;
            return (
              <ImageGalleryItem
                key={id}
                src={webformatURL}
                alt={tags}
                largeImageURL={largeImageURL}
              />
            );
          })}
        </ImageGalleryList>
        {isButtonActive && (
          <Button
            type="button"
            onClick={getMorePictures}
            loader={loadMore}
            disabled={!isButtonActive}
          >
            Get more
          </Button>
        )}
      </>
    );
  }
}

export default ImageGallery;
