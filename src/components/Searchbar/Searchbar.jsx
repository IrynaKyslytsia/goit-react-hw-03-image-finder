import { Component } from "react";

class Searchbar extends Component {
    state = {
        query: ''
    };

    handleChange = (e) => {
        const { value } = e.target;
        this.setState({ query: value });
        // console.log(this.state);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.query)
    };

    render() {
        return (
            <header className="searchbar">
                <form className="form" onSubmit={this.handleSubmit}>
                    <button type="submit" className="button">
                        <span className="button-label">Search</span>
                    </button>
    
                    <input
                        className="input"
                        type="text"
                        value={this.state.query}
                        onChange={this.handleChange}
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
            )
        }
};

export default Searchbar;