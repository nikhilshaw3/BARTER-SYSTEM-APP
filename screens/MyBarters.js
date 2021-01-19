import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, FlatList } from "react-native";
import db from "../config";
import firebase from "firebase";
import { ListItem, Header } from 'react-native-elements'
import MyHeader from '../components/MyHeader.js'

export default class MyBarters extends React.Component{
    constructor(){
        super();
        this.state={
            userId:firebase.auth().currentUser.email,
            allBarters:[],
             donorId:firebase.auth().currentUser.email,
            donorName:'',
        }
    }

    getAllBarters= async()=>{
      await  db.collection("My_Barters").where("userId","==",this.state.userId).get()
      .then(
          snapshot=>{
              snapshot.forEach(doc => {
                  this.setState({allBarters:[...this.state.allBarters,doc.data()]})
              });
          }
      )
    }

    getDonorDetails=()=>{
     db.collection("users").where("email_id","==",this.state.donorId)
    .get().then(
    snapshot=>{
      snapshot.forEach((doc)=>{
      this.setState({donorName:doc.data().first_name + " " + doc.data().last_name})
      })
    }
  )
   }

    componentDidMount(){
        this.getAllBarters();
        this.getDonorDetails();
    }

    sendNotification=(itemDetails,requestStatus)=>{
        var request_id = itemDetails.request_id;
        var donor_id = itemDetails.donor_id;
        db.collection("all_notifications")
        .where("request_id","==",request_id)
        .where("donor_id","==",donor_id).get()
        .then(
            snapshot=>{
                snapshot.forEach((doc)=>{
                    var message=''
                    if (requestStatus==="Item Send") {
                        message = this.state.donorName + "has send the item" 
                    }else {
                        message = this.state.donorName + " has shown intrest in donating the item "
                    }
                    db.collection("all_notifications").add({
                       "message":message,
                       "requestStatus":"unread",
                       "date":firebase.firestore.fieldValue.serverTimestamp(),
                    })
                })
            }
        )
     }

    sendItem=()=>{
       
      if (itemDetails.request_status==="Book Sent") {
        var requestStatus = "Donor Interested"
        db.collection("all_donations").doc(itemDetails.doc_id).update({
          "request_status":requestStatus
        })
        this.sendNotification(itemDetails,requestStatus)
      } else{
        var requestStatus = "Book Sent"
        db.collection("all_donations").doc(itemDetails.doc_id).update({
          "request_status":requestStatus
        })
        this.sendNotification(itemDetails,requestStatus)
      }
   
    }


    keyExtractor = (item,index) => index.toString();

    renderItem = ({item,i}) => {
       return (
           <ListItem
           key = {i}
           title={item.name}
           subtitle={item.exchanger}
           leftElement={<Icon name="Item" type="font-awesome" color ='#696969'/>}
           rightElement={
            <TouchableOpacity style={styles.button} onPress={(item)=>{
             this.sendItem(item)
           }}>
                    <Text>Exchange</Text>
                </TouchableOpacity>
           }
           />
       )
    }


    render(){
        return(
            <View style={{flex: 1}}>
            <MyHeader navigation={this.props.navigation} title="My Barters"/>
            <View>
              {this.state.allBarters.length === 0
              ?(
                  <View style={styles.subtitle}>
                   <Text>List Of All Barters</Text>
                  </View>
              )
              :(
                <FlatList
                  keyExtractor={this.keyExtractor}
                  data={this.state.allBarters}
                  renderItem={this.renderItem}
                />
               )
              }  
            </View>
           </View>
        )
    }
}
const styles = StyleSheet.create({
    button:{
        width:100,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#ff5722",
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8
        }
    },
})