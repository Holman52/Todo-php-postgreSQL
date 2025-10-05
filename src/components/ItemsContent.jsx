<<<<<<< HEAD
import {useEffect, useState} from "react";
=======
import { useState } from "react";
>>>>>>> 8f5de33bf89acfdd4f09a6e3c881b17b610b6f7a
import React from "react";
import  Delete  from '../assets/Remove.svg';
import  Edit  from '../assets/Edit.svg';
import  Cancel  from '../assets/Cancel.svg';
import  CheckMark  from '../assets/Check-Mark.svg';
import './itemsContent.scss';
import InputItem from "./InputItem";
import {useContextTask} from "./context/reducer/reducerCT";
<<<<<<< HEAD
import {ApiTask} from "@/utils/ApiTask.jsx";
=======
>>>>>>> 8f5de33bf89acfdd4f09a6e3c881b17b610b6f7a

export default function ItemsContent() {
    const {  task, handleRemove, handleAlert} = useContextTask();
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
        task_desc: '',
        id_importance: ''
    });
    const {getTask} = ApiTask();

<<<<<<< HEAD
    useEffect(() => {
        getTask()
        console.log(task)
    }, []);
=======
>>>>>>> 8f5de33bf89acfdd4f09a6e3c881b17b610b6f7a

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
    const handleCancelEdit = () => {
      setEditingId(null)
    }

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
        {task.map(item => (
                <tr className='ItemsContent__rw-items' key={item.id_task}>
                    <th className='ItemsContent__rw-items__task'>
                      {editingId === item.id_task ? (
                                <InputItem
                                    type="text"
                                    name="task_desc"
                                    id="task_desc"
                                    className="input-task"
                                    value={editForm.task_desc}
                                    onChange={handleEditChange}
                                />
                            ) : (
                                item.task_desc
                            )}
                    </th>
                    <th className='ItemsContent__rw-items__importance'>
                      {editingId === item.id_task ? (
                                <InputItem
                                    type="num"
                                    id="id_importance"
                                    className="input-importance"
                                    name="id_importance"
                                    value={editForm.id_importance}
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
                                onClick={() =>{handleAlert(item.id_task,editForm.task_desc,editForm.id_importance); setEditingId(null)}}
                                className="govno-cvg" src={CheckMark} alt="edit" 
                                // width="30" height="30" 
                              />
                              <img 
                                onClick={handleCancelEdit} 
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
