
export default function dateCheck(date) {
    if (date === '') return true
    const date_now = new Date()
    let [day, month, year] = date.split('-').reverse()
    let day_now = date_now.getDate()
    let month_now = date_now.getMonth() + 1
    let year_now = date_now.getFullYear()
    if (+year > year_now) return true
    else if (+year === year_now){
        if (+month > +month_now) return true
        else if (+month === month_now) {
            console.log(0)
            if (+day > day_now) return true
            else if (+day === day_now) return true
        }
    } return false
}

