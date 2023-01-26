import{useState,useEffect} from "react";

export const chamada=(url)=>{
    const [data,setdata]=useState(null);

    useEffect(()=>{
        const fetchdata=async()=>{
            const res=await fetch(url);
            const json=await res.json();

            setdata(json);
        };
        fetchdata();
    },[url]);
    
    return{data};
}