import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InfoMessage from 'components/Message/Message';
import Loader from 'components/Loader/Loader';
import API from 'services/Pixabey-api';
import ModalWindow from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';
import { Section } from './App.styled';
import { SearchBar } from 'components/Searchbar/Searchbar';
import { GalleryList } from 'components/ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    pictures: [],
    query: '',
    page: 1,
    perPage: 12,
    error: null,
    status: 'idle',
    showModal: false,
    largePicture: '',
    showButton: false,
  };

  componentDidUpdate(_, prevState) {
    const prevQuery = prevState.query;
    const prevPage = prevState.page;
    const { query, page, perPage } = this.state;

    if (prevQuery !== query || prevPage !== page) {
      this.setState({ status: 'pending' });

      API.PixabayAPI(query, page, perPage)
        .then(pictures => {
          if (pictures.total === 0) {
            this.setState({ status: 'idle' });
            return toast.warn('Woops, nothing found for your request');
          }

          if (pictures.total > perPage) {
            this.setState({ showButton: true });
          } else {
            this.setState({ showButton: false });
          }

          this.setState(prevState => ({
            pictures: [...prevState.pictures, ...pictures.hits],
            status: 'resolved',
          }));
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  handleQuerySubmit = query => {
    this.setState({ query, page: 1, pictures: [] });
  };

  openModal = image => {
    this.setState({ showModal: true, largePicture: image });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  loadMorePictures = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { pictures, error, status, showModal, largePicture, showButton } =
      this.state;

    const { handleQuerySubmit, openModal, closeModal, loadMorePictures } = this;

    if (status === 'idle') {
      return (
        <Section>
          <SearchBar handleQuerySubmit={handleQuerySubmit} />
          <InfoMessage message={'Please enter a request'} />
          <ToastContainer />
        </Section>
      );
    }

    if (status === 'pending') {
      return (
        <Section>
          <SearchBar handleQuerySubmit={handleQuerySubmit} />
          <GalleryList pictures={pictures} onClick={openModal}></GalleryList>
          <Loader />
          <ToastContainer />
        </Section>
      );
    }

    if (status === 'rejected') {
      return (
        <Section>
          <SearchBar handleQuerySubmit={handleQuerySubmit} />
          <InfoMessage message={error.message} />
          <ToastContainer />
        </Section>
      );
    }

    if (status === 'resolved') {
      return (
        <Section>
          <SearchBar handleQuerySubmit={handleQuerySubmit} />
          <GalleryList pictures={pictures} onClick={openModal}></GalleryList>
          {showModal && (
            <ModalWindow closeModal={closeModal} largePicture={largePicture} />
          )}
          {showButton && (
            <Button onClick={loadMorePictures}>Load more...</Button>
          )}
          <ToastContainer />
        </Section>
      );
    }
  }
}
