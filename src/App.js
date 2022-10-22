import {useEffect, useState} from "react"
import "./index.css"
import axios from "axios";
// import { IconNameHiVolumeUp } from "../node_modules/react-icons/hi";
// import { HiTranslate} from "../node_modules/react-icons/hi";
// import { HiDuplicate } from "../node_modules/react-icons/hi";


function App() {
  const [msg,setMsg]=useState("")
  const [bot,setBot]=useState([])



  
  const handelSubmit =(event)=>{
    event.preventDefault();
    console.log('hello world')
    setMsg('') 
    setBot([{msg:msg,from:"user"},...bot]);
    const options = {
      method: 'POST',
      url: 'https://waifu.p.rapidapi.com/path',
      params: {
        user_id: 'sample_user_id',
        message: msg ,
        from_name: 'Boy',
        to_name: 'Girl',
        situation: 'Boy loves Girl.',
        translate_from: 'auto',
        translate_to: 'auto'
      },
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '4e3d8fc05bmshb10ff6efee446c9p1280c1jsnf55678c818b3',
        'X-RapidAPI-Host': 'waifu.p.rapidapi.com'
      },
      data: '{}'
    };
    axios.request(options).then(function (response) {
                const encodedParams = new URLSearchParams();
                encodedParams.append("content",response.data);
                encodedParams.append("censor-character", "*");

                const options = {
                  method: 'POST',
                  headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'X-RapidAPI-Key': '4e3d8fc05bmshb10ff6efee446c9p1280c1jsnf55678c818b3',
                    'X-RapidAPI-Host': 'neutrinoapi-bad-word-filter.p.rapidapi.com'
                  },
                  body: encodedParams
                };

                fetch('https://neutrinoapi-bad-word-filter.p.rapidapi.com/bad-word-filter', options)
                  .then(response => response.json())
                  .then(response => setBot(pr=>[ {msg:response["censored-content"],from:"bot"},...pr]))
                  .catch(err => console.error(err));
          
    }).catch(function (error) {
      console.error(error);
    });
  }
return (
  <section>
    <div className="msgs">
      {
        bot.map((msg,key)=>{
          return(
            <p className={msg.from} key={key}><>{msg.msg} </></p>
            )
          

        })
      }
    </div>
    <form onSubmit={handelSubmit}>
      <input placeholder="type your message" autoFocus value={msg} onChange={(e)=>setMsg(e.target.value)}></input>
      <button type="subimt">submit</button>
    </form>
  </section>

  );
}

export default App;
