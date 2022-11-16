// import { useState, useEffect } from "react"
// import axios from 'axios'

// export default (url) => {
//     const [isLoadin, setLoading] = useState(false)
//     const [response, setResponse] = useState(null)
//     const [error, setError] = useState(null)

//     const doFetch = () => {
//         useEffect(() => {
           
//             if (!isLoadin) {
//               return;
//             }
//             axios("https://conduit.productionready.io/api/users/login", {
//               method: "post",
//               data: {
//                 user: {
//                   email: 'user.email',
//                   password: 'user.password',
//                 },
//               },
//             }).then(res => {
//                 setLoading(false)
//                 setResponse(res.data)
//             }).catch(err => {
//                 setLoading(false)
//                 setError(err.response.data)
//             })
//           });
//     }

//     return [{isLoadin, response, error}, doFetch]
// }