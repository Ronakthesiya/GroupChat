const socket=io('http://localhost:3000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
var aud = new Audio('sound.wav');

let online = [];

const disply = (online) =>{
    const allname = document.querySelector('.your-name');
    allname.innerText=online
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
    append(`You : ${message}`,'right');
    socket.emit('send',message);
    messageInput.value="";
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
    }
})

socket.on('receive', data =>{
    if(data.name === null){
        
    }else{
        append(`${data.name} : ${data.message}`,'left');
    }
})

socket.on('disply',name=>{
    online.push(name);
    disply(online);
    console.log(online);
})

socket.on('left', name=>{
    if(data.name === null){
        
    }else{
        append(`${name} : left the chat`,'left');
    }
    online = online.filter((n)=>{
        return n!=name
    });
    disply(online);
})