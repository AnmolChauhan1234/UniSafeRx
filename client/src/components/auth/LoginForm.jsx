// import { useState } from 'react'
// import { useAuth } from '../../contexts/AuthContext'
// import Button from '../../components/common/Button'
// import { Link } from 'react-router-dom'

// export default function Login() {
//   const { login } = useAuth()
//   const [credentials, setCredentials] = useState({
//     email: '',
//     password: ''
//   })

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     await login(credentials)
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow">
//         <div>
//           <h2 className="text-center text-3xl font-bold text-gray-900">
//             Sign in to your account
//           </h2>
//         </div>
//         <form className="space-y-6" onSubmit={handleSubmit}>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Email address
//               <input
//                 type="email"
//                 required
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                 value={credentials.email}
//                 onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
//               />
//             </label>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Password
//               <input
//                 type="password"
//                 required
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                 value={credentials.password}
//                 onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
//               />
//             </label>
//           </div>
//           <Button
//             type="submit"
//             className="w-full bg-blue-600 text-white hover:bg-blue-700"
//           >
//             Sign in
//           </Button>
//         </form>
//         <div className="text-center text-sm">
//           <span className="text-gray-600">Don't have an account? </span>
//           <Link to="/register" className="text-blue-600 hover:text-blue-800">
//             Register here
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }