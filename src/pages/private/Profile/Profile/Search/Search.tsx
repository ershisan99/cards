import React from 'react'
import search from '../../../../../assets/images/search.svg'

type PropsType = {
    callback?: (value: string) => void
}

const Search = ({ callback }: PropsType) => {
    // const [searchTerm, setSearchTerm] = useState('');
    // // Состояние и сеттер состояния для результатов поиска
    // const [results, setResults] = useState([]);
    // // Состояние для статуса поиска (есть ли ожидающий запрос API)
    // const [isSearching, setIsSearching] = useState(false);
    // const debouncedSearchTerm = useDebounce(searchTerm, 500);
    //
    // useEffect(
    //     () => {
    //         // Убедиться что у нас есть значение (пользователь ввел что-то)
    //         if (debouncedSearchTerm) {
    //             // Выставить состояние isSearching
    //             setIsSearching(true);
    //             // Сделать запрос к АПИ
    //             searchCharacters(debouncedSearchTerm).then(results => {
    //                 // Выставить состояние в false, так-как запрос завершен
    //                 setIsSearching(false);
    //                 // Выставит состояние с результатом
    //                 setResults(results);
    //             });
    //         } else {
    //             setResults([]);
    //         }
    //     },
    //     // Это массив зависимостей useEffect
    //     // Хук useEffect сработает только если отложенное значение изменится ...
    //     // ... и спасибо нашему хуку, что оно изменится только тогда ...
    //     // когда значение searchTerm не менялось на протяжении 500ms.
    //     [debouncedSearchTerm]
    // );
    //
    // function searchCharacters(search) {
    //     // const apiKey = 'f9dfb1e8d466d36c27850bedd2047687';
    //     // const queryString `apikey=${apiKey}&titleStartsWith=${search}`;
    //     // return fetch(
    //     //     `https://gateway.marvel.com/v1/public/comics?${queryString}`,
    //     //     {
    //     //         method: 'GET'
    //     //     }
    //     // )
    //         .then(r => r.json())
    //         .then(r => r.data.results)
    //         .catch(error => {
    //             console.error(error);
    //             return [];
    //         });
    // }

    const searchChangeHandler = (e: string) => {
        if (callback) callback(e)
    }

    return (
        <div className="relative grow">
            <img
                className="absolute top-2.5 left-2"
                src={search}
                alt="search icon"
            />
            <input
                className="w-full rounded-sm border bg-light py-2 px-8 text-xs outline-0 transition-all hover:border-secondary focus:border-secondary"
                type="text"
                placeholder="Search..."
                onChange={(e) => searchChangeHandler(e.currentTarget.value)}
            />
        </div>
    )
}

export default Search
