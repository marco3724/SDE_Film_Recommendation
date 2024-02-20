import { useState,useEffect} from 'react';
import styles from './searchbar.module.scss';
import {FaSearch} from 'react-icons/fa'
import { BeatLoader } from 'react-spinners';
function SearchBar() {
  const [search, setSearch] = useState('')
  const [data, setData] = useState([]);
  const [debouncedValue, setDebouncedValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
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
        setIsLoading(false);
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
          onKeyDown={()=>{
            setData([])
            setIsLoading(true)}}
          onChange={(e) => {
              setSearch(e.target.value)
          }}
        />
        <FaSearch color='#1e90ff' className={styles.icon}/>
      </div>
      <div className={styles.styledItems}>
     { search.length>0 && isLoading && <BeatLoader color='#1e90ff' />}
      {data.map((item, index) => {
        return <a className={styles.item} href={`/film/${item.id}`} key={index} >{item.title}</a>
      })}
      </div>
    </>
  );
}
export default SearchBar;