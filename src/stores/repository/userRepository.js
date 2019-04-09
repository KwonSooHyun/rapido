import axios from 'axios'

class userRepository {

    async addUser(email, name, password) {
        try {
            await axios.post('/user/join', { email, name, password });
        } catch{
            e => {
                console.log(e);
            }
        }
    }

    async signUser(email, password) {
        const data = {}
        try {
            return await axios.get('/user/sign', {
                params: { email, password }
            });
        } catch{
            e => {
                console.log(e);
                data = true;
            }
        }
        return data;
    }

}

export default new userRepository();