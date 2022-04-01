
import './App.css';
import Edit from './components/Edit';
import List from './components/List';
import React, { useRef, useReducer, useMemo, useCallback, useEffect } from 'react';

const reducer = (state, action) => {
  switch(action.type){
    case 'INIT' : {
      return action.data;
    }
    case 'CREATE' : {
      const created_date = new Date().getTime();
      const newItem = {
        ... action.data,
        created_date
      }
      return [newItem, ...state]
    }

    case 'REMOVE': {
      return state.filter((it) => it.id !== action.targetId);
    }

    default : return state;
  }
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {

  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);

  const getData = async() => {
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/comments'
      ).then((res)=> res.json());
      
      //초기값 설정
      const initData = res.slice(0,20).map((it)=>{
        return {
          author : it.email,
          content : it.body,
          emotion : Math.floor(Math.random() * 5)+ 1,
          created_date : new Date().getTime(),
          id : dataId.current++
        };
      });

      dispatch({type: "INIT", data:initData})
  }
 //처음 시작할 때 api에 설정한 초기값을 불러옴
  useEffect(()=>{
    getData();
  },[]);


  // 새로운 일기를 전달받음
  const onCreate = useCallback((author, content) => {
    dispatch ({type:"CREATE", data:{author, content, id:dataId.current}})
    dataId.current += 1;
  },[]);

  // 기존 일기 삭제하기
  const onRemove = useCallback((targetId) =>{
    dispatch({type:'REMOVE' ,targetId})
  },[]);

    
  const memoizedDispatches = useMemo(()=>{
    return [onCreate, onRemove]
    //useMemo로 전달해야 하는 이유 : 재생성이 되지 않게 하기 위해
  },[]);

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          <Edit onCreate={onCreate}/>
          <List onRemove={onRemove}/>
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
