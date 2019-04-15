import axios from 'axios'
    
class userRepository {

    async addUser(email, name, password) {
        try {
            console.log(email, name, password)
            if(email===''||name===''||password==='') throw '가입 데이터 없음';
            return await axios.post('/user/join', { email, name, password });
        } catch(e){
            console.log(e);
            throw new Error('가입 데이터 없음');
        }
    }

    async signUser(email, password) {
        try {
            return await axios.get('/user/sign', {
                params: { email, password }
            });
        } catch(e){
                console.log(e);
        }
    }

    async userFollow(userId){
        try {
            return await axios.get('/user/follow', {
                params : { userId } 
            }); 
        } catch(e){
                console.log(e);
        }
    }
}

export default new userRepository();