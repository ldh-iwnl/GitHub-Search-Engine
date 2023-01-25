import React, { Component } from 'react'
import './index.css'
import PubSub from 'pubsub-js'

export default class List extends Component {
    state={
        users:[],
        isFirst:true, //first time open the page?
        isLoading:false, //is it loading right now?
        err:''
      } 

    componentDidMount=()=>{
        this.token=PubSub.subscribe("kyle", (msg,stateObj)=>{
            this.setState(stateObj)
        })
    }
    componentWillUnmount=()=>{
        PubSub.unsubscribe(this.token)
    }
  render() {
    const {users,isFirst,isLoading, err}=this.state
    return (
      <div className='row'>
        {
            isFirst ? <h2>please enter keyword, and start searching</h2> : 
            isLoading ? <h2>Loading...</h2> :
            err ? <h2 style={{color: 'red'}}>{err}</h2> :
            users.map((userObj)=>{
                return(
                    <div key={userObj.id} className='card'>
                        <a href={userObj.html_url} target="_blank">
                            <img alt="avatar" src={userObj.avatar_url} style={{width: '100px'}}/>
                        </a>
                        <p className='card-text'>{userObj.login}</p>
                    </div>
                )
            })
        }
      </div>
    )
  }
}
