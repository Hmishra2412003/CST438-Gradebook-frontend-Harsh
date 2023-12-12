import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import ListAssignment from './components/ListAssignment';
import GradeAssignment from './components/GradeAssignment';
import AddAssignment from './components/AddAssignment';
import EditAssignment from './components/EditAssignment';
import Login from './components/Login';
import { useState } from 'react';

function App() {
    const [isAuthenticated, setAuth] = useState(false);

    const handleLogin = () => {
        setAuth(true);
    };

    return (
        <div className="App">
            <h2>Gradebook</h2>
            <BrowserRouter>
                <Switch>
                    <Route
                        path="/login"
                        render={(props) => (
                            <Login {...props} onLogin={handleLogin} isAuthenticated={isAuthenticated} />
                        )}
                    />
                    {isAuthenticated ? (
                        <>
                            <Route exact path="/" component={ListAssignment} />
                            <Route path="/editAssignment/:id" component={EditAssignment} />
                            <Route path="/gradeAssignment/" component={GradeAssignment} />
                            <Route path="/addAssignment" component={AddAssignment} />
                        </>
                    ) : (
                        <Redirect to="/login" />
                    )}
                    <Route render={() => <h1>Page not found</h1>} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;