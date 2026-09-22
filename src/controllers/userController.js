

export const getHome = (req, res) => {
    res.send ("Homepage!")
}

export const getAbout = (req, res) => {
    console.log(req.url, req.method)
    res.send("Aboutpage!")
}

export const postUser = (req, res) => {
    const {username, email, password} = req.body

    if(!username && !email && !password) {
        res.status(400).json({
            message: "Please provide all fields"
        })
    }

    res.status(201).json({
        message: "User created successfully"
    })
}