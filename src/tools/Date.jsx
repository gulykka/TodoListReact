// import React from 'react';
// import {addPost} from "../store/todos";
// import {useState} from "@types/react";
// import {useDispatch} from "react-redux";
//
// const Date = () => {
//     const [date, setDate] = useState('')
//     let [wrong, setWrong] = useState('')
//     const dispatch = useDispatch()
//     const [title, setTitle] = useState('')
//
//     function addTodo() {
//         if (title !== '' && date !== '') {
//             const date_now = new Date()
//             let [day, month, year] = date.split('-').reverse()
//             let day_now = date_now.getDate()
//             let month_now = date_now.getMonth()
//             let year_now = date_now.getFullYear()
//             if (year >= year_now) {
//                 if (month >= month_now) {
//                     if (day >= day_now) {
//                         dispatch(addPost([title, date]))
//                         setWrong('')
//                         setTitle('')
//                         setDate('')
//                     } else {
//                         setWrong('this date has already passed')
//                     }
//                 } else {
//                     setWrong('this date has already passed')
//                 }
//             } else {
//                 setWrong('this date has already passed')
//             }
//
//         } else if (date === '') {
//             dispatch(addPost([title, date]))
//             setTitle('')
//             setWrong('')
//             setDate('')
//         } else {
//             setTitle('')
//             setWrong('')
//             setDate('')
//         }
//
//     }
//     return (
//         <div>
//
//         </div>
//     );
// };
//
// export default Date;