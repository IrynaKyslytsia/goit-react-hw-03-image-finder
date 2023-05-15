import { Component } from "react";
// import { ImSearch } from "react-icons/im";
import css from './Searchbar.module.css';

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
            <header className={css.searchbar}>
                <form className={css.form} onSubmit={this.handleSubmit}>
                    <button type="submit" className={css.button}>
                        <span className={css.buttonLabel}>Search</span>
                    </button>
    
                    <input
                        className={css.input}
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