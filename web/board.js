const express = require('express')
const app = express()

const nunjucks = require('nunjucks')

app.set('view engine', 'html')
nunjucks.configure('views',{
    express:app,
})

app.get('/', (req, res)=>{
    res.render('index.html')
})

let list = [
    {
        num: 1,
        title:'배고프다',
        username:'애라니',
        date:'2023-04-17',
        contents:'오늘 저녁은..>!!',
    }
]

let count = 1

app.get('/board/list',(req, res)=>{
    
    res.render('board_list.html',{
        content:list,
    })
})

app.get('/board/write', (req,res)=>{
    res.render('board_write.html')
})

app.use(express.urlencoded({extended:true,}))

app.post('/board/write',(req,res)=>{
    let board = {...req.body}
    count += 1
    board['num'] = count
    console.log(list, board)
    list.push(board)
    console.log(list)
    res.redirect('/board/list')
})

app.get('/board/view', (req,res)=>{

    res.render('board_view.html',{
        content:list,
        num:req.index,
    })
})

app.listen(3000, ()=>{
    console.log('서버시작')
})

