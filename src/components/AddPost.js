// v28 ok 01:00 opis funkcjonalności
// przycisk dodania  z input
// po dodaniu aktualizacja postow
//01:31 new component in components AdPost.js
// 1:41 plik ze stylami AddPost.css 
import { useState } from "react"
import "./AddPost.css"
import axios from "axios";
// 03:24 podpinamy comp Add.. w Home
// 17:02 tej funkcji getPrevPosts nie odpalamy w Home tylko przekazujemy przez props do formularz AddPost 
export const AddPost=(props)=> {
    
    // 07.48 stan default "" null
const [postContent, setPostContent] = useState("");
    // 16:54 opis działania w Home w l:21
    // 9:56 f: addPost ;calls after submit wiec () we create/ work ? preventDefault
    const addPost = (e) => {
        e.preventDefault();
        // 10:09 to sobie dopniemy do zdarzenia onSubmit na formularzu
        // 10:37 po dopieciu po pierwsze :
        if(!postContent) {
            // 11:03 jesli jest pusty postContent nic nie robimy nie chce send
            // 11:16 textarea jest pusta
            // nie tylko funkcja jak z wcieciami sprawdz
          return;
        }

        // 11:36 jesli nie pusty textarea
        axios.post("https://akademia108.pl/api/social-app/post/add",
            {content: postContent})
        // 13:19 
        // ODP: sprawdzaj klamry domkniecie i zakresy dopisujac kod
        // 17:34 poprawiam linie na wiersze z rozdzieleniem
        // funkcji na 3 linie, funkcja jest w () .then({})
        // wazne miec ekran z błędami w powershell na wierzchu na drugim ekranie
        .then((res) => {
            console.log('res', res);
            // 17:18 tej funkcji getPrevPosts nie odpalamy w Home tylko przekazujemy przez props do formularz AddPost 
            props.getPrevPosts() ;
            // ASK: 17:34 kiedy byl wpisany 17:34 juz jest 
            setPostContent('');    
        })
        
        .catch((error) => {console.warn(error);
            // 14:49 szerzej patrzymy wracamy do home
        }); 

    }
    // 08:15 opis
    // 08:40 wylogowac mozemy
    console.log("🚀 ~ file: AdPost.js:13 ~ AddPost ~ postContent:", postContent)

    
    return (
        // v28 10:15 onSubmit oraz zaległa classN ;I've styled the class
        <form className="addPostForm" onSubmit={addPost}>
        {/* // 10:37 pytania 590 ... inaczej niz myslałem wyjasnij blad 
        //  ("Different than I thought, explain the mistake.")*/}
        {/* <form className="addPostForm" onSubmit={()=>addPost()}> */}
            <textarea name="" id="" cols="30" rows="10" 
            placeholder="Add post..."
            // v28 8:23 kazda zmiana wywoła zapisanie postContent za pomoca setPostContent
            // ASK: przeczytaj sobie co robi ta linia kaczka
            onChange={(e)=>{setPostContent(e.target.value)}}
            // 09:36 koniec pobierania z form value zasada to samo co w stanie postContent
            value={postContent}
            >
            </textarea>
            <button className="btn">Add</button>
        </form>
    )
}

