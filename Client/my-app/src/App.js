import logo from './logo.svg';
//import './App.css';
import { gql, useQuery } from '@apollo/client';

const query=gql`
  query GetTodosWithUser {
      GetTodos {
        id
        completed
        title
        user {
          name
          phone
          username
        }
      }
    }
`

// import {ApolloClient, InMemoryCache} from '@apollo/client'

// const client=new ApolloClient({
//   uri: 'http://localhost:8000/graphql',
//   cache: new InMemoryCache(),
// });

// const query=`
// query GetTodos {
//   GetTodos {
//     completed
//     title
//     user {
//       name
//       phone
//       username
//     }
//   }
// }
// `

function App() {
  const {data,loading}=useQuery(query)

  if(loading) return <h1>Loading...</h1>
  //console.log(data);
  return (
    <div className="App">
      <table>
        <tbody>
          {
            data.GetTodos.map(todo=><tr key={todo.id} >
              <td>{todo.title}</td> 
              <td>{todo?.user?.name}</td>                    
            </tr>)
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
