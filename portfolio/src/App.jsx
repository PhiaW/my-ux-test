import { Routes, Route } from 'react-router-dom'
import { routeConfig } from './router/routes.jsx'

function App() {
  return (
    <Routes>
      {routeConfig.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  )
}

export default App
