import React, { useState } from 'react';
import ListAssignment from './ListAssignment';
import { SERVER_URL } from '../constants';

function Login() {
    const [user, setUser] = useState({ username: '', password: '' });
    const [isAuthenticated, setAuth] = useState(false);
    const [role, setRole] = useState(''); // Declare setRole as a state variable

    const credentials = {
        username: user.username,
        password: user.password
    };
    console.log('Sending credentials:', credentials);

    const onChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    }

    const login = () => {
        fetch(`${SERVER_URL}/login`, {
            method:'POST',
            headers: {'Content-Type':'application/json' },
            body: JSON.stringify(user)
        })
            .then((res)=> {
                const jwtToken = res.headers.get('Authorization');
                if (jwtToken !== null) {
                    sessionStorage.setItem("jwt", jwtToken);
                    setAuth(true);

                }
                console.log(res)
                return res.text();

            })
            .then((data) => {
                console.log("data="+data);
                setRole(data);
            })
            .catch(err => console.log(err));

    }

    if (isAuthenticated) {
        return <ListAssignment />;
    } else {
        return (
            <div className="App">
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <label htmlFor="username">UserName</label>
                        </td>
                        <td>
                            <input type="text" name="username" value={user.username} onChange={onChange} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="password">Password</label>
                        </td>
                        <td>
                            <input type="password" name="password" value={user.password} onChange={onChange} />
                        </td>
                    </tr>
                    </tbody>
                </table>
                <br />
                <button id="submit" onClick={login}>Login</button>
            </div>
        );
    }
}

export default Login;