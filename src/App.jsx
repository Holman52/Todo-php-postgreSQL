
import './App.css'
import Content from './components/Content'
import { ItemsProvider } from './components/context/ContextTask'
import { WebSocketProvider } from './components/context/WebSocketContext'
import FormPost from './components/Form/FormPost'

function App() {
  return (
    <WebSocketProvider>
    <ItemsProvider>
      <div className='main'>
        <FormPost></FormPost>
        <Content></Content>
      </div>
    </ItemsProvider>
    </WebSocketProvider>
  )
}

export default App
