import { useEffect, useState } from "react";

function History() {
    const [films, setFilms] = useState([]);
    useEffect(() => {
        const r = async () => {
            const data = await f();
            setFilms(data.films);
        };
        r();
    }, []);

    const f = async () => {
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
        <div>
            {
                films.map((film) => {
                    return <p>{film.title}</p>
                })
            }
        </div>
    );
}

export default History