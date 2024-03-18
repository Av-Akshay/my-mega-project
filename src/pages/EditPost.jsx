import React , {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {Container, PostForm} from "../components/index";
import appwriteServices from "../services/config";




const EditPost = () => {
    const [posts ,setPosts] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();
    
    useEffect(()=>{
        if(slug){
            appwriteServices.getPost(slug).then((post)=>{
                if(post){
                    setPosts(post)
                }
            })
        }else{
            navigate("/")
        }
    },[slug, navigate])
  return posts? (
    <div className='py-8'>
        <Container>
            <PostForm post={posts} />
        </Container>
    </div>
  ):null
}

export default EditPost