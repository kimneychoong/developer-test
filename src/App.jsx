import { render } from '@testing-library/react';
import React, {useState} from 'react';
// import Popup from 'react-popup';
import {connect} from 'react-redux';
import {addItem, deleteItem, submitItem} from './redux/actions';
import reducer from './redux/reducer';
import './App.css'
export default class App extends React.Component {
    constructor (){
        super();
        this.state = {
          input : '',
          wishList : [],
          errorMsg: ''
        }
      }

    handleAdd = () => {
        if (this.state.input == ''){
            this.setState({errorMsg:"Cannot insert empty value"})
        }
        else{
            let duplicate = 0
            var checkDuplicate = this.state.wishList.map((item,idx) => {
                if (item == this.state.input){
                    duplicate++
                }
            })
            if (!duplicate){
                this.setState({errorMsg:""})
                this.setState({input:''})
                let action = addItem(this.state.input)
                let wishListItems = reducer(undefined, action)
                this.setState({wishList:wishListItems.state.wishList})
            }
            else{
                this.setState({errorMsg:"Error! Cannot have duplicate value"})
            }
        }
    }
    handleSubmit = () =>{
        console.log(this.state.wishList)
        if (this.state.wishList == [] || this.state.wishList == ''){
            this.setState({errorMsg:"Cannot submit empty wishlist"})
        }
        else{
            let action = submitItem([])
            reducer(undefined, action)
            this.setState({input:''})
            this.setState({wishList:[]})
            this.setState({errorMsg:''})
            alert("Wish list submitted to Santa!")
        }      
    }

    handleRemove = (item) =>{
        let action = deleteItem(item)
        let newWishList = reducer(undefined,action)
        this.setState({wishList: newWishList.state.wishList})

    }

    render(){
        var listItems = this.state.wishList.map((item,idx)=>{
            return(
            <ul key={idx}>
                <li onClick={this.handleRemove.bind(this,item)} key = {idx}>{item}</li>
            </ul>  
            )
        })

        return (
            <div className="center br2 shadow-5 ma4" id="container">
                <div className ="tc pa2">
                <p className ="ttu tracked b f3">My WishList</p>
                <div id = "container_wishList">
                    {listItems}
                </div>
                <div className="red">{this.state.errorMsg}</div>
                <input className = 'mt3 f4 pa1 br1 ba b--black-90' id = "input" type = 'text' value={this.state.input} 
                onChange={(e)=> this.setState({input:e.target.value})}/>
                <button className = 'db center mt3 f5 b br2 pv2 black' id = "addButton" onClick = {this.handleAdd} >Add</button>
        
                <button className = 'db center mt3 f5 b br2 pv2 black' id = "submitButton" onClick = {this.handleSubmit}>Submit</button>
        
                
                </div>
            </div>
            
        )
    }
    
};

