import { BrowserRouter, Routes, Route} from 'react-router-dom';

import { NoteList } from './components/NoteList';
import { CreateNote } from './components/CreateNote';
import { CreateUser } from './components/CreateUser';
import { Header } from './components/Header';
import { EditTask } from './components/EditTask';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' exact element={<NoteList/>}/>
        <Route path='/create' element={<CreateNote/>}/>
        <Route path='/edit/:id' element={<EditTask/>}/>
        <Route path='/users' element={<CreateUser/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
