import "./MenuItem.css";

type Props = {
    data: { title:string, url:string };
}

const MenuItem = ({data}: Props) => {
    return (
            <div className={`menu-item-container`}>
                {data.title}
            </div>

    );
}

export default  MenuItem;