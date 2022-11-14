import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InfoMessage from 'components/Message/Message';
import Loader from 'components/Loader/Loader';
import API from 'services/Pixabey-api';
import ModalWindow from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';
import { Section } from './App.styled';
import SearchBar from 'components/Searchbar/Searchbar';
import { GalleryList } from 'components/ImageGallery/ImageGallery';

export default function App() {
  const [pictures, setPictures] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largePicture, setLargePicture] = useState('');
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (!query) return;

    setStatus('pending');

    API.PixabayAPI(query, page)
      .then(pictures => {
        if (pictures.total === 0) {
          setStatus('idle');
          return toast.warn('Woops, nothing found for your request');
        }

        if (pictures.total > perPage) {
          setShowButton(true);
        } else {
          setShowButton(false);
        }

        setPictures(prevState => [...prevState, ...pictures.hits]);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [query, page]);

  useEffect(() => {
    setQuery(query);
    setPage(page);
    setPictures([]);
  }, [query]);

  const openModal = image => {
    setShowModal(true);
    setLargePicture(image);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const loadMorePictures = () => {
    setPage(prevPage => prevPage + 1);
  };

  if (status === 'idle') {
    return (
      <Section>
        <SearchBar handleQuerySubmit={setQuery} />
        <InfoMessage message={'Please enter a request'} />
        <ToastContainer />
      </Section>
    );
  }

  if (status === 'pending') {
    return (
      <Section>
        <SearchBar handleQuerySubmit={setQuery} />
        <GalleryList pictures={pictures} onClick={openModal}></GalleryList>
        <Loader />
        <ToastContainer />
      </Section>
    );
  }

  if (status === 'rejected') {
    return (
      <Section>
        <SearchBar handleQuerySubmit={setQuery} />
        <InfoMessage message={error.message} />
        <ToastContainer />
      </Section>
    );
  }

  if (status === 'resolved') {
    return (
      <Section>
        <SearchBar handleQuerySubmit={setQuery} />
        <GalleryList pictures={pictures} onClick={openModal}></GalleryList>
        {showModal && (
          <ModalWindow closeModal={closeModal} largePicture={largePicture} />
        )}
        {showButton && <Button onClick={loadMorePictures}>Load more...</Button>}
        <ToastContainer />
      </Section>
    );
  }
}
