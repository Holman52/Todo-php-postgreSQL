import { useState } from 'react';
import Input from './Input'
import './FormGet.scss'
export default function FormGet() {

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
        <form action="" className='form-get'>
          <div className='form-get__header-block'>
            <label htmlFor="" className='form-get__header-block__label'>Введите задачу</label>
            <Input
              type='text' 
              name='text' 
              id='text' 
              className='form-get__header-block__input' 
              placeholder='Название задачи' 
            />
          </div>
        </form>
      </div>
    </div>
  );
}
