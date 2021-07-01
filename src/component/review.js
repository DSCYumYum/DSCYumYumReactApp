import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'
import {useState} from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'



function getInfo(text){
    axios.post('http://localhost:3001/', {
        "text" : text
    })
    .then((res)=>{
        console.log(text)
        console.log(res)
    })
}


function Review() {
    var [text, setText] = useState("");
    var [info, setInfo] = useState([]);
    
    function getInfo(text){
        
        axios.post('http://localhost:3001/', {
            "text" : text
        })
        .then((res)=>{
            setInfo(res.data)
        })
    }

    
    return <div>
        <TextField onChange={(e)=>{setText(e.target.value)}}/>
        <Button onClick={()=>{getInfo(text)}}>Search</Button>
        {text}
        <br/>
        
        {info.map((v, i)=>{
            return <List key={i}><ListItem><ListItemText>{v}</ListItemText></ListItem><Divider/></List>
        })}
        

    </div>;
  }
  
  export default Review;