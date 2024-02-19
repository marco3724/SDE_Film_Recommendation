import styles from './previewfilm.module.scss';
export function PreviewFilm({film}){
    return (
        <div className={styles.container}>
        
            <div className={styles.image}><img src={film.image} alt={film.title}/></div>
            <div className={styles.detail}>
            <div className={styles.title}>{film.title}</div>
            <div className={styles.plot}>
                <div>Film plot</div>
                <div>{film.plot}</div>
            </div>
            <div className={styles.info}>
                <div>Duration:</div>
                <div> {film.filmLenght?film.filmLenght:'-'}</div>
            </div>
            <div className={styles.info}>
                <div>Year:</div>
                <div>{film.year}</div>
            </div>
            <div className={styles.info}>
                <div>Genres:</div>
                <div>{film.genres.join(", ")}</div>
            </div>
            <div className={styles.button}><a href={`/film/${film.id}`}>More details</a></div>
            </div>
        </div>
    );
}