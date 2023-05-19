import { Component } from "react";
import Notiflix from 'notiflix';
import { getImages } from "services/getImages";
import Searchbar from "components/Searchbar/Searchbar";
import ImageGallery from "components/ImageGallery/ImageGallery";
import Button from "components/Button/Button";
import Loader from "components/Loader/Loader";
import Modal from 'components/Modal/Modal';
import css from './App.module.css'

class App extends Component {
  state = {
    searchText: '',
    images: [],
    page: 1,
    error: null,
    status: 'idle',
    isShowModal: false,
    modalImg: ''
  };

   componentDidUpdate(prevProps, prevState) {
        if (prevState.searchText !== this.state.searchText
            || prevState.page !== this.state.page) {
            
             this.setState({ status: 'pending' });

        getImages(this.state.searchText, this.state.page)
            .then(data => {
                if (data.hits.length === 0) {
                    Notiflix.Notify.failure('There are no images...');
                }

                return this.setState(prevState => ({
            images:
              this.state.page === 1
                ? data.hits
                : [...prevState.images, ...data.hits],
            status: 'resolved',
          }));
            })
            .catch(error => this.setState({ error, status: 'rejected' }))
        }
  };
  
  onLoadMore = () => {
        this.setState(prevState => {
            return { page: prevState.page + 1 }
        })
    };

  handleSearch = (searchText) => {
    this.setState({ searchText })
  };

  showModal = (modalImg) => {
    this.setState({ isShowModal: true, modalImg })
  };

  closeModal = () => {
    this.setState({ isShowModal: false })
  };

  clearImageGallery = () => {
    this.setState({ images: [], page: 1 })
  };

  render() {
    const { images, page, isShowModal, modalImg, error, status } = this.state;

    if (status === 'idle') {
      return (
        <>
          <Searchbar
            onSubmit={this.handleSearch}
            onClear={this.clearImageGallery}
            resetPage={page}
            resetGallery={images} />
          <h1>Enter something</h1>
        </>
      )      
    }

    if (status === 'pending') {
      return (
        <>
          <Searchbar
            onSubmit={this.handleSearch}
            onClear={this.clearImageGallery}
            resetPage={page}
            resetGallery={images}/>
          <Loader />
          <ImageGallery
            images={images}
            showModal={this.showModal} />
          {images.length > 0 && <Button onClick={this.onLoadMore} />}
        </>
      )
    }
    
    if (status === 'rejected') {
        return <div>{ error.message }</div>
    }
    
    if (status === 'resolved') {
        return (
      <div className={css.app}>
            <Searchbar
              onSubmit={this.handleSearch}
              onClear={this.clearImageGallery}
              resetPage={page}
              resetGallery={images}/>
            <ImageGallery
              images={images}
              showModal={this.showModal} />
        {images.length > 0 && <Button onClick={this.onLoadMore} />}
        {isShowModal && <Modal modalImg={modalImg} onClose={this.closeModal} />}
      </div>
      )
    }    
  };
};

export default App;


