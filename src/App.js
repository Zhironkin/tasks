import React from 'react';
import { Route, withRouter } from "react-router-dom";
import { ContextProvider, ContextConsumer } from './controllers/context';
import NavBar from './components/navbar';
import Tasks from './pages/tasks';
import Auth from './pages/auth';
import CreateTask from './pages/create-task';

const App = () => {
	return (
		<ContextProvider>
			<ContextConsumer>
				{context => (
					<div>
						<NavBar />
						<div className="myApp">
							<Route exact path="/" component={Tasks} />
							<Route exact path="/auth" component={Auth} />
							<Route exact path="/create-task" component={CreateTask} />
							<Route path="/edit-task/:id" render={() => context.isAuthenticated ? <CreateTask /> : <Auth />} />
						</div>
					</div>
				)}
			</ContextConsumer>
		</ContextProvider>
  )
}

export default withRouter(App);
