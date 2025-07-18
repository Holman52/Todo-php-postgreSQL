import { useState, useEffect } from "react";
import  Delete  from '../assets/Remove.svg'
import  Edit  from '../assets/Edit.svg'
import './itemsContent.scss'

export default function ItemsContent() {
    const [data, setData] = useState([])
    const [error, setError] = useState()


    const handleRemove = async (id) =>{
          try {
             console.log('Deleting item with ID:', id); // Логируем ID
    
            const response = await fetch('http://localhost/api/test/remove-task.php', {
              method: 'DELETE',
              body: JSON.stringify({ id }),
            });
    
            console.log('Delete response:', response.data); // Логируем ответ сервера
            } catch (err) {
              setError(err.message);
              alert('Failed to delete item');
            } 
            
            console.log(data)
    }
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
  if (error) return <div>Error: {error}</div>;
  return (
    <table className="ItemsContent">
        <thead className="ItemsContent__rw">
            <tr className='ItemsContent__rw-headers'>
                <th className='ItemsContent__rw-headers__task'>Задача</th>
                <th className='ItemsContent__rw-headers__importance'>Степень важности</th>
                <th className='ItemsContent__rw-headers__action'>Дейсвтия</th>
            </tr>
        </thead>
        <tbody>
        {data.map(item => (
                <tr className='ItemsContent__rw-items' key={item.id_task}>
                    <th className='ItemsContent__rw-items__task'>{item.task_desc}</th>
                    <th className='ItemsContent__rw-items__importance'>{item.id_importance}</th>
                    <th className='ItemsContent__rw-items__action'>
                        <img className="govno-cvg" src={Edit} alt="edit" width="30" height="30" />
                        <img onClick={() => handleRemove(item.id_task)} className="govno-cvg" src={Delete} alt="delete" width="30" height="30" />
                    </th>
                </tr>
            ))}
          </tbody>
    </table>
  )
}
