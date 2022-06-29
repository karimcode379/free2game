import { Link } from "react-router-dom";

const Vorschlaege = (props) => {
    console.log(props.platform);
    return (
        <div>
            <Link to={`/gamedetail/${props.id}`}>
                <img src={props.thumbnail} alt="" /></Link>
            <div>
                <Link to={`/gamedetail/${props.id}`}>
                    <div>{props.title}</div>
                </Link>
            </div>
            <div>
                <Link to={`/gamedetail/${props.id}`}>
                    <div>{props.platform}</div></Link>
            </div>
        </div>
    );
};

export default Vorschlaege;