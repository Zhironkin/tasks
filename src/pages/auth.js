import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { ContextConsumer } from '../controllers/context';

const Auth = (props) => {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [error, setError] = useState('')
   const history = useHistory()

   const { LogIn } = useContext(ContextConsumer);

   const submit = () => {
      if (!username && !password) {
         setError('Необходимо заполнть все поля.')
         return null
      }

      let formData = new FormData()
      formData.set('username', username)
      formData.set('password', password)

      LogIn(formData).then(result => {
         if (result.error) {
            setError(result.message)
         } else {
            history.go('/')
         }
      })
   }

   return (
      <div className="auth">
         <div>
            <label>Логин:</label>
            <input type="text" onChange={e => setUsername(e.target.value)} />
         </div>
         <div>
            <label>Пароль:</label>
            <input type="password" onChange={e => setPassword(e.target.value)} />
            {error && <span>{error}</span>}
         </div>
         <button onClick={submit}>Вход</button>
      </div>
   )
}

export default Auth;