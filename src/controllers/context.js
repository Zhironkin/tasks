import React, { useState, useEffect } from "react";
import { Controller } from './index';
import { set_cookie, get_cookie, delete_cookie } from './cookie';
const { Provider, Consumer } = React.createContext();

const ContextProvider = (props) => {

   const DevName = 'nikita'
   const API_URL = 'https://uxcandy.com/~shapoval/test-task-backend/v2/'

   const sort_options = [
      { value: 'name_asc', label: 'По имени ↓', field: 'name', direction: 'asc' },
      { value: 'name_desc', label: 'По имени ↑', field: 'name', direction: 'desc' },
      { value: 'email_asc', label: 'По email ↓', field: 'email', direction: 'asc' },
      { value: 'email_desc', label: 'По email ↑', field: 'email', direction: 'desc' },
      { value: 'status_asc', label: 'По статусу ↓', field: 'status', direction: 'asc' },
      { value: 'status_desc', label: 'По статусу ↑', field: 'status', direction: 'desc' }
   ]

   const [list, setList] = useState([])
   const [error, setError] = useState('')
   const [loader, setLoader] = useState(true)
   const [page, setPage] = useState(1)
   const [_sort_field, setSortField] = useState('')
   const [_sort_direction, setSortDirection] = useState('')
   const [isAuthenticated, setIsAuthenticated] = useState(false)

   useEffect(() => {
      let username = get_cookie('username')
      if (username) {
         let token = get_cookie(username)
         setIsAuthenticated(token ? true : false)
      }
   }, [])

   const setCurrentPage = (page) => {
      setLoader(true)
      setPage(page)
   }

   const sortTasks = (sort_field, sort_direction) => {
      setLoader(true)
      setSortField(sort_field)
      setSortDirection(sort_direction)
      getTasks(sort_field, sort_direction)
   }

   const LogOut = () => {
      let username = get_cookie('username')
      delete_cookie('username')
      delete_cookie(username)
   }

   const getTasks = (sort_field = _sort_field, sort_direction = _sort_direction) => {
      Controller.get(`${API_URL}?developer=${DevName}`, page, sort_field, sort_direction)
      .then(result => {
         if (result && result.data) {
            switch (result.data.status) {
               case 'ok':
                  setList({
                     tasks: result.data.message.tasks,
                     count: Math.ceil(parseInt(result.data.message.total_task_count) / 3),
                  })
                  setLoader(false)
                  break;
               case 'error':
                  setError(result.data.message)
                  setLoader(false)
                  break;
               default:
                  setError('Список пуст.')
                  setLoader(false)
                  break;
            }
         }
      })
      .catch(error => console.log('error:', error))
   }

   const LogIn = (data) => {
      return Controller.post(`${API_URL}login?developer=${DevName}`, data)
      .then(result => {
         if (result && result.data) {
            if (result.data.status === 'ok') {
               return {
                  error: false,
                  token: result.data.message.token
               }
            }
            if (result.data.status === 'error') {
               return {
                  error: true,
                  message: result.data.message.password
               }
            }
         }
      })
      .then(result => {
         if (result.error) return result

         let name = data.get('username')
         set_cookie('username', name)
         set_cookie(name, result.token)
         setIsAuthenticated(true)
         return true
      })
      .catch(error => console.log('error:', error))
   }

   const CreateTask = (data) => {
      return Controller.post(`${API_URL}create?developer=${DevName}`, data)
      .then(result => {
         console.log('result', result)
         if (result && result.data) {
            getTasks()
            return true
         }
      })
   }

   const EditTask = (id, data) => {
      return Controller.post(`${API_URL}edit/${id}?developer=${DevName}`, data)
      .then(result => {
         if (result && result.data) {
            if (result.data.status === 'ok') {
               return {
                  error: false,
               }
            }
            if (result.data.status === 'error') {
               return {
                  error: true,
                  message: result.data.message.token
               }
            }
         }
      })
      .catch(error => console.log('error:', error))
   }

   const values = {
      DevName,
      API_URL,
      sort_options,
      list,
      error,
      loader,
      sortTasks,
      setCurrentPage,
      LogIn,
      getTasks,
      CreateTask,
      LogOut,
      EditTask,
      isAuthenticated
   }

   return (
      <Provider value={values}>
         {props.children}
      </Provider>
   )
}

export { ContextProvider, Consumer as ContextConsumer };