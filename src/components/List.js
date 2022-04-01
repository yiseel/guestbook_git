import React, { useContext } from 'react';
import { DiaryStateContext } from '../App';
import Item from './item'

const List = ({onRemove}) => {
    const list = useContext(DiaryStateContext);

    return (
        <div className='wlist'>
            <h2>{list.length}개의 글이 있습니다.</h2>
            <div>
                {list.map((it)=>(
                    <Item key={it.id} {...it} onRemove={onRemove}/>
                ))}
            </div>
        </div>
    )
}

List.defaultProps = { //오류가 나는 경우, 초기화
    List : [],
}

export default List;