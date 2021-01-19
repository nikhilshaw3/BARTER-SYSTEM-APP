import React,{Component} from 'react'
import {StyleSheet,Text,View,TextInput,TouchableOpacity,Alert} from 'react-native'
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';

export default class SettingScreen extends Component{
constructor(){
super()
this.state={
emailId: '',
firstName: '',
lastName: '',
address: '',
contact: '',
docId: '',
}
}

getUserDetails=()=>{
var user = firebase.auth().currentUser
var email= user.email
db.collection('users').where("email_id","==",email).get()
.then(snapshot=>{
snapshot.forEach(doc=>{
var data = doc.data()
this.setState({
emailId: data.email_id,
firstName: data.first_name,
lastName: data.last_name,
contact: data.contact,
address: data.address,
docId: doc.id
})
})
})
}

componentDidMount(){
this.getUserDetails()
}

updateUserDetails=()=>{
db.collection('users').doc(this.state.docId)
.update({
first_name: this.state.firstName,
last_name: this.state.lastName,
contact: this.state.contact,
address: this.state.address,
})
Alert.alert("Profile Updated Successfully")
}

render(){
return(
<View style={styles.container}>
<MyHeader title="Setting" navigator={this.props.navigation}/>
<View style={styles.formContainer}>
<TextInput
style={styles.formTextInput}
placeholder={"First Name"}
maxLength={8}
onChangeText={(text)=>{
this.setState({
firstName: text
})
}}
value={this.state.firstName}
/>
<TextInput
style={styles.formTextInput}
placeholder={"Last Name"}
maxLength={8}
onChangeText={(text)=>{
this.setState({
lastName: text
})
}}
value={this.state.lastName}
/>
<TextInput
style={styles.formTextInput}
placeholder={"Contact"}
maxLength={10}
keyboardType={"numeric"}
onChangeText={(text)=>{
this.setState({
contact: text
})
}}
value={this.state.contact}
/>
<TextInput
style={styles.formTextInput}
placeholder={"Address"}
multiLine={true}
onChangeText={(text)=>{
this.setState({
address: text
})
}}
value={this.state.address}
/>
<TouchableOpacity style={styles.button}
onPress={()=>{
this.updateUserDetails()
}}
>
<Text style={styles.buttonText}>SAVE</Text>
</TouchableOpacity>
</View>
</View>
)
}
}

const styles = StyleSheet.create({ container : { flex:1, alignItems: 'center', justifyContent: 'center' }, formContainer:{ flex:1, width:'100%', alignItems: 'center' }, formTextInput:{ width:"75%", height:35, alignSelf:'center', borderColor:'#ffab91', borderRadius:10, borderWidth:1, marginTop:20, padding:10, },button:{ width:"75%", height:50, justifyContent:'center', alignItems:'center', borderRadius:10, backgroundColor:"#ff5722", shadowColor: "#000", shadowOffset: { width: 0, height: 8, }, shadowOpacity: 0.44, shadowRadius: 10.32, elevation: 16, marginTop:20 }, buttonText:{ fontSize:25, fontWeight:"bold", color:"#fff" } })