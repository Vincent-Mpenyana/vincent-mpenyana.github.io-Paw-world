import React from 'react';
import './App.css';
import CardList from '../components/CardList';
import { connect } from 'react-redux';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import logo from './pawprint.png';
import Nav from '../components/Nav';
import ErrorBoundary from '../components/ErrorBoundary';

import { setSearchField, fetchCats} from '../actions';

const mapStateToProps = state => {
  return {
    searchField: state.searchCats.searchField,
    isPending: state.fetchCats.isPending,
    error: state.fetchCats.error,
    Cats: state.fetchCats.Cats
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSearchChange: (event) =>dispatch(setSearchField(event.target.value)),
    fetchCats: () => dispatch(fetchCats())
  }
}

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      testing: []
    }
  }
  componentDidMount(){
    this.props.fetchCats();
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(recUsers => {
      this.setState({ testing: recUsers})
    })
  }

  render(){
    const { searchField, onSearchChange, Cats} = this.props;
    const filteredCats = this.state.testing.filter(cat => {
      return cat.name.toLowerCase().includes(searchField.toLowerCase())
    })
    return(
    this.state.testing.length === 0 ? <h1 className='f1 fw7 tc'>Loading...</h1>
    :
      <div className='tc'>
        <Nav>
          <p className='logo'><img src={logo} alt='logo'/></p>
          <SearchBox onSearchChange={onSearchChange}/>
        </Nav>
        <Scroll>
          <ErrorBoundary>
            <CardList cats={filteredCats}/>
          </ErrorBoundary>
        </Scroll>

        <div className='mt4 pa2'>logo downloaded from <a href="https://www.flaticon.com/"           
        title="Flaticon">www.flaticon.com</a>, licensed by 
        <a rel="noopener noreferrer" href="http://creativecommons.org/licenses/by/3.0/"
        title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
