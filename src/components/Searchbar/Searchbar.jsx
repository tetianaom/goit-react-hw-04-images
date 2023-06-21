import { useState } from 'react';
import PropTypes from 'prop-types';
import { FiSearch } from 'react-icons/fi';
import {
  SearchHeader,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = event => {
    const nextValue = event.target.value;

    if (query !== nextValue) {
      setQuery(nextValue.toLowerCase());
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (query.trim() === '') {
      return;
    }

    onSubmit(query);
    setQuery('');
  };

  return (
    <SearchHeader onSubmit={handleSubmit}>
      <SearchForm>
        <SearchFormBtn type="submit">
          <FiSearch size="16px" />
        </SearchFormBtn>

        <SearchFormInput
          type="text"
          name="search"
          value={query}
          onChange={handleInputChange}
        />
      </SearchForm>
    </SearchHeader>
  );
};

// export class Searchbar1 extends Component {
//   state = {
//     query: '',
//   };

//   handleInputChange = event => {
//     const prevValue = this.state.query;
//     const nextValue = event.target.value;

//     if (prevValue !== nextValue) {
//       this.setState({ query: nextValue.toLowerCase() });
//     }
//   };

//   //   const updateQueryString = (name) => {
//   //   const nextParams = name !== "" ? { name } : {};
//   //   setSearchParams(nextParams);
//   // };

//   handleSubmit = event => {
//     event.preventDefault();

//     if (this.state.query.trim() === '') {
//       return;
//     }

//     this.props.onSubmit(this.state.query);
//     this.setState({ query: '' });
//   };

//   render() {
//     const { query } = this.state;
//     return (
//       <SearchHeader onSubmit={this.handleSubmit}>
//         <SearchForm>
//           <SearchFormBtn type="submit">
//             <FiSearch size="16px" />
//           </SearchFormBtn>

//           <SearchFormInput
//             type="text"
//             name="search"
//             value={query}
//             onChange={this.handleInputChange}
//           />
//         </SearchForm>
//       </SearchHeader>
//     );
//   }
// }

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
