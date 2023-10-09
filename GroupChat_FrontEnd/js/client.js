const socket=io('http://localhost:3000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
var aud = new Audio('sound.wav');

let online = [];
let c=0;

const disply = (online,arr,k) =>{
    const allname = document.querySelector('.your-name');
    allname.innerText=online;
    if(arr.length != 0){
        append(arr+" are live in the group",'left');
    }else{
        append("No one in the group",'left');
    }
}

const append = (message, pos) =>{
    const messEle = document.createElement('div');
    messEle.innerText = message;
    messEle.classList.add('message');
    messEle.classList.add(pos);
    messageContainer.append(messEle);
    if(pos == 'left'){
        aud.play();
    }
}


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    if(message !== ''){
        append(`You : ${message}`,'right');
        socket.emit('send',message);
        messageInput.value="";
    }
})

const name = prompt('Enter Your Name');
if(name === ''){
    alert('enter name properly')
    location.reload();
}


socket.emit('new-user-joined',name);

socket.on('user-joined', name =>{   
    if(name === null){
        
    }else{
        append(`${name} joined the chat`,'left');
        c++;
    }
})

socket.on('receive', data =>{
    if(data.name === null){
        
    }else{
        append(`${data.name} : ${data.message}`,'left');
    }
})

socket.on('disply',(name,arr)=>{
    online.push(name);
    disply(online,arr,'');
    console.log(online);
})

socket.on('left', name=>{
    if(name === null){
        
    }else{
        append(`${name} : left the chat`,'left');
    }
})
