import { Component } from "react";
import Searchbar from "components/Searchbar/Searchbar";
import ImageGallery from "components/ImageGallery/ImageGallery";

class App extends Component {
  state = {
    searchText: ''
  };

  handleSearch = (searchText) => {
    this.setState({searchText})
  }

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery searchText={this.state.searchText} />
       
      </div>
    )
  };

};

export default App;


