// 파이어베이스에서 db 가져오기
import { db } from './firebase'
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";
import './App.css';
import { useEffect, useState } from 'react';
import { async } from '@firebase/util';

function App() {
  // 새로고침 안해도 자동으로 바뀌고 보이게하기
  const [changed, setChanged] = useState(false)

  const [newList, setNewList] = useState("");
  // console.log(newList)

  const [todos, setList] = useState([])
  const todosCollectionRef = collection(db, "todos");


  useEffect( () =>{
    // 비동기식으로 데이터처리 async , await 써주기
    const getLists = async () => {
      const data = await getDocs(
        // query(todosCollectionRef, orderBy("열", "정렬순서"))
        query(todosCollectionRef, orderBy("timeStamp", "desc")) // 작성된 순서로 보기 'timeStamp'
        )
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
    setChanged(false)
  }, [changed])

  const date = new Date();
  const now_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()

  const createList = async () => {
    // await addDoc(연결객체, 전달할 값)
    await addDoc(todosCollectionRef,
      {
        content:newList,
        d_date:now_date,
        // 작성된 순서로 보기 (열 추가)
        timeStamp:date
      }
    )
    setChanged(true)
  }
  const updateList = async (id, content) => {
    // alert("TEST");
    // console.log(id + "/" + content);
    const msg = window.prompt("TO DO", content)

    if(msg){
      // id를 이용하여 업데이트 할 데이터 검색
      const listDoc = doc(db, 'todos', id)
      // 업데이트 할 데이터
      const editField = {
        content:msg,
        d_date:now_date,
        // 그때그때 시간 바로구하기 new Date() 사용
        timeStamp:new Date()
      }
      // updateDoc(어떤 데이터, 어떤 값) 데이터 업데이트
      await updateDoc(listDoc, editField)
    }
    setChanged(true)
  }

  const deleteList = async (id) => {
    // alert("TEST");
    const cfm = window.confirm("Are you sure?");

    if(cfm){
      // 아이디를 이용하여 삭제할 데이터 검색
      const listDoc = doc(db, 'todos', id)
      // deleteDoc(어떤 데이터, 어떤 값) 데이터 업데이트
      await deleteDoc(listDoc)
    }
    setChanged(true)
  }

  const showList = todos.map(
    (value) => (
      <div key={value.id}>
        <h2>
          {value.content}
          <span className='date'>{value.d_date}</span>
          <button onClick={() => {updateList(value.id, value.content)}}>EDIT</button>
          <button onClick={() => {deleteList(value.id)}}>DELETE</button>
        </h2>
      </div>
    )
  )

  /* const createList = () => {
    alert("TEST")
  }; */

  return (
    <div className="App">
      <input type="text" placeholder='todos...' onChange={
        (event) => {setNewList(event.target.value)}
        } />
        <button onClick={createList}>Add List</button>
      <hr />
      {showList}
    </div>
  );
}

export default App;
