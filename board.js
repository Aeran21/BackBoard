const express = require('express') // express 호출
const app = express() // 서버 생성

const nunjucks = require('nunjucks') // nunjucks 호출

app.set('view engine', 'html') // 초기 세팅
nunjucks.configure('views',{
    express:app,
})

app.get('/', (req, res)=>{ // 첫 화면 url 설정
    res.render('index.html')
})

let list = [ // 샘플 데이터 생성
    {
        num: 1,
        title:'배고프다',
        username:'애라니',
        date:'2023-04-17',
        contents:'오늘 저녁은..>!!',
    }
]

let count = 1 // 카운트 생성

app.get('/board/list',(req, res)=>{ // 게시글 목록 화면
    
    res.render('board_list.html',{ // board_list.html 화면에 발송
        content:list, // 값 전달
    })
})

app.get('/board/write', (req,res)=>{ // 
    res.render('board_write.html')
})

app.use(express.urlencoded({extended:true,})) //url 인코딩된 데이터 파싱

app.post('/board/write',(req,res)=>{
    let board = {...req.body} // 받아온 데이터 저장
    count += 1 // 카운트 증감 후
    board['num'] = count // 데이터에 추가하고
    list.push(board) // 샘플데이터에 추가
    res.redirect('/board/list') // 다시 url로 재접속
})

app.get('/board/view', (req,res)=>{

    res.render('board_view.html',{
        content:list,
        num:req.index,
    })
})

app.listen(3001, ()=>{ // 서버 시작
    console.log('서버시작')
})

