// 파이어베이스에서 db 가져오기
import { db } from './firebase.js'
import { collection, getDocs } from 'firebase/firestore'
import './App.css';
import { useEffect } from 'react';

function App() {

  const todosCollectionRef = collection(db, "todos");

  useEffect( () => {
    // 비동기식으로 데이터처리 async , await 써주기
    const getLists = async () => {
      const data = await getDocs(todosCollectionRef)
      console.log(data)
    }
    // getLists() 한번만 실행되게 하기 위해 ,[] <== 사용해주기 (안쓰면 계속 실행 됨)
    getLists();
  }, [] )

  return (
    <div className="App">
    </div>
  );
}

export default App;
