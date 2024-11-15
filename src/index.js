const express = require('express');
const bcrypt = require('bcrypt');
const PORT = 3000;

const app = express();
app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.urlencoded());

const db = [];


app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the home page'
    });
});

app.get('/signUp', (req, res) => {
    res.render('home')
});

app.post('/', async (req, res) => {
    const { username, password } = req.body;
    // we now have username and password of the user.
    const hash = await bcrypt.hash(password, 12);
    db.push({ username, password: hash })
    res.send({
        message: 'account created successfully. Now go to /login and sign In'
    });
    // we now need to hash the password and then store in the database
});

app.get('/login', (req, res) => {
    res.render('login', { message: null });
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = db.find(ele => ele.username === username);

        const storedHash = user.password;
        const result = await bcrypt.compare(password, storedHash);

        if (result) res.json({ message: 'Logged you in successfully' });
        res.render('login', { message: 'Incorrect username or password' });
    } catch (e) {
        res.json({ message: 'Server error', success: false })
    }

})


app.listen(PORT, () => {
    console.log(`app is listening @ PORT ${PORT}`);
});