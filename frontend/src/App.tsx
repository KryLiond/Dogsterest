import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainPage } from './pages/MainPage/MainPage'
import { NotFound } from './pages/NotFound/NotFound'
import { Header } from './components/Header/Header'
import { SavePage } from './pages/SavePage/SavePage'

function App() {

  return (
    <BrowserRouter>
      <div className='wrapper'>
        <Header />
        <main className="main">
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/save" element={<SavePage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
