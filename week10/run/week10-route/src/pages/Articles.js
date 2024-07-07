import { Link, Outlet, NavLink } from "react-router-dom";

const Articles = () => {
    const ActicleItem = ({id}) => {
        const activeStyle = {
            color: 'green',
            fontSize: 21
        }
        return (
            <li>
                <NavLink
                    to={`/articles/${id}`}
                    style={({isActive}) => (isActive ? activeStyle : undefined)}
                >
                    게시글 {id}
                </NavLink>
            </li>
        )
    }

    const activeStyle = {
        color: 'green',
        fontSize: 21
    }

    return (
        <div>
            <Outlet/>
            <ul>
                <ActicleItem id={4}/>
                <ActicleItem id={5}/>
                <ActicleItem id={6}/>
                <li>
                    <NavLink 
                        to="/articles/1"
                        style={({isActive}) => (isActive ? activeStyle : undefined)}
                    >
                        게시글 1
                    </NavLink>
                    {/* <Link to="/articles/1">
                        게시글 1
                    </Link> */}
                </li>
                <li>
                    <NavLink 
                        to="/articles/2"
                        style={({isActive}) => (isActive ? activeStyle : undefined)}
                    >
                        게시글 2
                    </NavLink>
                    {/* <Link to="/articles/2">
                        게시글 2
                    </Link> */}
                </li>
                <li>
                    <NavLink
                        to="/articles/3"
                        style={({isActive}) => (isActive ? activeStyle : undefined)}
                    >
                        게시글 3
                    </NavLink>
                    {/* <Link to="/articles/3">
                        게시글 3
                    </Link> */}
                </li>
            </ul>
        </div>
    )
}

export default Articles;