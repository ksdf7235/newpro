import  mongoose   from "mongoose";

//몽고 디비에 새로은 데이터베이스 만드는 명령어
mongoose.connect("mongodb://127.0.0.1:27017/newpro",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log( "X DB Error" , error)
db.on("error", handleError );
db.once("open",handleOpen);