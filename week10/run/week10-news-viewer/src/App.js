import React, { useCallback, useState } from "react";
import axios from "axios";
import NewsList from "./components/NewsList";
import Categories from "./components/Categories";
import { Route, Routes } from "react-router-dom";
import NewsPage from "./pages/NewPage";

const App = () => {
  const [data, setData] = useState(null);
  //const onClick = () => {
    
  //   const onClick = async () => {
  //   //리팩토링
  //   try {
  //     //const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
  //     const response = await axios.get('https://newsapi.org/v2/top-headlines?country=kr&apikey=[api키]');
  //     setData(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }


  //   // 리팩토링 전...
  //   // axios.get('https://jsonplaceholder.typicode.com/todos/1')
  //   // .then(response => {
  //   //   setData(response.data)
  //   // })

  // }

  const [category, setCategory] = useState('all');
  const onSelect = useCallback(category => setCategory(category), []);

  return (
    <div>
      {/* 1번 */}
      {/* <div>
        <button onClick={onClick}>
          불러오기
        </button>
      </div>
      {
        data && 
        <textarea 
          rows={7}
          value={JSON.stringify(data, null, 2)}
          readOnly={true}
        />
      } */}

      {/* 2번 */}
      {/* <Categories
        category={category}
        onSelect={onSelect}
      />
      <NewsList
        category={category}
      /> */}


      {/* 3번 */}
      <Routes>
        <Route path="/" element={<NewsPage/>}/>
        <Route path="/:category" element={<NewsPage/>}/>
      </Routes>
    </div>
  );
}

export default App;

