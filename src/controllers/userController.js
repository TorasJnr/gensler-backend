

export const getHome = (req, res) => {
res.send ("HomePage!")
}

export const getAbout = (req, res) => {
    console.log(req.url, req.method)
    res.send("Aboutpage!")
}

export const postUser = (req, res) => {
    const {username, email, password} = req.body

    if(username === "" && email === "" && password === "") {
        res.status(400).json({
            message: "Please provide all fields"
        })

    }else {
        res.status(201).json({
            message: "Created Successfully"
        })
    }

    
}