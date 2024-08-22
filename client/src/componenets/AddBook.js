
import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

function AddBook() {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');
  const {
    loading: authorsLoading,
    error: authorsError,
    data: authorsData
  } = useQuery(getAuthorsQuery);
  const [addBook] = useMutation(addBookMutation);

  const submitForm = (e) => {
    e.preventDefault();
    addBook({
      variables: {
        name,
        genre,
        authorId
      },
      refetchQueries: [
        getBooksQuery
      ]
    });
  }

  const displayAuthors = () => {
    if (authorsLoading) return <option disabled>Loading Authors...</option>;
    if (authorsError) return <option disabled>Error :(</option>;

    return authorsData.authors.map(author => (
      <option key={author.id} value={author.id}>{author.name}</option>
    ));
  }

  return (
    <form className="add-book" onSubmit={submitForm}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={ (e) => setName(e.target.value) } />
      </div>

      <div className="field">
        <label>Genre</label>
        <input type="text" onChange={ (e) => setGenre(e.target.value) } />
      </div>

      <div className="field">
        <label>Author:</label>
        <select onChange={ (e) => setAuthorId(e.target.value) }>
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>

      <button>+</button>
    </form>
  );
}

export default AddBook;
