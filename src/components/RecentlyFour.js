import GameItem from './GameItem';

const RecentlyFour = (props) => {

    const data = props.data;
    data.sort((a, b) => b.id - a.id);
    const recentlyFour = data.splice(0, 4);

    return (
        <div className="fourGrid recentlyFour">
            {recentlyFour.map((elt) =>
                <GameItem
                    key={elt.id}
                    id={elt.id}
                    thumbnail={elt.thumbnail}
                    title={elt.title}
                    short_description={elt.short_description}
                    platform={elt.platform}
                    genre={elt.genre}
                />
            )
            }
        </div >);
}

export default RecentlyFour;