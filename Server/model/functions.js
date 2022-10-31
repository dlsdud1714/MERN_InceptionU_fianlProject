
const user = {
    user : ""
}


function welcome(req,res) {
    res.send(
        `<h1>Welcome Page<h1> <h4>Enter name at http://localhost:4000/api/login?user=<h4>`
    )
}

function login(req, res) {
    let user = req.query.user
    res.send(`Welcome ${user}`)
}

function monthlyCalendar(req, res) {
    res.send(`<h1> Monthly Calender <h1>`)
}

module.exports = {welcome, login, user, monthlyCalendar}