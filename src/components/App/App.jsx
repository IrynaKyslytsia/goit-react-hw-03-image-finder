import { Component } from "react";
import Searchbar from "components/Searchbar/Searchbar";
import ImageGallery from "components/ImageGallery/ImageGallery";
import Modal from 'components/Modal/Modal';
import css from './App.module.css'

class App extends Component {
  state = {
    searchText: '',
    isShowModal: false,
    modalImg: ''
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

  render() {
    const { searchText, isShowModal, modalImg } = this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery searchText={searchText} showModal={this.showModal} />
        {isShowModal && <Modal modalImg={modalImg} onClose={this.closeModal} />}
       </div>
    )
  };

};

export default App;


