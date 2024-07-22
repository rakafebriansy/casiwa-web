import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/homepage'
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import NotesPage from './pages/notes';
import NoteDetailsPage from './pages/note-details';
import TestPage from './pages/test';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/register' element={<RegisterPage />}/>
        <Route path='/notes' element={<NotesPage />}/>
        <Route path='/note-details/:id' element={<NoteDetailsPage />}/>
        <Route path='/test' element={<TestPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
