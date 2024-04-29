import axios from "./libs/axios.js";

export default class BandSiteApi {

    baseUrl = 'https://unit-2-project-api-25c1595833b2.herokuapp.com';
    apiKey;

    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    async getComments() {
        const res = await axios.get(`${this.baseUrl}/comments?api_key=${this.apiKey}`);
        let comments = res.data;
        comments = comments.sort(function(x, y){
            return y.timestamp - x.timestamp;
        });
        return comments;
    }

    async postComment(payload) {
        const res = await axios.post(`${this.baseUrl}/comments?api_key=${this.apiKey}`, payload);
        let comment = res.data;
        return comment;
    }

    async likeComment(id) {
        const res = await axios.put(`${this.baseUrl}/comments/${id}/like?api_key=${this.apiKey}`);
        let comment = res.data;
        return comment;
    }

    async deleteComment(id) {
        const res = await axios.delete(`${this.baseUrl}/comments/${id}?api_key=${this.apiKey}`);
        let comment = res.data;
        return comment;
    }

    async getShows() {
        const res = await axios.get(`${this.baseUrl}/showdates?api_key=${this.apiKey}`);
        return res.data;
    }
}
