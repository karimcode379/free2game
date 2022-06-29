import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Vorschlaege from './Vorschlaege'

const SearchBar = () => {

    const location = useLocation();

    const navigate = useNavigate();
    const ref = useRef()
    const [data, setData] = useState([]);
    const [result, setResult] = useState([]);
    const [vorschlaege, setVorschlaege] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        const fetchApi = () => {
            fetch('https://free-to-play-games-database.p.rapidapi.com/api/games', options)
                .then(response => response.json())
                .then(json => {
                    setData(json);
                })
        }
        fetchApi();
    }, []);

    useEffect(() => {
        const checkIfClickedOutside = e => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [isMenuOpen])

    const filterSearch = (e) => {
        setResult([]);
        setVorschlaege([]);
        const input = e.target.value;
        return data.filter((item) => {
            if (item.title.toLowerCase().includes(input.toLowerCase())) {
                setResult(result => [...result, item]);
                showVorschlaege();
            } else if (item.publisher.toLowerCase().includes(input.toLowerCase())) {
                setResult(result => [...result, item])
            } else if (item.developer.toLowerCase().includes(input.toLowerCase())) {
                setResult(result => [...result, item])
            } else if (item.genre.toLowerCase().includes(input.toLowerCase())) {
                setResult(result => [...result, item])
            } else if (item.platform.toLowerCase().includes(input.toLowerCase())) {
                setResult(result => [...result, item])
            }
            return null;
        });
    }

    const showVorschlaege = () => {
        setVorschlaege(result.slice(0, 5))
    }

    const clearVorschlaege = () => {
        setVorschlaege([]);
    }

    const keyHandler = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            // navigate('/all', { state: result });
            if (!(location.pathname === '/all')) {
                navigate('/all', { state: result })
            } else {
                navigate('/refresher')
                setTimeout(function () {
                    navigate('/all', { state: result })
                }, 1);
            }
        }
    }

    return (
        <div className="searchBarWrapper">
            <form action="" className="" ref={ref}>
                <input type="text" name="" id="search" onChange={filterSearch} onKeyDown={keyHandler} onClick={() => setIsMenuOpen(oldState => !oldState)} />
                {isMenuOpen && (<div className="ergebnisVorschlaege" onClick={clearVorschlaege}>{vorschlaege[0] && vorschlaege.map(elt =>
                    <Vorschlaege
                        key={elt.id}
                        id={elt.id}
                        thumbnail={elt.thumbnail}
                        title={elt.title}
                        short_description={elt.short_description}
                        platform={elt.platform}
                        genre={elt.genre}
                        data={data}
                    />
                )}</div>)}
            </form>
        </div>
    );
}

export default SearchBar;


