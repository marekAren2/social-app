// 00:05 opis
// 3:05 
// 12:41
import "./FollowRecommendations.css"
import axios from "axios";
import { useEffect, useState } from "react"

//05:30 propsy new stan recomm...
export const FollowRecommendations = (props) => {
    const [recommendations, setRecommendations] = useState([]);
    // 6:20 losowo trzech backend proponuje
    const getRecommendations = () => {
        axios.post('https://akademia108.pl/api/social-app/follows/recommendations')
            .then((res)=>{
                setRecommendations(res.data)
            })
            .catch((error)=>{
                console.warn(error);
            })
    }; 

    // 7:44 kiedy chcemy , po załadowaniu komponentu wywołac use Effect z pomoca
    useEffect(()=>{
        // 08:46 wtedy nowa lista rekomendacji
        getRecommendations();
    //   08:24 dlatego w propsach przekazano posts liste postow, 
    //   bo jak cos sie zmieni w postach bo sa podane w tablicy zaleznosci, to bedzie uruchomione  getRecommendations... 
    },[props.posts])
    
    console.log(recommendations );
    return (
        <div className="followRecommendations">{recommendations.map((recommendation)=>{
            return (
                // 10:29 div with key from recommendation
                <div className="followRecommendation" key={recommendation.id}>
                    <img src={recommendation.avatar_url} alt={recommendation.username} />
                    {/* // 11:18 w h3 user */}
                    <h3>{recommendation.username}</h3>
                    <button className="btn">Follow</button>
                    {/* // 12:26 stylujemy */}
                </div>
            )

            })}
        </div>
        
    )
}
