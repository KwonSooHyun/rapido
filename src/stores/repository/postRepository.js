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
            return await axios.post('/post/posting',data).then(res => {console.log(res)});
        } catch (e) {
            console.log(e);
            throw new Error('');
        }
    }

    async getPostList(userId){
        try {
            return await axios.get('/post/postView',{
                params : {userId}
            });
        } catch (e) {
            console.log(e);
        }
    }

}

export default new postRepository();