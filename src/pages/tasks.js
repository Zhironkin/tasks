import React, { useState, useEffect, useContext } from 'react';
import { ContextConsumer } from '../controllers/context';
import Card from '../components/card';
import Paginate from '../components/paginate';
import Loader from '../components/loader';

const Tasks = () => {
   const { getTasks, setCurrentPage } = useContext(ContextConsumer)
   const [page, setStatePage] = useState(1)

   const setPage = (number) => {
      setCurrentPage(number + 1)
      setStatePage(number + 1)
   }
   
   useEffect(() => {
      getTasks()
   }, [page])

   return (
      <ContextConsumer>
         {context => (
            <div>
               { context.loader && <Loader /> }
               { !context.loader &&
                   <div className="card-list">
                     { !context.error ? <Card list={context.list.tasks} /> : context.error }
                  </div>
               }
               { !context.loader && !context.error && <Paginate count={context.list.count} current_page={page - 1} page={setPage} /> }
            </div>
         )}
      </ContextConsumer>
   )
}

export default Tasks;