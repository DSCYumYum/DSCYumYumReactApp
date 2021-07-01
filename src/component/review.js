import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'
import {useEffect, useState} from 'react'
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


function Review({title}) {
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

    useEffect(() =>{
        console.log("성공이야 제발")
        getInfo(title)
    }, [title]);
    
    
    
    return <div>
        {title}
        <br/>
        
        {info.map((v, i)=>{
            return <List key={i}><ListItem><ListItemText>{v}</ListItemText></ListItem><Divider/></List>
        })}
        
         

    </div>;
  }
  
  export default Review;