import { Component } from "react";
import Searchbar from "components/Searchbar/Searchbar";
import ImageGallery from "components/ImageGallery/ImageGallery";
import Modal from 'components/Modal/Modal';
import css from './App.module.css'

class App extends Component {
  state = {
    searchText: '',
    showModal: false
  };

  handleSearch = (searchText) => {
    this.setState({ searchText })
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal
    }))
  };

  render() {
    const { searchText, showModal } = this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery searchText={searchText} />
        {showModal && <Modal />}
       
      </div>
    )
  };

};

export default App;


