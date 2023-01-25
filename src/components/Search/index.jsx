import React, { Component } from 'react'
import axios from 'axios'
import PubSub from 'pubsub-js'
export default class Search extends Component {
  search=async()=>{
    const {keyWordElement:{value:keyWord}}=this
    PubSub.publish("kyle",{isFirst:false,isLoading:true})
    try{
      const response= await fetch(`https://api.github.com/search/users?q=${keyWord}`)
      const data = await response.json()
      PubSub.publish("kyle",{isLoading:false, users:data.items})

    }catch(error){
      console.log(error)
      PubSub.publish("kyle",{isLoading:false,err:error.message})
    }
 

    //#region use fetch to send request (Not Optimized)
    // fetch(`https://api.github.com/search/users?q=${keyWord}`).then(
    //   response=>{return response.json()},
    //   // error=>{
    //   //   console.log(error);
    //   //   return new Promise(()=>{})
    //   // }
    // ).then(
    //   response=>{console.log('success',response);},
    //   // error=>{console.log('failed', error);}
    // ).catch(
    //   (error)=>{console.log(error)}
    // )
    //#endregion

    //#region use axios to send request
    // axios.get(`https://api.github.com/search/users?q=${keyWord}`).then(
    //   response => {
    //     PubSub.publish("kyle",{isLoading:false, users:response.data.items})
    //   },
    //   error =>{PubSub.publish("kyle",{isLoading:false,err:error.message})}
    // )
    //#endregion


  }
  render() {
    return (
      <section className='jumbotron'>
        <h3 className='jumbotron-heading'>Search Github Users</h3>
        <div>
            <input ref={c=>this.keyWordElement=c} type='text' placeholder="enter the name you search"/>&nbsp; <button onClick={this.search}>Search</button>
        </div>
      </section>
    )
  }
}
