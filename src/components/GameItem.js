import { Link } from "react-router-dom";
import WindowsIcon from '../img/WindowsIcon.png';
import BrowserIcon from '../img/BrowserIcon.png';

const GameItem = (props) => {
  return (
    <div className="gameItem">
      <img src={props.thumbnail} alt="Thumbnail" />
      {/* Card Body - Title, Description, Read More */}
      <div>
        <h3>{props.title}</h3>
        <p>{props.short_description}</p>
        <div>
          <button>
            <Link to={`/gamedetail/${props.id}`}>READ MORE</Link>
          </button>
        </div>
        <div className="bottomIcons">
          <div>
            <img src={props.platform === "PC (Windows)" ? WindowsIcon : BrowserIcon} alt="Plattform" />
          </div>
          <div>{props.genre}</div>
        </div>
      </div>
    </div>
  );
};

export default GameItem;