import React from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import './App.css';
import PropTypes from 'prop-types';

const { Component } = React;

class App extends Component {
	constructor(props) {
		super(props);
		
		this.encodeQuoteData = this.encodeQuoteData.bind(this);
		this.getQuote = this.getQuote.bind(this);
		this.constructTwitterIconHref = this.constructTwitterIconHref.bind(this);
		
		this.state = {
			quoteText: 'Quality means doing it right when no one is looking.',
			quoteAuthor: 'Henry Ford',
			twitterIconHref: ''
		};
	}
	
	constructTwitterIconHref() {
		this.setState({
			twitterIconHref: this.props.twitterIconHref + encodeURIComponent(`${this.state.quoteText} ${this.state.quoteAuthor}`)
		});
	}
	
	encodeQuoteData() {
		return encodeURIComponent(`${this.state.quoteText} ${this.state.quoteAuthor}`);
	}
	
	getQuote() {
	  $.getJSON(this.props.url, ({ quoteText, quoteAuthor }) => {
			this.setState({ 
				quoteText, 
				quoteAuthor,
			});
		}, 'jsonp')
	}
	
	render() {
		return (
			<div id='app'>
				<h1 className="title">You Quote</h1>			
				<div className='content'>
					<Quote 
						quoteText={this.state.quoteText}
						quoteAuthor={this.state.quoteAuthor}
					/>
					<TwitterIcon 
						twitterIconHref={this.state.twitterIconHref}
						constructTwitterIconHref={this.constructTwitterIconHref}
					/>
					<Button getQuote={this.getQuote} />
				</div>
			</div>
		);
	}

}

const Quote = ({ 
	quoteText, 
	quoteAuthor = 'Unknown', 
}) => (
	<blockquote>
		<i className="fa fa-quote-left"></i>
		<p className="quote-text">{quoteText}</p>
		<i className="fa fa-quote-right"></i>
		<footer className="quote-footer"> — <span>{quoteAuthor}</span></footer>
	</blockquote>
);

const TwitterIcon = ({ 
	twitterIconHref,
	constructTwitterIconHref
}) => (
	<div className="icon">
		<a 
			onClick={constructTwitterIconHref}
			href={twitterIconHref}
			target='_blank'><i className="fa fa-twitter"></i>
		</a>
	</div>
);

const Button = ( {getQuote} ) => (
		<button className="btn quote-next" onClick={getQuote}>New Quote!</button>
);
		
App.defaultProps = {
	url: "https://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=jsonp&lang=en&jsonp=?",
	twitterIconHref: "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="
};

App.propTypes = {
	url: PropTypes.string.isRequired,
	twitterIconHref: PropTypes.string.isRequired
};

Quote.propTypes = {
	quoteText: PropTypes.string.isRequired,
	quoteAuthor: PropTypes.string.isRequired
};

TwitterIcon.propTypes = {
	twitterIconHref: PropTypes.string.isRequired,
	constructTwitterIconHref: PropTypes.func.isRequired
}

Button.propTypes = {
	getQuote: PropTypes.func.isRequired
};


export default App;
