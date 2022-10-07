import Routes from '../../Routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { useState } from 'react'
<% if(isAuth0) {%>import { useAuth0 } from '../../react-spa'<%}%>
<% if(isOkta) {%>import AppWithRouterAccess from '../../oktaFiles/AppWithRouterAccess'<%}%>
<% if(isThemeProvider) { %>import { ThemeToggler } from '../../theme'<% } %>
<% if (isCognito) {%>
import Button from '../atoms/Button'
import { withAuthenticator } from '@aws-amplify/ui-react'
<%}%>
const NavBar = ({ brand, links <% if(isCognito){%>,signOut<%}%>}) => {
	<% if(isAuth0) {%>const { logout } = useAuth0()<%}%>
	const [isExpanded, toggleExpansion] = useState(false)
	return (
		<Router>
			<nav className='flex items-center container justify-between flex-wrap  p-6 mx-auto'>
				<span className='self-center text-xl font-bold whitespace-nowrap dark:text-white'>
					{brand}
				</span>
				<div className='block md:hidden'>
					<button
						className='inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 '
						onClick={() => toggleExpansion(!isExpanded)}
					>
						<svg
							className='fill-current h-3 w-3'
							viewBox='0 0 20 20'
							xmlns='http://www.w3.org/2000/svg'
						>
							<title>Menu</title>
							<path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
						</svg>
					</button>
				</div>
				<div
				className={`${
					isExpanded ? `block` : `hidden`
				} w-full block flex-grow md:flex md:items-center md:w-auto`}>
					<div className='text-sm md:flex-grow'>
						<ul className='flex justify-start p-4 mt-4 rounded-md  xs:flex-col sm:flex-col md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:text-white dark:bg-[#1d1717]'>
							{links.map((each, i) => (
								<li key={i}>
									<a
										href={each.href}
										className='block py-2 pr-4 pl-3 rounded md:bg-transparent md:p-0 dark:text-white'
										aria-current='page'
									>
										{each.label}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>
					<div className='grow'>
						<div className='float-right'>
						</div>
					</div>
					<% if(isAuth0) {%>
						<ul>
							<li className='m-1'
								onClick={() => logout({ returnTo: window.location.origin })}
							>
								Logout
							</li>
						</ul>
						<%}%>
					<% if(isOkta) { %><AppWithRouterAccess /> <% } %>
					<% if(isCognito){%><Button onClick={signOut} name='Logout' variant='' /><%}%>
					<% if(isThemeProvider) { %><ThemeToggler/><% } %>
			</nav>
			<Routes />
		</Router>
	)
}
<% if(isCognito){%>export default withAuthenticator(NavBar)
	<%} else { %>export default NavBar <%}%>
