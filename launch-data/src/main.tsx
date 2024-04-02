import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import App from "./App.tsx"
import About from './routes/About.tsx'
import Graph from './routes/Graph.tsx'
import ErrorPage from './routes/ErrorPage.tsx'




ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/graph' element={<Graph/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
