import React from 'react';
import AuthForm from '../components/AuthForm/AuthForm';

function Register(props) {
    return (
        <div>
            <AuthForm isLogin={false}/>
        </div>
    );
}

export default Register;