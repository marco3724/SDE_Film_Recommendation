import { useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';  
import styles from'./film.module.scss';
import { FaStar } from 'react-icons/fa';
import Review from '../../components/Review/Review';
function Film() {
    let { filmId } = useParams();
    const [film, setFilm] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        //console.log(film);
        searchFullFilmDetail(filmId);
      }, []);

    const searchFullFilmDetail = async (filmId) => {
        try {
          const response = await fetch(`http://localhost:8005/full_overview_film?filmID=${filmId}`);
          if (!response.ok) {
            throw new Error('response was not ok');
          }
          const data = await response.json();
          console.log(data)
          setFilm(data);
          setIsLoading(false);
        } catch (error) {
          console.error('Fetch error:', error);
        }
      };
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div className={styles.container}>
          <div className={styles.info}>
            <div className={styles.header}>
                <div className={styles.left}>
                    <div className = {styles.title}>{film.title}</div>
                    <div className={styles.genres}>{film.genres.toString().replaceAll(',',' & ')}</div>
                </div>
                <div className={styles.right}>
                    <div className = {styles.rating}><FaStar /> {film.rating.toFixed(2)}<span className={styles.outOf}>/10</span></div>
                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.image}>
                    <img src={film.image} alt="film poster" />
                </div>
                <div className={styles.details}>
                    
                    <div className = {styles.plot}>
                        <div className={styles.plotTitle}>About the Movie</div>
                        <div className={styles.text}>{film.overview}</div>
                    </div>
                    <div className={styles.otherInfo}>
                        <div className={styles.otherInfoLeft}>
                            <div className='releaseDate'>
                                <div className={styles.fieldTitle}>Release Date</div>
                                <div className={styles.fieldContent}>{film.releaseDate}</div>
                            </div>
                            <div className='revenue'>
                                <div className={styles.fieldTitle}>Revenue</div>
                                <div className={styles.fieldContent}>{film.revenue}$</div>

                            </div>
                            <div className='budget'>
                                <div className={styles.fieldTitle}>Budget</div>
                                <div className={styles.fieldContent}>{film.budget}$</div>
                            </div>
                            {/* <div className='adult'>
                                <div className={styles.fieldTitle}>Adult</div>
                                <div className={styles.fieldContent}>{film.adult}</div>
                            </div> */}
                            <div className = {styles.year}>
                                <div className={styles.fieldTitle}>Year</div>
                                <div className={styles.fieldContent}>{film.year}</div>
                            </div>
                            <div className='filmLenght'>
                                <div className={styles.fieldTitle}>Duration</div>
                                <div className={styles.fieldContent}>{film.filmLenght} minutes</div>
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.margin}>
                            <div className={styles.fieldTitle}>Production Company</div>
                            <div className={styles.fieldContent}>{film.productionCompanies.map(x=><div>{x}</div>).slice(0, 2)}</div>
                            </div>
                            <div>
                            <div className={styles.fieldTitle}>Main Cast</div>
                            <div className={styles.fieldContent}>{film.services.cast.map(x=><div>{x}</div>).slice(0, 3)}</div>
                            </div>
                        </div>
                        <div className={styles.lastColumn}>
                            <div>
                            <div className={styles.fieldTitle}>Streaming platform</div>
                            <div className={styles.fieldContent}>{film.services.services.map(x=><a href={x.link} target='_blank'>{x.service}</a>)} </div>
                            </div>
                            <div className={styles.homepage}>
                                <a href={film.homepage} target='_blank'>
                                    Visit the homepage
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
            <div className={styles.reviews}>
              <div className={styles.review}>
                {
                  film.reviews.map((review, index) => {
                    return (
                        <Review key={index} review={review} />
                    );
                  })
                }
              </div>
            </div>
        </div>
    );
}
export default Film;