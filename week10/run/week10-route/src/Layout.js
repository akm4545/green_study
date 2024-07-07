import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    const goArticles = () => {
        navigate('/articles');
        //navigate('/articles', {replace: true}); // replace 옵션이 true 면 현재 페이지 기록을 남기지 않는다
    }

    return (
        <div>
            <header style={{background: 'lightgray', padding: 16, fontSize: 24}}>
                <button onClick={goBack}>goBack</button>
                <button onClick={goArticles}>게시글목록</button>
            </header>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}

export default Layout;