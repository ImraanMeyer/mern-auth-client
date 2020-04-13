import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

import Layout from '../core/Layout';

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { isAuth } from './Helpers';

import 'react-toastify/dist/ReactToastify.min.css';

const Signup = () => {
	// Signup State
	const [ values, setValues ] = useState({
		name: 'Imraan',
		email: 'imraan.meyer97@gmail.com',
		password: 'imower12',
		buttonText: 'Submit'
	});

	const { name, email, password, buttonText } = values;

	const handleChange = (name) => (e) => {
		setValues({ ...values, [name]: e.target.value });
	};

	const clickSubmit = (e) => {
		e.preventDefault();
		setValues({ ...values, buttonText: 'Submitting' });

		axios
			.post(`${process.env.REACT_APP_API}/signup`, { name, email, password })
			.then((response) => {
				console.log('SIGNUP SUCCESS', response);
				setValues({ ...values, name: '', email: '', password: '', buttonText: 'Submitted' });
				toast.success(response.data.message);
			})
			.catch((error) => {
				console.log('SIGNUP ERROR', error.response.data);
				setValues({ ...values, buttonText: 'Submit' });
				toast.error(error.response.data.error)
			});
	};

	const signupForm = () => (
		<form>
			<div className="form-group">
				<label className="text-muted">Name</label>
				<input onChange={handleChange('name')} value={name} type="text" className="form-control" />
			</div>

			<div className="form-group">
				<label className="text-muted">Email</label>
				<input onChange={handleChange('email')} value={email} type="email" className="form-control" />
			</div>

			<div className="form-group">
				<label className="text-muted">Password</label>
				<input onChange={handleChange('password')} value={password} type="password" className="form-control" />
			</div>

			<div>
				<button className="btn btn-primary" onClick={clickSubmit}>
					{buttonText}
				</button>
			</div>
		</form>
    );


	return (
		<Layout>
			<div className="col-md-6 offset-md-3">
				<ToastContainer />
				{isAuth() ? <Redirect to="/"/> : null}
				<h1 className="p-5 text-center">Signup</h1>
				{signupForm()}

				<br />
				<Link to="/auth/password/forgot" className="btn btn-sm btn-outline-danger">Forgot Password</Link>
			</div>
		</Layout>
	);
};

export default Signup;
