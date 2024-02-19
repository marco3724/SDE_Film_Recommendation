import { useState,useEffect} from 'react';
import styles from './searchbar.module.scss';
import {FaSearch} from 'react-icons/fa'
function SearchBar() {
  const [search, setSearch] = useState('')
  const [data, setData] = useState([]);
  const [debouncedValue, setDebouncedValue] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(search);
    }, 400); 

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
    <>
      <div className={styles.searchbar}>
        <input 
          type="text"
          placeholder='Search for a movie...'
          value={search}
          onChange={(e) => {
              setSearch(e.target.value)
          }}
        />
        <FaSearch className={styles.icon}/>
      </div>
      <div className={data.length>0 ?styles.styledItems:styles.noHeight}>
      {data.map((item, index) => {
        return <a className={styles.item} href={`/film/${item.id}`} key={index} >{item.title}</a>
      })}
      </div>
    </>
  );
}
export default SearchBar;