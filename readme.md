initialize npm === npm init -y
initialize express === npm i express
initialize ejs === npm i ejs
make file index.js === touch index.js
initialize mongoose === npm i mongoose

app.set("views",path.join(\_dirname,"views"))
app.set("view engine","ejs")

create folder name models
and create file name chat.js
and create moongoose.schema
in which form,to,message,created_at
check database is create form this command === show dbs

initialize database
create file name init.js
and in connect mongodb

create get route app.get('/chats',arrow function)
and find all data form this command Chat.find()
res.render("inde.ejs",{chats})

create folder name views
and create file name index.ejs

create public folder
and create style.css

app.use(express.static(path.join(\_\_dirname,"public")))

create botton in index.ejs == form method="GET" action="/chats/new" button form
create route app.get("chats/new",arrow function)
and res.render("new.ejs")
create new.ejs file in views  
and create form method="POST" action="/chats" in which input,textarea,input

create route app.post("/chats",arrow function)
and get data by use == req.body
and parse data === app.use(express.urlencoded({extended:true}))
and create new Chat and save
and res.redirect(/chats)

using date == chat.created_at.toString().split(" ")[4]
and chat.created_at.toString().split(" ").splice(0,4).join(" ")

edit routes
create button in index.ejs create form method="GET" action="/chats/<%=chat.\_id %>/edit"
index.js edit route == app.get("/chats/:id/edit",arrow fun)
and id === req.params
and chat==chat.findById(id)
and res.render("edit.ejs",{chat})

and in views and create edit.ejs
and use npm pakage method override
npm i method-override
and import and app.use(methodOverRide("\_method"))
and create form method="POST" action="/chats/<%=chat.\_id %>?\_method=PUT"

and create route in index.js
app.put("/chats:id",arroe function)
and id = req.params and {msg:newmsg} = req.body
and upsatechat = chat.findbyidandupdate(id,{msg:newmsg},{runvalidator:true,new:true})
res.redirect("/chats)
updated_at new date

delete route
craete button in index.ejs form method="POST" action="/chats/<%=chat.\_id %>?method=Delete"
and index.js app.delete("/chats/:id")
req.params
chat.findbyidanddelet(id)
show pop up to conform you are delete ya not
