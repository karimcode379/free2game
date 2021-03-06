import React, { useRef, useState, useEffect } from 'react';
import GameItem from './../components/GameItem';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';


const All = () => {

    const [data, setData] = useState([]);
    const [showData, setShowData] = useState(data);
    const ref = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMenuOpen2, setIsMenuOpen2] = useState(false);
    const [isMenuOpen3, setIsMenuOpen3] = useState(false);
    const location = useLocation();
    const [genreCriteria, setGenreCriteria] = useState([]);
    const [platformCriteria, setPlatformCriteria] = useState([]);

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [isMenuOpen])

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (isMenuOpen2 && ref2.current && !ref2.current.contains(e.target)) {
                setIsMenuOpen2(false)
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [isMenuOpen2])

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (isMenuOpen3 && ref3.current && !ref3.current.contains(e.target)) {
                setIsMenuOpen3(false)
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [isMenuOpen3])

    const sortBy = (e) => {
        setIsMenuOpen3(false);
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=${e.target.value}`, options)
            .then(response => response.json())
            .then(json => {
                (showData[0] ? setShowData : setData)(json);
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        location.state && setShowData(location.state);
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        const getDataHandler = () => {
            fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games`, options)
                .then(response => response.json())
                .then(json => {
                    setData(json);
                })
                .catch(err => console.error(err));
        }
        getDataHandler();
    }, [location.state]);

    useEffect(() => {
        setShowData([])
        genreCriteria.forEach(criteria => setShowData(arr => [...arr, ...data.filter(elt => elt.genre === criteria)]));
        platformCriteria.forEach(criteria => setShowData([...showData.filter(elt => elt.platform === criteria)]));
        // eslint-disable-next-line
    }, [genreCriteria, platformCriteria, data]);

    const genreFilter = e => {
        if (genreCriteria.some(elt => elt === e.target.value)) {
            setGenreCriteria(arr => arr.filter(elt => elt !== e.target.value))
        } else {
            setGenreCriteria(arr => [...arr, e.target.value])
            const criteria = document.createElement("button");
            criteria.innerHTML = e.target.value;
            criteria.setAttribute("value", e.target.value);
            document.querySelector('.activeFilters').appendChild(criteria);
        }
        setIsMenuOpen2(false);
    }

    const plattformFilter = e => {
        if (platformCriteria.some(elt => elt === e.target.value)) {
            setPlatformCriteria(arr => arr.filter(elt => elt !== e.target.value))
        } else {
            setPlatformCriteria(arr => [...arr, e.target.value])
        }
        setIsMenuOpen(false);
    }

    const allPlattforms = () => {
        setShowData(data.slice())
        setIsMenuOpen(false);
    }

    const sortAZ = () => {
        setIsMenuOpen(false);
        setShowData((showData[0] ? showData : data).slice().sort((a, b) => a.title.localeCompare(b.title)));
    }

    return (
        <div className="main">
            <Header />
            <div className="mainWrapper">
                <div className="fourGrid filters">
                    <div className="filterButton" ref={ref}>
                        <div className="filterTitle">
                            <p>PLATTFORM</p>
                            <div onClick={() => setIsMenuOpen(oldState => !oldState)}>
                                {!isMenuOpen ? "V" : "??"}
                            </div>
                        </div>
                        {isMenuOpen && (
                            <div className="filterList">
                                <button onClick={allPlattforms}>
                                    All Plattforms
                                </button>
                                <button value="PC (Windows)" onClick={plattformFilter}>
                                    Windows (PC)
                                </button>
                                <button value="Web Browser" onClick={plattformFilter}>
                                    Browser (Web)
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="filterButton" ref={ref2}>
                        <div className="filterTitle">
                            <p>GENRE/TAG</p>
                            <div onClick={() => setIsMenuOpen2(oldState => !oldState)}>
                                {!isMenuOpen2 ? "V" : "??"}
                            </div>
                        </div>
                        {isMenuOpen2 && (
                            <div className="filterList scrollContainer">
                                <button value="ARPG" onClick={genreFilter}>
                                    ARPG
                                </button>
                                <button value="Card" onClick={genreFilter}>
                                    Card
                                </button>
                                <button value="Fantasy" onClick={genreFilter}>
                                    Fantasy
                                </button>
                                <button value="Fighting" onClick={genreFilter}>
                                    Fighting
                                </button>
                                <button value="MMO" onClick={genreFilter}>
                                    MMO
                                </button>
                                <button value="MMOARPG" onClick={genreFilter}>
                                    MMOARPG
                                </button>
                                <button value="MMORPG" onClick={genreFilter}>
                                    MMORPG
                                </button>
                                <button value="MOBA" onClick={genreFilter}>
                                    MOBA
                                </button>
                                <button value="Racing" onClick={genreFilter}>
                                    Racing
                                </button>
                                <button value="Shooter" onClick={genreFilter}>
                                    Shooter
                                </button>
                                <button value="Social" onClick={genreFilter}>
                                    Social
                                </button>
                                <button value="Sports" onClick={genreFilter}>
                                    Sports
                                </button>
                                <button value="Strategy" onClick={genreFilter}>
                                    Strategy
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="filterButton" ref={ref3}>
                        <div className="filterTitle">
                            <p>SORT BY</p>
                            <div onClick={() => setIsMenuOpen3(oldState => !oldState)}>
                                {!isMenuOpen3 ? "V" : "??"}
                            </div>
                        </div>
                        {isMenuOpen3 && (
                            <div className="filterList">
                                <button value="relevance" onClick={sortBy}>
                                    Relevance
                                </button>
                                <button value="release-date" onClick={sortBy}>
                                    Release-Date
                                </button>
                                <button value="popularity" onClick={sortBy}>
                                    Popularity
                                </button>
                                <button value="alphabetical" onClick={sortAZ}>
                                    Alphabetical
                                </button>
                            </div>
                        )}
                    </div>
                    <div>
                        <div></div>
                    </div>
                </div>
                <div className="activeFilters"></div>
                <div className="fourGrid">
                    {(showData[0] ? showData : data).map(elt =>
                        <GameItem
                            key={elt.id}
                            id={elt.id}
                            thumbnail={elt.thumbnail}
                            title={elt.title}
                            short_description={elt.short_description}
                            platform={elt.platform}
                            genre={elt.genre}
                            data={data}
                        />
                    )}
                </div >
            </div>
        </div>
    );
};

export default All;
