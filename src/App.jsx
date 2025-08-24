
import './App.css'
import Content from './components/Content'
import { ItemsProvider } from './components/context/ContextTask'
import FormPost from './components/Form/FormPost'


function App() {
  return (
    <ItemsProvider>
      <div className='main'>
        <FormPost></FormPost>
        <Content></Content>
      </div>
    </ItemsProvider>
  )
}

export default App
