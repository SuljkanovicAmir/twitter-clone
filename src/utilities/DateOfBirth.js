function YearOfBirth () {
    let years = []
    for(let i = 2023; i > 1904; i--) {
        years.push(i)
    }

    return years
}

function DayOfBirth () {
    let days = []
    for(let i = 1; i < 25; i++) {
        days.push(i)
    }

    return days
}


export {YearOfBirth, DayOfBirth}