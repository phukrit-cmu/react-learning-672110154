import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	* { box-sizing: border-box; }
	body {
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
		background: #f7f7f7;
		color: #222;
	}
	h1 { margin-top: 0; }
`;

export default GlobalStyle;
