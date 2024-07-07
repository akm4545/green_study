import styled from "styled-components";
import NewsItem from "./NewsItem";
import {useState, useEffect} from 'react';
import axios from "axios";
import usePromise from "../lib/usePromise";

const NewsListBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3rem;
    width: 768px;
    margin: 0 auto;
    margin-top: 2rem;
    @media screen and (max-width: 768px){
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
    }
`;

const sampleArticle = {
    title: '제목',
    description: '내용',
    url: 'https://google.com',
    urlToImage: 'https://via.placeholder.com/160'
}

const NewsList = ({category}) => {
    //커스텀 훅 사용 전
    // const [articles, setArticles] = useState(null);
    // const [loading, setLoading] = useState(null);

    // useEffect(
    //     () => {
    //         const fetchData = async () => {
    //             setLoading(true);
    //             try {
    //                 const query = category === 'all' ? '' : `&category=${category}`
    //                 const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=kr${query}&apikey=[api키]`);
    //                 setArticles(response.data.articles);
    //             } catch (error) {
    //             console.log(error);
    //             }
    //             setLoading(false);
    //         }
    //         fetchData();
    //     //}, []
    //     }, [category]
    // );
    // if(loading){
    //     return <NewsListBlock>대기중 ...</NewsListBlock>
    // }

    // if(!articles){
    //     return null;
    // }

    //커스텀 훅 사용
    const [loading, response, error] = usePromise(() => {
        const query = category === 'all' ? '' : `&category=${category}`;
        return axios.get(`https://newsapi.org/v2/top-headlines?country=kr${query}&apikey=[api키]`)
    }, [category])

    if(loading){
        return <NewsListBlock>대기중 ...</NewsListBlock>
    }

    if(!response){
        return null;
    }

    if(error){
        return <NewsListBlock>애러발생</NewsListBlock>
    }

    const {articles} = response.data;

    return (
        <NewsListBlock>
            {articles.map(article => (
                <NewsItem
                    key={article.url}
                    article={article}
                />
            ))}
            {/* <NewsItem article={sampleArticle} />
            <NewsItem article={sampleArticle} />
            <NewsItem article={sampleArticle} />
            <NewsItem article={sampleArticle} />
            <NewsItem article={sampleArticle} />
            <NewsItem article={sampleArticle} /> */}
        </NewsListBlock>
    )
}

export default NewsList;