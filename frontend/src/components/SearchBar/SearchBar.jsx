import { useState,useEffect} from 'react';

function SearchBar() {
  const [search, setSearch] = useState('')
  const [data, setData] = useState([]);
  const [debouncedValue, setDebouncedValue] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(search);
    }, 200); 

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    if (debouncedValue) {
      fetchData()
    }
  }, [debouncedValue]);

  const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3004/imdb_film/autocomplete?name=${search}`);
        if (!response.ok) {
          throw new Error('response was not ok');
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => {
            setSearch(e.target.value)
        }}
      />
      <div>
        {data.map((item, index) => {
          return <a href={`/film/${item.id}`} key={index} >{item.title}</a>
        })}
      </div>
    </div>
  );
}
export default SearchBar;