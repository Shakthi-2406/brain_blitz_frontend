import React, {Component} from 'react';

class App extends React.Component {
      state = {
          isLoading: true,
          users: [],
          error: null
      };

      getFetchUsers() {
          this.setState({
              isloading: true
          }, () => {
              fetch("http://localhost:8080/api/tutorials").then(res => res.json()).then(result => this.setState({
                  isloading: false,
                  users: result
              })).catch(console.log);
          });
      }

      componentDidMount() {
        this.getFetchUsers();
      }

      render() {
          const {users,error} = this.state;
          return (
          <div className="App">
            <h1>All Users</h1>
          {users.map((data) => {
              return(
                <div>
                  {data.id + data.name + data.user_place + data.user_email}
                </div>);
              }
            )
          }
          </div>  
          );
        }
      }

export default App;