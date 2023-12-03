import axios from "axios";
import "./Post.css"
import { useState } from "react";

const Post = ( props) => {
    // 13:41 robie // chwilowy
    // console.log("🚀 ~ file: Post.js:5 ~ props:", props)

    
    
    // console.log('props.post przed props',props.post);
    // console.log('postObject przed props',postObject.id);
    let postObject= props.post;
    // 10:50 useState zawiera długosc tablicy likes
    // destrukturyzujemy go na likesCount i setter funkcje służącą do zmiany stanu zmiennej
    // 10:13 liczymy like w likeCount() ile linii w tablicy like- tyle likes ma post:
    const [likesCount, setLikesCount] = useState (postObject.likes.length)
    // 11:05 wiele modeli nałożonych na siebie chcemy zeby tylko jeden sie wyswietlał
    //o co chodzi?
    // 11:19 useState default set  false 11:38
    const [deleteModalVisible, setDeleteModalVisible ] = useState(false)
    // 3:17 ASK cos nowego z zawartoscia useState!?
    // 4:51 like to obiekt z naszej tablicy
    // ODP kaczka: dla kazdego elementu tablicy likes: sprawdz czy 
    //  ( likes,.row like >>dokoncz 5:39
    // useState bedzie zawierał stan boolean(true or false) ale:
    // uzyskany w ten sposob : porownanie array: likes.forEach(name)=login.name
    
    const [doesUserLiked, setDoesUserLiked] 
     = useState(props.post.likes
        // 5:12 operator znaku zapytanie zeby not error metody na undefined gdyby obiekt nie istniał
        .filter(
             like=>like.username === props.user?.username
             // like ? funkcja jest rowne 0 albo 1? funkcja zwraca 0 lub 1?
            )
        // 6:12 przy tej logice długość ma byc 0 lub 1 przeanalizuj
        // 5:54 Jeżeli po przefiltrowaniu nasza tablica lajków jest różna od zera, to znaczy, że aktualnie zalogowany użytkownik tego posta już zalajkował.
        .length !==0); // pusta tablica ma długosc 0 a z 1-elementem 1.
        // 6:05 jesli jest 0 znaczy nie zalajkował
    
        // console.log("🚀 ~ file: Post.js:25 ~ Post ~ doesUserLiked:", doesUserLiked);
    
    // 5:35 funkcja deletePost(id post)
    const deletePost = (id) => {
     axios.post('http://akademia108.pl/api/social-app/post/delete',{post_id: id})
     .then((res)=>{
        //co tu? <7:57 teraz confirm delete?
        console.log('res',res);
        //v2.9 14:59 setPost do pojedynczego posta do Post props przekazemy w Home 
        // w res potwierdzenie usunieci przyjdzie
        // 15:56 take old posts jako parametr przekazanego setter /funkcji
        // 16:12 zwracam old post and filter, zwracam new table gdzie id is rozne od id delete
        //czyli wszystkie nie usuniete
                props.setPosts((posts)=>{
                    // return posts.filter((posts) => post.id !== res.data.post.id) 
                    // return posts.filter(post=>post.id !== res.data.post.id) 
                    //16:51 post_id post.id poprawione
                    return posts.filter(post=>post.id !== res.data.post_id) 
                })
     }) 
     .catch((error)=>{
        console.warn(error);
     })  
    }
    // console.log('post z postObject ' , postObject.id);
    // let props.post=props;
    // console.log("🚀 ~ file: props.post.js:4 ~ props.post ~ props.post:", props.post)
    // console.log(props.post.id);
    
    // 7:41 likePost dwa parametry funkcja
    const likePost = (id, isLiked ) => {
        // 08:44 koncowka zalezy od parametru 2 z likePost(1,2)
        // 8:50 jesli post jest juz like to doklej tutaj dislike a w innym przypadku like!
        axios.post('http://akademia108.pl/api/social-app/post/'+ (isLiked?'dislike':'like'),{post_id: id
        })
        .then(()=>{
            //10:43 jesli byl po laik-owany to dislike ,naszego like usuwamy czyli -1
            // 10:24 ile lajkow do tej pory wstawiamy do: likesCount przez setter setLikesCount
            // 11:05 opis dodaj do stanu 1 lub usun -1 w zaleznosci 
            // czy do axios /post/like :1 czy /post/dislike: -1 <= isLiked? 
            setLikesCount(likesCount+ (isLiked ? -1: 1))
            // 11:12 czy nasz uzytkownik do tej pory like naszego posta
            //11:28 jesli do tej pory byl polikowany to zmien to na false i na odwrot
            setDoesUserLiked(!isLiked)
        })

    }
    
    // v211 21:56 kopiujemy z FollowRecommendations.js: follow() na unfollow()
    const unfollow = (id) => {
        debugger;

        axios
        // 22:06 /disfollow    
        // 21:37 ma byc przecinek na koncu 'id,' ? czyli jaki to format     
        .post('https://akademia108.pl/api/social-app/follows/disfollow',
            {leader_id: id})

            .then(()=>{
                props.getLatestPosts();
                debugger;
                // console.log("🚀 ~ file: FollowRecommendations.js:39 ~ .then ~ props.getLatestPosts();:", props.getLatestPosts)
               // debugger;
            })
            .catch((error)=>{
                console.warn(error);
            })
    }
    
    return (
     
        <div className="post" key={postObject.id}>
            <p>{postObject.id}</p>
            <div className="avatar">
                <img className="postImage" src={postObject.user.avatar_url} alt= {postObject.user.avatar_url}/>
            </div>    
            <div className="postData">
                <div className="postMeta">
                    <div className="author">{postObject.user.username}</div>
                        {/* kiedy zostal usuniety obiekt adres czy byl moj blad chyba */}
                        {/* <div className="author2">{postObject.user.avatar_url}</div> */}
                    <div className="postDate">{postObject.created_at.substring(0,10)}</div>
                </div>
                <div className="postContent">{postObject.content}</div>
                <div className="likes">
                        {/* // v29 01:27 czemu button do likes */}
                        {/* //3:50 props.user?.username wtedy moze byc null */}
                        {/* // 12:27 do buttona onClick z funkcja czy z funkcja() (z errora wynika ze ma byc funkcja) ASK: */}
                    {props.user?.username === props.post.user.username && (
                        <button onClick={()=>{setDeleteModalVisible(true)}} 
                            className="btn">
                            Delete
                        </button> 
                    )}
                    {/* // 19:25 warunkowo wyswietlamy ten button przycisk */}
                    {/* // 20:04 ogarnij te warunki jutro jeszcze raz co to znaczy to podwojne*/}
                    {/* // 20:19 username autora musi byc rozny od naszego. zpisz nasz rozny od autora */}
                    {props.user && props.user.username !== props.post.user.username &&(
                    // 21:29 ja class
                    <button className="btn"
                    // 21:37 zwracaj uwage ze funkcja skopiowana jest z (id) parametrem 
                    //wiec trzeba przekazac skads id.wlasnie jak wziazc id? 
                    // props.post.id
                    onClick={()=>{unfollow(props.post.id)}}>Unfollow</button>)}    
                            {/* // 2:12 button wyswietla dla wszystkich chcemy przy swoich */}
                            {/* uciekamy sie do ciekawego warunku renderowania przycisku      */}
                            {/* // v210 1:22 kontynuuj */}
                            {/* // v210 1:22 kontynuuj */}
                            {/* // 6:29 prosty warunek ternary  */}
                            {/* // 12:42 zmiana na 1 button */}
                            {/* {doesUserLiked?
                            <button className="btn">Dislike</button>
                            :                    
                            <button className="btn">Like</button>} */}
                            {/* // 7:09 zmiana kolejnosci button do warunku czemu> */}
                            {/* //12:26 z 2-ch przyciskow robimy jeden bedzie sprytniejsze: */}
                            {/* // po kliku calls likePosts z (parametrami) post i czy jest aktualnie zalajkowany */}
                            {/* // 14:49 wyswietlaj ten przycisk kiedy user zalogowany {props.user&&} */}
                            {/* logout nie ma przycisku */}
                            {/* // 18:28 dodaje nawias bo wczesniej brak: */}
                    {props.user && (
                        <button
                            className="btn" onClick={()=>likePost(props.post.id,doesUserLiked) }>{doesUserLiked? 'Dislike':'Like'}
                        </button>
                    )}
                    {likesCount}</div> 
                </div>
            
            {/* to beda postObiekty */}
            {/* {key} */}
            {/* <h3>{postObject.user.username}</h3> */}
            {/* <h4 style={{color: 'red'}}> {props.post.user.username}</h4> */}
            {/* style={color: 'red';} error bo ;*/}
            {/* <p>{postObject.content}</p> */}
            {/* <p className="likeFooter">{postObject.likes.length}</p> */}
            {/* // 7:57 */}
            {deleteModalVisible && 
                <div className="deleteConfirmation"> 
                    <h3>Are you sure you want to delete post?</h3>
                    {/* // 8:56 stylowanie zrob */}
                    <button className="btn yes" 
                    // 13:30  wywołanie funkcji: deletePost z przekazaniem id postu
                    onClick={()=>{
                        // console.log('usun posta o id: >>', id);
                        console.log('usun posta o id: >>', props.post.id);
                        deletePost(props.post.id)}}
                    >
                    Yes</button>
                    <button className="btn no"
                    onClick={()=>{setDeleteModalVisible(false)}}
                    >No</button>
                </div> 
            }
        </div>
    );
}

export default Post;