import './App.css';

import{useState,useEffect} from "react";

const url="http://localhost:3000/products";

function App() {
  const [produtos,setprodutos]=useState([])

  const [name,setname]=useState("");
  const [price,setprice]=useState("");

  //resgatando dados
  useEffect(()=>{
    async function fecthdata(){
      const res =await fetch(url);
      const data =await res.json();
      setprodutos(data);
    }
    fecthdata();
  },[]);

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
