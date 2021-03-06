import * as WebSocket from 'isomorphic-ws';
import IWsevent,{resWs} from './wseventdata';

const ws = new WebSocket('ws://localhost:18000');
let socketData:IWsevent={'event':'null','data':'null'};

ws.onopen=()=> {
  console.log('CONNECTED');
};

ws.onclose=()=> {
    console.log('DISCONNECTED');
  };

  //The type of 'message' here is different from the one in the client.ts
  // The message we got here is in a more complex structure as showed below
  // So we should test the type of message.data instead of message
  /*
  MessageEvent {
   target: [WebSocket],
   type: 'message',
   data: '{"event":"end","data":"response: 0.3416359669492526"}'
  }
  */
ws.onmessage=(message)=>{
    console.log('received: %s', message);

    if(typeof message.data==='string'){
        socketData=JSON.parse(message.data);
    }
    if(socketData.event==='hello'){
        resWs.data='response: '+Math.random();
        ws.send(JSON.stringify(resWs), err =>{
            if(err){
                console.log(err)
            }
        } );
    }
    if(socketData.event==='end'){
        setTimeout(()=>{
            console.log('connection is to be closed');
            ws.close();
        },3000)
    }
};
