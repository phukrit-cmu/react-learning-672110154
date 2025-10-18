import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Navbar() {
	return (
		<Header>
			<Nav>
				<StyledLink to="/">Home</StyledLink>
				<StyledLink to="/create-product">Create product</StyledLink>
			</Nav>
		</Header>
	);
}

const Header = styled.header`
	background: #fff;
	padding: 16px 24px;
	border-bottom: 1px solid #eee;
`;

const Nav = styled.nav`
	display: flex;
	gap: 16px;
`;

const StyledLink = styled(Link)`
	color: #333;
	text-decoration: none;
	font-weight: 600;
`;
