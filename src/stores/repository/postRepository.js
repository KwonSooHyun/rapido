import axios from 'axios'

class postRepository{

    async addPost(id, name, text, photo) {
        try {
            if(text===''||photo===undefined) throw '게시물 데이터 없음';
            let data = new FormData();
            data.append('id', id);
            data.append('name', name);
            data.append('text', text);
            data.append('photo', photo);
            return await axios.post('/post/posting',data).then(res => {console.log('포스팅 완료')});
        } catch (e) {
            console.log(e);
            throw new Error('');
        }
    }

    async getPostList(userId){
        try {
            return await axios.get('/post/postList',{
                params : {userId}
            });
        } catch (e) {
            console.log(e);
        }
    }
    
    async getUserPostList(userId){
        try {
            return await axios.get('/post/userPostList',{
                params : {userId}
            })
        } catch (e) {
            console.log(e);
        }
    }
    
    async postDelete(postId){
        try {
            return await axios.post('/post/delete',{postId});
        } catch (e) {
            console.log(e);
        }
    }

}

export default new postRepository();