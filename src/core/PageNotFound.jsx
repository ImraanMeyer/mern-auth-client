import React from 'react';
import { withRouter } from 'react-router-dom';

const pageNotFound = () => (
	<React.Fragment>
		<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet" />

		<div
			className="text-center d-flex"
			style={{ fontFamily: 'Poppins', height: '100vh', justifyContent: 'center', alignItems: 'center' }}
		>
			<h1>Oof! This page does not exist. 😐</h1>
		</div>
	</React.Fragment>
);

export default withRouter(pageNotFound);
