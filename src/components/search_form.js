import React, { Component } from 'react';

class SearchForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ''
        }
        this.update = this.update.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.updateTextSearch(this.state.text);
    }

    render() {
        return (
            <section className="search-form">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Search Term
                        <input type="text"
                        value={this.state.text}
                        onChange={this.update("text")}/>
                    </label>
                    <input type="submit" value="Search" />
                </form>
            </section>
        )
    }
}

export default SearchForm;