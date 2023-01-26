import './App.css';

import{useState,useEffect} from "react";

import { chamada } from './componentes/chamada';

const url="http://localhost:3000/products";

function App() {
  const [produtos,setprodutos]=useState([]);

  const {data:items}=chamada(url);
 console.log(items)

  const [name,setname]=useState("");
  const [price,setprice]=useState("");

  
  //adicionando produtos
  const manipularEnvio = async(e)=>{
    e.preventDefault();

    const produto={
      name,
      price,
    };
    const res=await fetch(url,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(produto),
    });
    //carregamento dinamico
    const adicionaProdutos=await res.json();

    setprodutos((prevProdutos)=> [...prevProdutos,adicionaProdutos]);

    setname("");
    setprice("");
  }


  return (
    <div className="App">
        <h1>Lista de produtos</h1>
        <ol>
          {produtos.map((produto)=>(
            <li key={produto.id}>
              {produto.name}  <span>R$: {produto.price}</span>
            </li>
          ))}
        </ol>
        <div className="adiciona">
          <form onSubmit={manipularEnvio}>
            <label>
              Nome:
              <input 
                type="text"
                value={name}
                name="name"
                onChange={(e)=>setname(e.target.value)}
               />
            </label>
            <label>
              Preço:
              <input 
                type="number"
                value={price}
                name="price"
                onChange={(e)=>setprice(e.target.value)}
               />
            </label>
            <input type="submit" value="criar" />
          </form>
        </div>
    </div>
  );
}

export default App;
