import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { ContextConsumer } from '../controllers/context';

const Card = ({ list }) => {
   const { isAuthenticated } = useContext(ContextConsumer)

   const taskStatus = status => {
      switch (parseInt(status)) {
         case 0:
            return <span className="status-0">Задача не выполнена</span>
         case 1:
            return <span className="status-1">Задача не выполнена, отредактирована администратором</span>
         case 10:
            return <span className="status-10">Задача выполнена</span>
         case 11:
            return <span className="status-10">Задача отредактирована администратором и выполнена</span>
      }
   }

   const renderList = () => (list || []).map(item => 
      <div key={item.id} className="card">
         <div>
            {isAuthenticated && <span className="card-change"><Link to={{ pathname: `/edit-task/${item.id}`, state: { task: item } }}>[ редактировать ]</Link></span>}
            <label dangerouslySetInnerHTML={{__html: item.email}}></label>
            <span dangerouslySetInnerHTML={{__html: item.username}}></span>
         </div>
         <div dangerouslySetInnerHTML={{__html: item.text}}></div>
        <div className="card-status">
           {taskStatus(item.status)}
        </div>
      </div>
   )

   return renderList()
}

export default Card;