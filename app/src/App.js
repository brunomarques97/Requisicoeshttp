import './App.css';

import{useState,useEffect} from "react";

const url="http://localhost:3000/products";

function App() {
  const [produtos,setprodutos]=useState([])

  useEffect(()=>{
    async function fecthdata(){
      const res =await fetch(url);
      const data =await res.json();
      setprodutos(data);
    }
    fecthdata();
  },[]);


  return (
    <div className="App">
        <h1>Lista de produtos</h1>
        <ul>
          {produtos.map((produto)=>(
            <li key={produto.id}>
              {produto.name}
            </li>
          ))}
        </ul>
    </div>
  );
}

export default App;
