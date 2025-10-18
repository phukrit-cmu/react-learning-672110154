import React from 'react';
import PropTypes from 'prop-types';
import Product from './Product';
import styled from 'styled-components';

export default function Home({ products }) {
	return (
		<>
			<h1>Products</h1>
			<ProductsList>
				{products.map((item) => (
					<Product key={item.id} item={item} />
				))}
			</ProductsList>
		</>
	);
}

Home.propTypes = {
	products: PropTypes.array.isRequired
};

const ProductsList = styled.ul`
	list-style: none;
	margin: 0 -12px;
	padding: 0;
	display: flex;
	flex-wrap: wrap;
`;
