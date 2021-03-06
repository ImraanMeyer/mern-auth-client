import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { isAuth, signout } from '../auth/Helpers';


const Layout = ({ children, match, history }) => {
	const isActive = (path) => {
		if (history.location.pathname === path) {
			return { color: '#90adff' };
		} else {
			return { color: '#fff' };
		}
		// if (match.path == path) {
		// 	return { color: '#90adff' };
		// } else {
		// 	return { color: '#fff' };
		// }
	};

	const nav = () => (
		<ul className="nav nav-tabs bg-dark"  style={{fontFamily: 'Poppins'}}>
			<li className="nav-item">
				<Link to="/" className="nav-link" style={isActive('/')}>
					Home
				</Link>
			</li>
			{!isAuth() && (
				<React.Fragment>
					<li className="nav-item">
						<Link to="/signin" className="nav-link" style={isActive('/signin')}>
							SignIn
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/signup" className="nav-link" style={isActive('/signup')}>
							Signup
						</Link>
					</li>
				</React.Fragment>
			)}
			{isAuth() &&
			isAuth().role === 'admin' && (
				<li className="nav-item">
					<Link className="nav-link" to="/admin" style={isActive('/admin')}>
						{isAuth().name}
					</Link>
				</li>
			)}
			{isAuth() &&
			isAuth().role === 'subscriber' && (
				<li className="nav-item">
					<Link className="nav-link" to="/private" style={isActive('/private')}>
						{isAuth().name}
					</Link>
				</li>
			)}
			{isAuth() && (
				<li className="nav-item">
					<span
						className="nav-link"
						onClick={() => {
							signout(() => {
								history.push('/');
							});
						}}
						style={{ color: '#fff', cursor: 'pointer' }}
					>
						Signout
					</span>
				</li>
			)}
		</ul>
	);

	return (
		<Fragment >
			<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
    
			{nav()}
			<div className="container" style={{fontFamily: 'Poppins'}}>{children}</div>
		</Fragment>
	);
};

export default withRouter(Layout);
