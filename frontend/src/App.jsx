import React, {Suspense}from 'react'
import '@fontsource/dm-serif-text';        // Default weight 400
import '@fontsource/poppins';              // Default weight 400
import '@fontsource/roboto';               // Default weight 400
import '@fontsource/sansation';            // Default weight 400
import '@fontsource/winky-rough';          // Default weight 400
import '@fontsource/smooch-sans';          // Default weight 400

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
const Sign_in = React.lazy(()=>import("./Sign_in/Index"))

const App = () => {
  return (
    <main>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path='/' element={<Sign_in/>}/>
            </Routes>
          </Suspense>
        </Router>
    </main>
  )
}

export default App