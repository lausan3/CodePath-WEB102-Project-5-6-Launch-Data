import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import App from "./App.tsx"
import About from './routes/About.tsx'
import Graph from './routes/Graph.tsx'
import ErrorPage from './routes/ErrorPage.tsx'
import LaunchDetail from './routes/LaunchDetail.tsx'
import Layout from './routes/Layout.tsx'




ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index={true} element={<App/>}/>
          <Route index={false} path='/launches/:id' element={<LaunchDetail/>}/>
          <Route index={false} path='/graph' element={<Graph/>}/>
          <Route index={false} path='/about' element={<About/>}/>
          <Route index={false} path='*' element={<ErrorPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
