import { createGlobalStyle } from 'styled-components'
export const lightTheme = {
	body: 'floralWhite',
	color: '#1d1717',
}

export const darkTheme = {
	body: '#1d1717',
	color: 'floralWhite',
}

export const GlobalStyles = createGlobalStyle`
	body {
        background-color: ${(props) => props.theme.body};
        color:${(props) => props.theme.color};
    }
    .navbar {

        border: 1px solid #434343 !important; 
    }
    .navbar-brand {
        color:${(props) => props.theme.color} !important; 
		font-weight: bold;
	}
	.modal-content {
		background-color: ${(props) => props.theme.body};
		color:'blue' !important;
	}
    .table {
		background-color: ${(props) => props.theme.body};
		color:${(props) => props.theme.color};
		font-weight: bold;
	}
	
	.btn {
		background-color: ${(props) => props.theme.body};
        color:${(props) => props.theme.color};


		`
