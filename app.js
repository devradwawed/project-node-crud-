const http = require('http');
const { url } = require('inspector'); 
let users = [{
  "id": 1,
  "name": "Babette",
  "email": "bbresman0@pbs.org"
}, {
  "id": 2,
  "name": "Harvey",
  "email": "hradki1@taobao.com"
}, {
  "id": 3,
  "name": "Garth",
  "email": "gcomello2@ebay.com"
}, {
  "id": 4,
  "name": "Giff",
  "email": "gbaldelli3@seesaa.net"
}, {
  "id": 5,
  "name": "Zelma",
  "email": "zspilsburie4@msu.edu"
}]
const server = http.createServer((req ,res) =>{
  const {url , method}= req;
  if(url =="/users" && method == "GET"){
    res.write(JSON.stringify(users));
    res.end()
  }
  else if(url =="/addUser" && method == "POST"){
    let body =[];
    req.on("data" , (subData) =>{
      body.push(subData)
    })
    req.on("end", ()=>{
      let parsedBody = JSON.parse(Buffer.concat(body)) ;
      users.push(parsedBody);
      res.write(JSON.stringify(users));
      res.end()
    })

  }
  else if(url =="/upDateUser" && method== "POST"){
    let body =[];
    req.on("data" , (subData) =>{
      body.push(subData)
    })
    req.on("end", ()=>{
      let parsedBody = JSON.parse(Buffer.concat(body)) ;
      users = users.map(() => ele.id == parsedBody.id ? parsedBody:ele)
      res.write(JSON.stringify(users));
      res.end()
    })
  }
  else if(url =="/deletUser" && method== "POST"){
    let body =[];
    req.on("data" , (subData) =>{
      body.push(subData)
    })
    req.on("end", ()=>{
      let parsedBody = JSON.parse(Buffer.concat(body)) ;
      users = users.filter((ele) => ele.id != parsedBody.id)
      res.write(JSON.stringify(users));
      res.end()
    })
  }

})


server.listen(3000 , () =>{
  console.log("hello server ")
})