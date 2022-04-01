import React, { useContext } from 'react';
import { DiaryDispatchContet } from '../App';

const item = ({ author, content, created_date, onRemove, id }) => {
    
    // const {onRemove} = useContext(DiaryDispatchContet);
    

    const handleRemove = () =>{
        if(window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)){
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

export default item;