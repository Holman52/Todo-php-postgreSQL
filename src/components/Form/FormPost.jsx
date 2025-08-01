import { useState } from 'react';
import Input from './Input'
import './FormPost.scss'
import Button from '../Button';


export default function FormPost() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    task: '',
    num: '',
  })
  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
    setIsSubmitting(true)
    try {
      const response = await fetch('http://localhost/api/test/post_method.php', {
        method: 'POST',
        'Accept' : 'application/json',
        body: JSON.stringify(formData)
        
      });

      if (!response.ok) {
        throw new Error('Ошибка при отправке формы');
      }
    }
    catch(error){
      console.log(error)
    }
    finally {
      setIsSubmitting(false);
      setFormData({
        task: '',
        num: '',
      })
  }

  
}
console.log(formData)
  return (
    <div className='form'>
      <div 
        className='form-header'
        onClick={() => setIsOpen(!isOpen)}
      >
        Создание таски
        <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </div>
      
      <div className={`form-content ${isOpen ? 'open' : ''}`}>
        <form onSubmit={handleSubmit}>
          <div className='form-post__header-block'>
            <label htmlFor="" className='form-post__header-block__label'>Введите задачу</label>
            <Input
              type='text' 
              name='task' 
              id='text' 
              className='form-post__header-block__input' 
              placeholder='Название задачи'
              value={formData.task}
              onChange={handleChange}
            />
          </div>
           <div className='form-post__header-block'>
            <label htmlFor="" className='form-post__header-block__label'>Введите степень важности</label>
            <Input
              type='number' 
              name='num' 
              id='text' 
              className='form-post__header-block__input-num'
              value={formData.num}
              onChange={handleChange}
            />
          </div>
          <div  className='form-post__button' >
            <Button type='submit' title={isSubmitting ? 'Отправка...' : 'Отправить'}/>
          </div>
        </form>
      </div>
    </div>
  );
}
