import React, { useState, useContext } from 'react';
import { withRouter, useHistory } from "react-router-dom";
import { get_cookie } from '../controllers/cookie';
import { ContextConsumer } from '../controllers/context';

const CreateTask = (props) => {

   const history = useHistory()
   const selectTask = props.location.state !== undefined ? props.location.state.task : {}
   const messagesTask = props.location.state !== undefined && props.location.state.messages ? props.location.state.messages : {}
   const { CreateTask, EditTask } = useContext(ContextConsumer)
   const [ messages, setMessages ] = useState({ error: '', success: '' })
   const [ status, setStatus ] = useState(selectTask.status || 0)
   const [ data, setData ] = useState({
      username: selectTask.username || '',
      email: selectTask.email || '',
      text: selectTask.text || '',
   })

   const validateEmail = (value) => {
      if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) {
         return true
      }
      return false
   }

   const submit = e => {
      e.preventDefault()

      setMessages({ error: '', success: '' })

      if (!data.username && !data.email && !data.text) {
         setMessages({ error: 'Необходимо заполнить все поля.', success: '' })
         return null
      }

      if (!validateEmail(data.email)) {
         setMessages({ error: 'Неправильный email адрес.', success: '' })
         return null
      }

      let formData = new FormData()
      formData.set('username', data.username)
      formData.set('email', data.email)
      formData.set('text', data.text)
      
      if (selectTask.id) {
         let username = get_cookie('username')
         let token = get_cookie(username)
         formData.set('token', token)
         formData.set('status', status)

         EditTask(selectTask.id, formData).then(result => {
            if (result.error) {
               setMessages({ error: result.message, success: '' })
            } else {
               history.push({
                  pathname: `/edit-task/${selectTask.id}`,
                  state: {
                     task: { id: selectTask.id, ...data },
                     messages: { error: '', success: 'Задача успешно обновлена.' }
                  }
               })
            }
         })

         return null
      }

      CreateTask(formData).then(result => {
         if (result) {
            setData({ username: '', email: '', text: ''})
            setMessages({ error: '', success: 'Задача успешно добавлена.' })
         }
      })
   }

   const handleChange = (event) => {
      if (event.target.name === 'text') {
         handleChangeStatus(false, status)
      }
      setData((prevState) => ({
         ...prevState,
         [event.target.name]: event.target.value
      }))
   }

   const handleChangeStatus = (event, status) => {
      let checked = event ? event.target.checked : (status == 10 || status == 11)

      if (data.text !== selectTask.text && checked) {
         setStatus(11)
         return null
      }
      if (data.text !== selectTask.text && !checked) {
         setStatus(1)
         return null
      }
      if (data.text === selectTask.text && checked) {
         setStatus(10)
         return null
      }
      if (data.text === selectTask.text && !checked) {
         setStatus(0)
         return null
      }
   }

   return (
      <div className="create-task">
         <form>
            <div>
               <label>Имя:</label>
               <input type="text" name="username" value={data.username} disabled={selectTask.username && true} onChange={handleChange} required />
            </div>
            <div>
               <label>Email:</label>
               <input type="email" name="email" value={data.email} disabled={selectTask.email && true} onChange={handleChange} required />
            </div>
            <div> 
               <label>Текс:</label>
               <textarea name="text" value={data.text} onChange={handleChange} required ></textarea>
            </div>
            {selectTask.id && 
               <div className="checkbox">
                  <label>
                     <input 
                        type="checkbox" 
                        checked={status == 10 || status == 11} 
                        onChange={handleChangeStatus} 
                     />
                     <span>Выполнено</span>
                  </label>
               </div>
            }
            {messagesTask.success && !messages.success && <span className="success">{messagesTask.success}</span>}
            {messages.success && !messagesTask.success && <span className="success">{messages.success}</span>}
            {messages.error && <span className="error">{messages.error}</span>}
            <button onClick={submit}>{selectTask.id ? "Сохранить" : "Создать задачу"}</button>
         </form>
      </div>
   )
}

export default withRouter(CreateTask);