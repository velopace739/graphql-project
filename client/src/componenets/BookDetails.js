import { useQuery } from '@apollo/client';
import { getBookQuery } from '../queries/queries';

function BookDetails({ bookId }) {
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: {
      id: bookId
    }
  });

  const displayBookDetails = () => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: (</div>;
  
    const { book } = data;
    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this author:</p>
          <ul className="other-books">
            {book.author.books.map(item => <li key={item.id}>{item.name}</li>)}
          </ul>
        </div>
      );
    } else {
      return <div>No book selected</div>;
    }
  }

  return (
    <div id="book-details">
      {displayBookDetails()}
    </div>
  );
}

export default BookDetails;
