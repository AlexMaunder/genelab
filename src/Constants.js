// Constants.js
const prod = {
    url: {
        API_URL: "https://genelab-rails.herokuapp.com/",
        FRONT_END_URL: "https://alexmaunder.github.io/genelab/"
     }
   };
const dev = {
    url: {
        API_URL: "http://localhost:3000", // rails - start first
        FRONT_END_URL: "http://localhost:3001" // react
    }
   };
export const config = process.env.NODE_ENV === "development" ? dev : prod;
