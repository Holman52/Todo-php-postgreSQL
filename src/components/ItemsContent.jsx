import { useState, useEffect } from "react";
import React from "react";
import  Delete  from '../assets/Remove.svg';
import  Edit  from '../assets/Edit.svg';
import  Cancel  from '../assets/Cancel.svg';
import  CheckMark  from '../assets/Check-Mark.svg';
import './itemsContent.scss';

export default function ItemsContent() {
    const [data, setData] = useState([])
    const [error, setError] = useState()
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
        task_desc: '',
        id_importance: ''
    });




    const handleAlert = async (id, desc, importance) =>{
      try{
        console.log('Alert item with id:', id)
        const response = await fetch('http://localhost/api/test/remove-task.php' ,{
          method: 'PUT',
          body: JSON.stringify({id,desc, importance})
        })
        if (!response.ok) {
          throw new Error('Ошибка при отправке формы');
        }
        console.log('Alerted to completed')
      }catch (error){
        setError(error.message)
        console.log(Error)
      }

    } 

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

    const handleEditTask = (item) =>{
      setEditingId(item.id_task);
        setEditForm({
            task_desc: item.task_desc,
            id_importance: item.id_importance
        });
    }
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({
            ...prev,
            [name]: value
        }));
    };
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
                    <th className='ItemsContent__rw-items__task'>
                      {editingId === item.id_task ? (
                                <input
                                    type="text"
                                    name="task_desc"
                                    value={editForm.task_desc}
                                    onChange={handleEditChange}
                                />
                            ) : (
                                item.task_desc
                            )}
                    </th>
                    <th className='ItemsContent__rw-items__importance'>
                      {editingId === item.id_task ? (
                                <input
                                    type="num"
                                    name="id_importance"
                                    value={editForm.task_desc}
                                    onChange={handleEditChange}
                                />
                            ) : (
                                item.id_importance
                            )}
                    </th>
                    <th className='ItemsContent__rw-items__action'>
                        {editingId === item.id_task ? (
                          <React.Fragment>
                             <img 
                                onClick={handleEditTask}
                                className="govno-cvg" src={CheckMark} alt="edit" 
                                // width="30" height="30" 
                              />
                              <img 
                                onClick={() => handleRemove(item.id_task)} 
                                className="govno-cvg" src={Cancel} alt="delete" 
                                width="30" height="30"
                              />
                          </React.Fragment>
                          
                        ) :(
                          <React.Fragment>
                            <img 
                              onClick={() => handleEditTask(item)}
                              className="govno-cvg" src={Edit} alt="edit" 
                              width="30" height="30" 
                            />
                            <img 
                              onClick={() => handleRemove(item.id_task)} 
                              className="govno-cvg" src={Delete} alt="delete" 
                              width="30" height="30"
                            />
                          </React.Fragment>
                        )

                        }
                    </th>
                </tr>
            ))}
          </tbody>
    </table>
  )
}
