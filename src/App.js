import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import NavBar from './components/navbar';
import Tasks from './pages/tasks';
import Auth from './pages/auth';
import CreateTask from './pages/create-task';

const App = (props) => {
	return (
		<Router>
			<NavBar />
			<div className="myApp">
				<Switch>
					<Route exact path="/">
						<Tasks />
					</Route>
					<Route path="/auth">
						<Auth />
					</Route>
					<Route path="/create-task">
						<CreateTask />
					</Route>
				</Switch>
			</div>
		</Router>
  )
}

export default App;
