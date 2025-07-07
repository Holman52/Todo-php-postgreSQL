import { useState } from 'react';
import Input from './Input'
import './FormPost.scss'
import Button from '../Button';


export default function FormPost() {
  const [isOpen, setIsOpen] = useState(false);


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
        <form action="http://localhost/api/test/post_method.php" method='POST' className='form-post'>
          <div className='form-post__header-block'>
            <label htmlFor="" className='form-post__header-block__label'>Введите задачу</label>
            <Input
              type='text' 
              name='text' 
              id='text' 
              className='form-post__header-block__input' 
              placeholder='Название задачи'
            />
          </div>
           <div className='form-post__header-block'>
            <label htmlFor="" className='form-post__header-block__label'>Введите степень важности</label>
            <Input
              type='number' 
              name='number-importance' 
              id='text' 
              className='form-post__header-block__input-num'
            />
          </div>
          <div  className='form-post__button' >
            <Button type='submit' title='Cоздать'/>
          </div>
        </form>
      </div>
    </div>
  );
}
