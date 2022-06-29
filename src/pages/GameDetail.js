import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


const GameDetail = () => {

    let { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        const getDataHandler = () => {
            fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options)
                .then(response => response.json())
                .then(data => {
                    setData(data)
                })
                .catch(err => console.error(err));
        }
        getDataHandler();

    }, [id])

    return (
        <div>
            {data &&
                <div>
                    <img src={data.thumbnail} alt="" />
                    <div>
                        <div>
                            <h5>{data.title}</h5>
                            <img src={data.thumbnail} alt="" />
                            <h6>Plattform: {data.platform}</h6>
                            <div>
                                <div>{data.genre}</div>
                                <button>
                                    <a href={data.game_url} target="_blank" rel="noreferrer">PLAY NOW</a>
                                </button>
                            </div>
                        </div>
                        <div>
                            <h2>About</h2>
                            <p>{data.description}</p>
                        </div>
                    </div>
                    {data.screenshots[0] &&
                        <div>
                            <img src={data.screenshots[0].image} alt="" />
                            <img src={data.screenshots[1].image} alt="" />
                        </div>
                    }
                    <div>
                        <div>
                            <div>Additional Information</div>
                            <p>Please note this free-to-play game may or may not offer optional in-game purchases.</p>
                            <div><span>Developer</span> {data.developer}</div>
                            <div><span>Publisher</span> {data.publisher}</div>
                            <div><span>Release Date</span> {data.release_date}</div>
                            {data.minimum_system_requirements &&
                                <div>
                                    <div>Minimum System Requirements &#40;Windows&#41;</div>
                                    <div>
                                        <span>OS</span>
                                        <div>{data.minimum_system_requirements.os}</div>
                                    </div>
                                    <div>
                                        <span>Processor</span>
                                        <div>{data.minimum_system_requirements.processor}</div>
                                    </div>
                                    <div>
                                        <span>Memory</span>
                                        <div>{data.minimum_system_requirements.memory}</div>
                                    </div>
                                    <div>
                                        <span>Graphics</span>
                                        <div>{data.minimum_system_requirements.os}</div>
                                    </div>
                                    <div>
                                        <span>Storage</span>
                                        <div>{data.minimum_system_requirements.storage}</div>
                                    </div>
                                    <div>
                                        <span>Additional Notes</span>
                                        <div>Specifications may change during development</div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>}
        </div>
    );
}

export default GameDetail;