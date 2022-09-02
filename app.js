const express=require('express');
const app=express();

const mongoose=require('./database/mongoose');

const TaskList=require('./database/models/taskList');
const Task=require('./database/models/task');

//CORS-Cross Origin Request Security
//Backend http://localhost:3000
//Frontend-http://localhost:4200

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers','Origin', 'X-Requested-With,Content-Type,Accept');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(express.json());//Or 3rd party bodyparser

//Routers or REST API Endpoints or RESTFUL webservices Endpoints
/*
TaskList - Create, Update, RoadTaskList,ReadTasklist
Task - Create, Update, RoadTaskList,ReadTasklist */

//Routers or API endpoints for TaskList model
//Get All Task Lists
//http://localhost:3000/taskLists=>[{TaskList},{TaskList}] 
app.get('/tasklists',(req,res)=>{
    TaskList.find({})
    .then((lists)=>{
        res.status(200).send(lists);
    })
    .catch((error)=>{
        console.log(error);
        res.status(500);
    });
});

//EndPoint to get tasklist by tasklistId
app.get(
    '/tasklists/:tasklistId',(req,res)=>{
        let tasklistId=req.params.tasklistId;
        TaskList.find({_id:tasklistId})
        .then((taskList)=>{
            res.status(200).send(taskList);
        })
        .catch((error)=>{
            console.log(error);
            
        });   
});

//Route or Endpoint for creating a TaskList
app.post('/tasklists',(req,res)=>{
    console.log(req.body);
    let taskListObj={'title':req.body.title};
    TaskList(taskListObj).save()
    .then((taskLists)=>{res.status(201).send(taskLists);})
    .catch((error)=>{
        console.log(error);
        res.status(500);
    });

});

//Put is full update of the object
app.put('/tasklists/:tasklistId',(req,res)=>{
    TaskList.findOneAndUpdate({_id:req.params.tasklistId},{$set:req.body})
    .then((taskList)=>{
        res.status(200).send(taskList);
    })
    .catch((error)=>{
        console.log(error);
        
    });  
});

//Patch is partial update of the object
app.patch('/tasklists/:tasklistId',(req,res)=>{
    TaskList.findOneAndUpdate({_id:req.params.tasklistId},{$set:req.body})
    .then((taskList)=>{
        res.status(200).send(taskList);
    })
    .catch((error)=>{
        console.log(error);
        
    });  
});

//Delete a tasklist by id
app.delete('/tasklists/:tasklistId',(req,res)=>{
    TaskList.findByIdAndDelete(req.params.tasklistId)
    .then((taskList)=>{
        res.status(201).send(taskList);
    })
    .catch((error)=>{
        console.log(error);
        
    });  
});

/*app.losten(3000,function(){
    console.log("Server started on port 3000");
});*/

//lamda function
app.listen(3000,()=>{
    console.log("Server started on port 3000 great");
});