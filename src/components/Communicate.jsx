import React, {Component} from 'react';

class Communicate extends React.Component {
      state = {
          isLoading: true,
          users: [],
          error: null
      };

      getFetchUsers() {
          this.setState({
              isloading: true
          }, () => {
              fetch("http://localhost:8080/users/").then(res => res.json()).then(result => this.setState({
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
          <div className="Communicate">
            <h1>All Users</h1>
          {users.map((data) => {
              return(
                <div>
                  {data.id + "  " + data.username + "   " + data.password }
                </div>);
              }
            )
          }
          </div>  
          );
        }
      }

export default Communicate;



