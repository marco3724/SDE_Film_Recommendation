import {useState} from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import styles from'./film.module.scss';
function Film() {
    const searchFullFilmDetail = async (filmId) => {
        try {
          const response = await fetch(`http://localhost:8005/full_overview_film?filmID=${filmId}`);
          if (!response.ok) {
            throw new Error('response was not ok');
          }
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error('Fetch error:', error);
        }
      };
    return (
        <div className={styles.container}>
        <SearchBar searchFullFilmDetail={searchFullFilmDetail}/>
        </div>
    );
}
export default Film;