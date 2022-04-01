import React, { useContext } from 'react';
import { DiaryStateContext } from '../App';
import Item from './item'

const List = () => {

    const Wlist = useContext(DiaryStateContext);

    return (
        <div className='wlist'>
            <h2>{Wlist.length}개의 글이 있습니다.</h2>
            <div>
                {Wlist.map((it)=>(
                    <Item key={it.id} {...it}/>
                ))}
            </div>
        </div>
    )
}

List.defaultProps = { //오류가 나는 경우, 초기화
    WList : [],
}

export default List;