import { useEffect, useState } from "react";
import { PreviewFilm } from "../../components/PreviewFilm/PreviewFilm";
import styles from './history.module.scss';
function History() {
    const [films, setFilms] = useState([]);
    useEffect(() => {
        const call = async () => {
            const data = await getHistory();
            setFilms(data.films);
        };
        call();
    }, []);

    const getHistory = async () => {
        try {
            const response = await fetch(`http://localhost:8006/recommend_film/get-history`, {
                method: 'GET',
                credentials: 'include'
            });

            const result = await response.json();
            return result;
        } catch (error) {
            return false;
        }
    }

    return (
        <div className={styles.container}>
            {   films ?
                films.map((film) => {
                    return <PreviewFilm film={film} key={film.id} />
                }):
                <h1> No history found</h1>
            }
        </div>
    );
}

export default History