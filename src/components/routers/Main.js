import React from 'react'

export default class Main extends React.Component{
    render(){
        return(
            <div>
                <div>
                    <input placeholder='문구 입력'/>
                    <button>사진 업로드</button> <button>게시</button>
                </div>
                <div>
                <input placeholder='검색'/><button>검색</button>
                </div>
                <div>
                    게시물
                </div>
            </div>
        )
    }
}