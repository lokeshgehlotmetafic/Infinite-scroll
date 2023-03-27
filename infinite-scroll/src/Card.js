import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { LinearProgress } from '@mui/material';

export default function Card() {

  const nav = useNavigate()

  const [data , setData] = useState([])
  const [count , setCount] = useState(0)
  const [filterdata , setFilterData] = useState([])
  const [showData , setShowData] = useState(true)

  const handleChange = (e) =>{

   const search = e.target.value
   if(search.length === 0) setFilterData([])

   else{
      const newArr = data.filter((res)=> res.title.toLowerCase().includes(search.toLowerCase()))
      setFilterData(newArr)
   }
  }

  const handleNavigate = (res) =>  {
    nav('/particular-data/' , {state : res})

  }
  

  const apiCall = useCallback(()=>{
    fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${count}`)
    .then(response => response.json())
    .then((data) => setData((prev) => [...prev , ...data.hits]))
    setShowData(false)
  } , [count])

  const fn = useCallback(() => {
       if(window.innerHeight + Math.floor(document.documentElement.scrollTop) === document.scrollingElement.scrollHeight){
        setCount((prev) => prev + 1)
       }  
  }, [])

  useEffect(()=>{
    apiCall()
  } , [apiCall])

  useEffect(()=>{
    window.addEventListener('scroll' , fn);
    return ()=> window.removeEventListener('scroll' , fn)
  } , [fn])


  return (
    <>

    <div key = {Object}>
      <input className = "search-box " type = "text" placeholder = "  Search by title or author" onChange={handleChange} />
    </div>

    <div className='flex'>
      {
        filterdata.length === 0 ?
          data.map((res)=>{
          return (
              <div className='card flex' onClick={ ()=> handleNavigate(res)}>
                <div className='container '>
                  <div><h4>{res.title}</h4></div>                  
                  <div><p>{res.author}</p></div>
                </div>
              </div>
          )
        }) :

        filterdata.map((res)=>{
          return (
              <div className='card flex'>
                <div className='container'>
                  <div><h4>{res.title}</h4></div>                  
                  <div><p>{res.author}</p></div>
                </div>
              </div>
          )
        })

        
        
      }
    </div> 
    
</>
  )
}

