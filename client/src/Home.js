import PaginatedList from './PaginatedList';

import { useState,useEffect } from 'react';
const Home = () => {

    const [quote,setQuote] = useState([{}])
    const [isPending,setisPending] = useState(true)
    const url='http://localhost:4000/quotes-server'
    useEffect(() => {
        async function fetchQuotes() {
          const response = await fetch(url);
          const data = await response.json();
          setQuote(data);
          setisPending(false)
        }
        fetchQuotes();
        console.log("fired")
      }, []);
    return ( 
        <div>
            <h1 style={{
                fontWeight: '900',
                fontFamily: "cursive"
            }}>Quotes:</h1>
            {isPending && <p style={{
                fontWeight: '900'
            }}>Loading...</p>}
            {!isPending && <PaginatedList data={quote}/>}
        </div>
     );
}
 
export default Home;