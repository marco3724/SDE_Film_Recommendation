import {useState} from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import styles from'./search.module.scss';
function Search() {
    return (
        <div className={styles.container}>
        <SearchBar />
        </div>
    );
}
export default Search;