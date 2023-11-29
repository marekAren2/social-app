// v28 ok 01:00 opis funkcjonalności
// przycisk dodania  z input
// po dodaniu aktualizacja postow
//01:31 new component in components AdPost.js
// 1:41 plik ze stylami AddPost.css 
import { useState } from "react"
import "./AddPost.css"
// 03:24 podpinamy comp Add.. w Home
export const AddPost=()=> {
    
    // 07.48 stan default "" null
const [postContent, setPostContent] = useState("");
    // 08:15 opis

    return (
        <form action="">
            <textarea name="" id="" cols="30" rows="10" 
            placeholder="Add post..."
            // v28 8:23 kazda zmiana wywola zapisanie postContent za pomoca setPostContent
            onChange={(e)=>{setPostContent(e.target.valu)}}
            ></textarea>
            <button className="btn">Add</button>
        </form>
    )
}

