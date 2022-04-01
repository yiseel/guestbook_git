import React, { useState, useRef, useContext } from 'react';
import { DiaryDispatchContext } from '../App';

const EditCon = () => {

    const {onCreate} = useContext(DiaryDispatchContext);

    const [state, setState] = useState({
        author : "",
        content : "",
    });

    const HandleChange = function(e){

        setState({
            ...state,
            [e.target.name]: e.target.value,
        })    
    }

    const authorInput = useRef();
    const contentInput = useRef();

    const handleSumbit = () => {

        if(state.author.length < 1){
            authorInput.current.focus();
            return;
        }

        if(state.content.length < 5){
            contentInput.current.focus();
            return;
        }

        alert("글이 등록되었습니다.");
        onCreate(state.author, state.content);
        setState({ //초기화
            author : "",
            content : "",
        });
    }

    return (
        <div className="Edit">
            <h2>방명록</h2>
            <div className='EditArea'>
                <div>
                    <h3>작성자</h3>
                    <input 
                        ref={authorInput}
                        name = "author"
                        value={state.author} 
                        onChange={HandleChange}
                    />
                </div>
                <div>
                    <h3>내용</h3> 
                    <textarea
                        ref={contentInput}
                        name="content"
                        value={state.content}
                        onChange={HandleChange}
                    />
                </div>
                <div>
                    <button onClick={handleSumbit}>등록</button>
                </div>
            </div>
        </div>
    );
};

export default EditCon;