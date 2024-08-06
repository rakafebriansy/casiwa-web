import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/homepage'
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import NotesPage from './pages/notes';
import NoteDetailsPage from './pages/note-details';
import UploadedPage from './pages/uploaded';
import DownloadedPage from './pages/downloaded';
import ProfilePage from './pages/profile';
import AdminLoginPage from './pages/admin-login';
import AdminDashboardPage from './pages/admin-dashboard';
import RedeemPage from './pages/redeem';
import AdminRedeemPage from './pages/admin-redeem';
import AdminProfilePage from './pages/admin-profile';
import FaqPage from './pages/faq';
import PrivacyPoliciesPage from './pages/privacy-policies';
import TermsAndConditionsPage from './pages/terms-and-conditions';
import NotFoundPage from './pages/not-found';
import AdminNotesPage from './pages/admin-notes';
import AdminNoteDetailsPage from './pages/admin-note-details';
import ForgotPasswordPage from './pages/forgot-password';
import ResetPasswordPage from './pages/reset-password';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/register' element={<RegisterPage />}/>
        <Route path='/notes' element={<NotesPage />}/>
        <Route path='/note-details/:idParams' element={<NoteDetailsPage />}/>
        <Route path='/uploaded' element={<UploadedPage />}/>
        <Route path='/downloaded' element={<DownloadedPage />}/>
        <Route path='/profile' element={<ProfilePage />}/>
        <Route path='/redeem' element={<RedeemPage />}/>
        <Route path='/faqs' element={<FaqPage />}/>
        <Route path='/forgot-password' element={<ForgotPasswordPage />}/>
        <Route path='/reset' element={<ResetPasswordPage />}/>
        <Route path='/privacy-policies' element={<PrivacyPoliciesPage />}/>
        <Route path='/terms-and-conditions' element={<TermsAndConditionsPage />}/>
        <Route path='/admin' element={<AdminLoginPage />}/>
        <Route path='/admin/dashboard' element={<AdminDashboardPage />}/>
        <Route path='/admin/notes' element={<AdminNotesPage />}/>
        <Route path='/admin/redeem' element={<AdminRedeemPage />}/>
        <Route path='/admin/profile' element={<AdminProfilePage />}/>
        <Route path='/admin/note-details/:idParams' element={<AdminNoteDetailsPage />}/>
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
