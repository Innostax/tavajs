import Routes from '../../Routes'
import { BrowserRouter as Router } from 'react-router-dom'
<% if(isAuth0) {%>import { useAuth0 } from '../../react-spa'<%}%>
<% if(isOkta) {%>import AppWithRouterAccess from '../../oktaFiles/AppWithRouterAccess'<%}%>
<% if(isThemeProvider) { %>import { ThemeToggler } from '../../theme'<% } %>
<% if (isCognito) {%>
import Button from '../atoms/Button'
import { withAuthenticator } from '@aws-amplify/ui-react'
<%}%>
const NavBar = ({ brand, links <% if(isCognito){%>,signOut<%}%>}) => {
	<% if(isAuth0) {%>const { logout } = useAuth0()<%}%>
	return (
		<Router>
			<nav className=' border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-[#1d1717]'>
				<div className='flex justify-start container items-center mx-auto'>
					<span className='self-center text-xl font-bold whitespace-nowrap dark:text-white'>
						{brand}
					</span>
					<button
						data-collapse-toggle='navbar-default'
						type='button'
						className='inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 '
						aria-controls='navbar-default'
						aria-expanded='false'>
						<span className='sr-only'>Open main menu</span>
						<svg
							className='w-6 h-6'
							aria-hidden='true'
							fill='currentColor'
							viewBox='0 0 20 20'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								fillRule='evenodd'
								d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
								clipRule='evenodd'
							></path>
						</svg>
					</button>

					<div
						className='hidden w-full md:block md:w-auto dark:text-white'
						id='navbar-default'>
						<ul className='flex justify-start p-4 mt-4 rounded-lg border md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:text-white dark:bg-[#1d1717]'>
							{links.map((each) => (
								<li key={each.key}>
									<a
										href={each.href}
										className='block py-2 pr-4 pl-3 rounded md:bg-transparent md:p-0 dark:text-white'
										aria-current='page'>
										{each.label}
									</a>
								</li>
							))}
						</ul>
					</div>
					<div className='grow'>
						<div className='float-right'>
						<% if(isAuth0) {%>
						<ul>
							<li
								onClick={() => logout({ returnTo: window.location.origin })}
							>
								Logout
							</li>
						</ul>
						<%}%>
						</div>
					</div>
					<% if(isOkta) { %><AppWithRouterAccess /> <% } %>
					<% if(isCognito){%><Button onClick={signOut} name='SignOut' variant='' /><%}%>
					<% if(isThemeProvider) { %><ThemeToggler/><% } %>
				</div>
			</nav>
			<Routes />
		</Router>
	)
}
<% if(isCognito){%>export default withAuthenticator(NavBar)
	<%} else { %>export default NavBar <%}%>
