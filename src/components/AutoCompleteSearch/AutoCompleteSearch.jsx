import { useEffect, useState } from 'react';

const AutoCompleteSearch = () => {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [cachedResults, setCachedResults] = useState({});

  const fetchData = async () => {
    if (cachedResults[searchTerm]) {
      console.log('cached result');
      setResults(cachedResults[searchTerm]);
      return;
    }

    const data = await fetch(
      `https://dummyjson.com/recipes/search?q=${searchTerm}`
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));

    setResults(data?.recipes);
    console.log('new result');
    setCachedResults((prev) => ({
      ...prev,
      [searchTerm]: data?.recipes,
    }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  console.log({ cachedResults });

  return (
    <div>
      <h3>AutoCompleteSearch</h3>
      <input
        type='text'
        style={{
          width: '500px',
          padding: '5px',
          borderRadius: '4px',
          height: '20px',
        }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setShowResults(true)}
        onBlur={() => setShowResults(false)}
      />
      {showResults && (
        <div
          style={{
            width: '500px',
            margin: 'auto',
            border: '1px solid black',
            padding: '5px',
            textAlign: 'left',
            height: 'auto',
            maxHeight: '500px',
            overflowY: 'scroll',
          }}
        >
          {results?.map((result) => (
            <p
              key={result.id}
              style={{
                padding: '5px',
              }}
              className='result'
            >
              {result.name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
export default AutoCompleteSearch;
