import axios from 'axios'

class userRepository {

    async getSession(){
        try {
            return await axios.get('/user/session');
        } catch (e) {
            console.log(e);
        }
    }
    
    async logOut(){
        try {
            return await axios.get('/user/logout')
        } catch (e) {
            console.log(e);
        }
    }

    async addUser(email, name, password) {
        try {
            console.log(email, name, password)
            if (email === '' || name === '' || password === '') throw '가입 데이터 없음';
            return await axios.post('/user/join', { email, name, password });
        } catch (e) {
            console.log(e);
            throw new Error('가입 데이터 없음');
        }
    }

    async signUser(email, password) {
        try {
            return await axios.get('/user/sign', {
                params: { email, password }
            });
        } catch (e) {
            console.log(e);
        }
    }

    async userFollow(userId) {
        try {
            return await axios.get('/user/userfollow', {
                params: { userId }
            });
        } catch (e) {
            console.log(e);
        }
    }

    async getUser(userId) {
        try {
            return await axios.get('/user/getUser', {
                params: { userId }
            });
        } catch (e) {
            console.log(e);
        }
    }

    async getSearchList(searchText) {
        try {
            return await axios.get('/user/search', {
                params: { searchText }
            });
        } catch (e) {
            console.log(e);
        }
    }

    async isFollow(ownerId, id) {
        try {
            return axios.get('/user/isfollow', {
                params: { ownerId, id }
            })
        } catch (e) {
            console.log(e);
        }
    }

    async unFollow(ownerId, id) {
        try {
            return axios.post('/user/unfollow', { ownerId, id })
        } catch (e) {
            console.log(e);
        }
    }

    async follow(ownerId, id) {
        try {
            return axios.post('/user/follow', { ownerId, id })
        } catch (e) {
            console.log(e);
        }
    }
}

export default new userRepository();