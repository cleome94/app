// 파이어베이스에서 db 가져오기
import { db } from './firebase.js'
import { collection, doc, getDocs } from 'firebase/firestore'
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [todos, setList] = useState([])
  const todosCollectionRef = collection(db, "todos");

  useEffect( () => {
    // 비동기식으로 데이터처리 async , await 써주기
    const getLists = async () => {
      const data = await getDocs(todosCollectionRef)
      // console.log(data)
      // {...} 기존 변수에 추가
      setList(
        data.docs.map(
          (doc)=>(
            { ...doc.data(), id:doc.id}
          )
        )
      )
    }
    // getLists() 한번만 실행되게 하기 위해 ,[] <== 사용해주기 (안쓰면 계속 실행 됨)
    getLists();
  }, [])

  const showList = todos.map(
    (value) => {
      <div>
        <h2>{value.content}
        <span className='date'>{value.d_date}</span>
        </h2>
      </div>
    }
  )

  return (
    <div className="App">
      {showList}
    </div>
  );
}

export default App;
