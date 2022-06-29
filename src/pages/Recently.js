import GameItem from './../components/GameItem'; import { useLocation } from 'react-router-dom';
import Header from '../components/Header';

const Recently = (props) => {

    const location = useLocation();
    let data = location.state ? location.state : props.data;

    data.sort((a, b) => b.id - a.id);
    const recentlyEight = data.splice(0, 8);

    return (
        <div className="main">
            <Header />
            <div className="mainWrapper">
                <h2></h2>
                <div className="fourGrid">
                    {recentlyEight.map(elt =>
                        <GameItem
                            key={elt.id}
                            id={elt.id}
                            thumbnail={elt.thumbnail}
                            title={elt.title}
                            short_description={elt.short_description}
                            platform={elt.platform}
                            genre={elt.genre}
                        />)}
                </div>
            </div>
        </div>
    );
}

export default Recently;