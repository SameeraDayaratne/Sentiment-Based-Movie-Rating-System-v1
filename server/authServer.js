import express from 'express'
import userRoute from './routes/users.js'

const app = express();

app.use(express.json());

app.use( '/users' , userRoute);


app.listen(5100 , () => {
    console.log('Auth Server listning on port 5100');
})