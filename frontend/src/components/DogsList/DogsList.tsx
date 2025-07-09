import './DogsList.scss'
import { useEffect, useState } from 'react'
import { dogsApi } from '../../redux/services/dogsApi'
import { DogItem } from '../DogItem/DogItem'
import { SkeletonList } from '../../ui/SkeletonList/SkeletonList'

export const DogsList = () => {

    const itemsPerPage = 10;

    const [page, setPage] = useState(1); // Текущая страница
    const [dogs, setDogs] = useState<string[]>([]); // Массив отображаемых li
    const [hasMore, setHasMore] = useState(true); // Есть ли еще li для загрузки

    const { data: dogsArr, isLoading, error, refetch } = dogsApi.useGetDogsQuery({ page: page, count: itemsPerPage })

    useEffect(() => {
        if (dogsArr) {
            setDogs((prevDogs) => [...prevDogs, ...dogsArr]);
            if (dogsArr.length < itemsPerPage) {
                setHasMore(false);
            }
        }
    }, [dogsArr, itemsPerPage]);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop + 100 >=
                document.documentElement.offsetHeight &&
                hasMore &&
                !isLoading
            ) {
                setPage((prevPage) => prevPage + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading, hasMore]);

    const handleRetry = () => {
        setPage(1);
        setDogs([]);
        setHasMore(true);
        refetch();
    };

    const handlerTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <section className='dogs'>
            <div className="container">
                {isLoading && page === 1 && <SkeletonList />}
                {error &&
                    <div>
                        <h2 style={{ marginBottom: "10px" }}> Произошла ошибка</h2> <button className='btn btn-dark' onClick={handleRetry}>Обновить список</button>
                    </div>}
                <ul className='dogs__list'>
                    {dogs.map((dog, index) => (
                        <li className='dogs__item' key={index}>
                            <DogItem dog={dog} />
                        </li>
                    ))}
                </ul>
                {isLoading && page > 1 && <SkeletonList />}
                {!hasMore && <div className='dog__end'>Конец списка перейти в <button className='dog__top' onClick={handlerTop}>начало списка</button></div>}
            </div>
        </section>
    )
}