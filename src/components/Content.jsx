import React, { useEffect } from 'react'
import './content.scss'
import { useState } from 'react'



export default function Content() {
  const [data, setData] = useState([])
  const [error, setError] = useState()

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost/api/test/echo-task.php');
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } 
    };

    fetchData();
  },[])
  console.log(data)

  if (error) return <div>Error: {error}</div>;

  return (
    <div className='content'>
        <ul>
          {data.map(item => (
            <li key={item.id_task}>{item.task_desc}-{item.id_importance}</li>
          ))}
        </ul>
    </div>
  )
}
