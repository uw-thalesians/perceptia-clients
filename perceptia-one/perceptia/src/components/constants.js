
let api_ref = process.env.REACT_APP_API_SERVER_SCHEME 
            + "://" + process.env.REACT_APP_WEB_SERVER_HOST 
            + ":" + process.env.REACT_APP_API_SERVER_PORT;


export default {
    routes: {
        signin: "/signin",
        signup: "/signup"
        
    },

    api: {
        url: 'https://localhost:4443'
    },

    localhost: {
        url: 'https://localhost:4443/api/v1/anyquiz/'
    }

}