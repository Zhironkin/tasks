import React, { useContext } from 'react';
import { withRouter, Link, useHistory } from "react-router-dom";
import Select from 'react-select'
import { ContextConsumer } from '../controllers/context';

const NavBar = () => {
   const { LogOut } = useContext(ContextConsumer)
   const history = useHistory()

   const logOut = () => {
      LogOut()
      history.go(0)
   }

   const createTask = () => {
      if (history.location.pathname === '/create-task') {
         history.go(0)
      } else {
         history.replace('/create-task')
      }
   }

   return (
      <ContextConsumer>
         {context => (
            <div className="navbar">
               <div><Link to="/">Список задач</Link></div>
               <div className="select-sort">
                  <Select 
                     placeholder="Сортировка" 
                     options={context.sort_options} 
                     onChange={target => context.sortTasks(target.field, target.direction)}
                     isSearchable={false} 
                  />
               </div>
               <div onClick={createTask}>+ Добавить новую</div>
               <div>
                  {context.isAuthenticated ? <div onClick={logOut}>Выход</div> : <Link to="/auth">Вход</Link>}
               </div>
            </div>
         )}
      </ContextConsumer>
   )
}

export default withRouter(NavBar);