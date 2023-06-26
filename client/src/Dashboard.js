import { useEffect,useState } from "react";
import jwt_decode from "jwt-decode";
import {useNavigate} from 'react-router-dom'
const Dashboard = () => {
    const [quote,setQuote]=useState('')
    const [tempquote,setTempQuote]=useState('')
    const navigate = useNavigate()

    async function populateQuote(){
        const response=await fetch('http://localhost:4000/api/quote',{
            headers: {
                'x-access-token':localStorage.getItem('token')
            }
        })
        const data=await response.json()
        console.log(data)
        if(data.status==='ok'){
            setQuote(data.quote)
            console.log(quote)
        }else{
            alert(data.error)
        }
    }
    async function updateQuote(e){
        console.log("submit me")
        console.log(tempquote)
        // setQuote(tempquote)
        // e.preventDefault()
        const response=await fetch('http://localhost:4000/api/quote',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token':localStorage.getItem('token')
            },
            body: JSON.stringify({
                quote:tempquote
            })
        })
        const data=await response.json()
        console.log("submit data"+JSON.stringify(data))
        if(data.status==='ok'){
            console.log("hai")
            setQuote(tempquote)
            setTempQuote('')
        }else{
            alert(data.error)
        }
    }
    useEffect(() => {
        const token=localStorage.getItem('token')
        if(token){
            console.log("Token is valid")
            const user=jwt_decode(token)
            console.log("user"+user)
            if(!user){
                localStorage.removeItem('token')
                navigate('/login')
            }else{
                console.log("called popu")
                populateQuote()
            }
        }
    },[quote])
    return (
        <div>
          <h1>Your quote: {quote || 'No quote Found'}</h1>
            <form onSubmit={updateQuote}>
            <div class="form-group">
            <label htmlFor="quote">Quote:</label>
            <input
                type="text"
                class="form-control"
                placeholder="Enter quote"
                value={tempquote}
                onChange={(e) => setTempQuote(e.target.value)}
            />
            </div>
            <br/>    
            <input type="submit" class="btn btn-primary"/>
            </form>
        </div>
   
    )
}
 
export default Dashboard;