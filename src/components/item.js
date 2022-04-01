import React, { useContext } from 'react';
import { DiaryDispatchContext } from '../App';

const Item = ({ author, content, created_date, id }) => {
    
    const {onRemove} = useContext(DiaryDispatchContext);
    

    const handleRemove = () =>{
        if(window.confirm(`${id}번째 글을 삭제하시겠습니까?`)){
            onRemove(id);
        }
    }
    return (
        <div className="items">
            <button className='removeBtn' onClick={handleRemove}>삭제</button>
            <div className="info">
                <span className="author">작성자 : {author}</span>
                <span className="date">
                    {new Date(created_date).toLocaleString()}
                </span>
            </div>
            <div className="content">
                <div>{content}</div>
            </div>

        </div>
    )
}

export default Item;