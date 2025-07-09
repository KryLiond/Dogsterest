import './DogsList.scss'
import { useEffect, useState, useRef, useCallback } from 'react'
import { dogsApi } from '../../redux/services/dogsApi'
import { DogItem } from '../DogItem/DogItem'
import { SkeletonList } from '../../ui/SkeletonList/SkeletonList'
import { useLocation } from 'react-router-dom';
import { generateRandomNumbers, handlerTop } from '../../utils/utils'

export const DogsList = () => {

    const { pathname } = useLocation(); // текущий путь
    const itemsPerPage = 12; // кол-во li на странице

    const [page, setPage] = useState(1); // Текущая страница
    const [dogs, setDogs] = useState<string[]>([]); // Массив отображаемых li
    const [hasMore, setHasMore] = useState(true); // Есть ли еще li для загрузки
    const loadingMore = useRef(false); // предотвратить множественные запросы, пока запрос выполняется
    const { data: dogsArrFromApi, isLoading, error, refetch } = dogsApi.useGetDogsQuery({ page: page, count: itemsPerPage });

    //  Генерируем случайные числа для лайков
    const randomNumbers = generateRandomNumbers(dogs.length, 1, 50);

    // Загрузка данных из localStorage 
    useEffect(() => {
        if (pathname === '/save') {
            const savedItems = localStorage.getItem('savedDogs');
            const savedDogs = savedItems ? JSON.parse(savedItems) : [];
            setDogs(savedDogs);
            setHasMore(false);
        } else {
            setDogs([]);
            setHasMore(true);
        }
    }, [pathname]);


    // Обработчик скролла для главной страницы
    const handleScroll = useCallback(() => {
        if (pathname !== '/save' &&
            window.innerHeight + document.documentElement.scrollTop + 100 >=
            document.documentElement.offsetHeight &&
            hasMore &&
            !isLoading &&
            !loadingMore.current
        ) {
            setPage((prevPage) => prevPage + 1);
            loadingMore.current = true;
        }
    }, [hasMore, isLoading, pathname]);


    useEffect(() => {
        if (pathname !== '/save') {
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
        return undefined;
    }, [handleScroll, pathname]);


    useEffect(() => {
        if (pathname !== '/save' && dogsArrFromApi) {
            setDogs((prevDogs) => [...prevDogs, ...dogsArrFromApi]);
            if (dogsArrFromApi.length < itemsPerPage) {
                setHasMore(false);
            }
        }
        loadingMore.current = false;
    }, [dogsArrFromApi, itemsPerPage, pathname]);


    const handleRetry = () => {
        setPage(1);
        setDogs([]);
        setHasMore(true);
        refetch();
        loadingMore.current = false;
    };

    // обработка сценария - изображения отсутсвуют
    const [noImagesMessage, setNoImagesMessage] = useState(false);

    useEffect(() => {
        if (pathname === '/save' && !isLoading) {
            const savedItems = localStorage.getItem('savedDogs');
            const savedDogs = savedItems ? JSON.parse(savedItems) : [];
            setNoImagesMessage(savedDogs.length === 0);
        } else {
            setNoImagesMessage(false);
        }
    }, [pathname, dogs, isLoading]);

    return (
        <section className='dogs'>
            <div className="container">
                {isLoading && page === 1 && <SkeletonList />}
                {error &&
                    <div>
                        <h2 style={{ marginBottom: "10px" }}> Произошла ошибка</h2> <button className='btn btn-dark' onClick={handleRetry}>Обновить список</button>
                    </div>}
                {noImagesMessage && (
                    <div className="no-images-message">Изображения отсутствуют</div>
                )}
                <ul className='dogs__list'>
                    {dogs.map((dog, index) => (
                        <li className='dogs__item' key={index}>
                            <DogItem dog={dog} randomNumber={randomNumbers[index]} />
                        </li>
                    ))}
                </ul>
                {isLoading && page > 1 && <SkeletonList />}
                {!hasMore && <div className='dog__end'>Конец списка перейти в <button className='dogs__top' onClick={handlerTop}>начало списка</button></div>}
            </div>
        </section>
    )
}