import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layouts/Layout.js';
import MyModules from './components/pages/MyModules.js';
import MyAssessments from './components/pages/MyAssessments.js';
import MySchedule from './components/pages/MySchedule.js';
import PageNotFound from './components/pages/404.js';
import './App.css';


export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='*' element={<PageNotFound />} />
          <Route path='/' element={<MyModules />} />
          <Route path='/assessments'  element={<MyAssessments />} />
          <Route path='/schedule' element={<MySchedule />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
