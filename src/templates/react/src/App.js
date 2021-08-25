import React <%= useEffectImport %> from 'react'
import './App.css'
<%- Imports %>


const App = () => {
  <%- UseEffect %>
  
	return (
		<>
			{ <%- renderCondition %>(<p>MADE IN INDIA</p>
			)}
		</>
	)
}

export default App
