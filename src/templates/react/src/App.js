import React <%= useEffectImport %> from 'react'
import './App.css'
<%= auth0Imports %>

const App = () => {
  <%= auth0UseEffect %>
  
	return (
		<>
			{ <%= renderCondition %>(<p>MADE IN INDIA</p>
			)}
		</>
	)
}

export default App
