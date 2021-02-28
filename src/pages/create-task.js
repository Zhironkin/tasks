import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import Select from 'react-select';
import { get_cookie } from '../controllers/cookie';
import { ContextConsumer } from '../controllers/context';

const CreateTask = () => {
   const { CreateTask, EditTask, selectTask, status_options } = useContext(ContextConsumer);
   const [username, setUsername] = useState(selectTask.username || '')
   const [email, setEmail] = useState(selectTask.email || '')
   const [text, setText] = useState(selectTask.text || '')
   const [status, setStatus] = useState(selectTask.status || '')
   const [error, setError] = useState('');
   const history = useHistory()

   const submit = e => {
      e.preventDefault()

      if (!username && !email && !text) return null
      
      let formData = new FormData()
      formData.set('username', username)
      formData.set('email', email)
      formData.set('text', text)
      
      if (selectTask.id) {
         let username = get_cookie('username')
         let token = get_cookie(username)
         formData.set('token', token)
         formData.set('status', status)
         EditTask(selectTask.id, formData).then(result => {
            if (result.error) {
               setError(result.message)
            } else {
               history.push('/')
            }
         })

         return null
      }

      CreateTask(formData).then(result => {
         if (result) {
            history.push('/')
         }
      })
   }

   return (
      <div className="create-task">
         <form onSubmit={submit}>
            <div>
               <label>Имя:</label>
               <input type="text" value={username} disabled={selectTask.username && true} onChange={e => setUsername(e.target.value)} required />
            </div>
            <div>
               <label>Email:</label>
               <input type="email" value={email} disabled={selectTask.email && true} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div> 
               <label>Текс:</label>
               <textarea value={text} onChange={e => setText(e.target.value)} required ></textarea>
            </div>
            {selectTask.id && 
               <Select
                  className="select"
                  placeholder="Статус"
                  options={status_options}
                  onChange={values => setStatus(values.value)}
                  isSearchable={false}
               />
            }
            {error && <span className="error">{error}</span>}
            <button>{selectTask.id ? "Сохранить" : "Создать задачу"}</button>
         </form>
      </div>
   )
}

export default CreateTask;