import { Component, OnInit, ViewChild, ElementRef,TemplateRef,AfterViewChecked,Inject} from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {OverlayContainer} from "@angular/cdk/overlay";
import { trigger, style, animate, transition } from '@angular/animations';
import {UserService} from '../user.service'
import {SocketioService} from '../socketio.service'
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
import { runInThisContext } from 'vm';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ModalComponent} from "./modal/modal.component";
import {Modal2Component} from "./modal2/modal2.component";
import { HttpClient } from '@angular/common/http';
import  Peer from 'peerjs'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {environment} from '../../environments/environment'
import {Router} from '@angular/router'
import { formatDate } from "@angular/common";
import { LOCALE_ID } from "@angular/core";




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('200ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('200ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ],
})
export class HomeComponent implements OnInit,AfterViewChecked {
  @ViewChild("content") modalContent: TemplateRef<any>;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;


  // typesOfShoes: string[] = ['Vision 👨‍👩‍👧‍👧','Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers', 'Loafers', 'Moccasins', 'Sneakers', 'Loafers', 'Moccasins', 'Sneakers'];
  toggled: boolean = false;
  event: any;
  event2:any;
  emote:any;
  msg ='';
  dark = false;
  panelOpenState = false;
  overlay;
  profile = false;
  tab = 0;
allUsers:any;
selecteduser:any;
chats:any[]=[]
contactslist:String[]=[];
mutedlist:String[]=[];
blockedlist:String[]=[]
selectedusermessages:any[]=[]
currentuser:string=""
imagemsg:any;
imageError: string="";
isImageSaved: boolean=false;
cardImageBase64: any;
muteblockselect:String[]=[]
myprofilepicURL:any
selecteduserimage:any
activeusers:String[]=[]
closeResult = '';
mypeer:Peer;
callalert:String="";
caller:String=""
callresponse:String="rejected"
ongoingcall:any
ongoingStream:MediaStream




calldescimage:String;
calldescname:String;
calldescshow:boolean=true;
callbuttondisable:boolean=false;





scrollToBottom(): void {
  try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  } catch(err) { }                 
}









open(content:any) {
  
  this.modalService.open(content, { windowClass : "myCustomModalClass"}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}




// end







userselector(username:String,profilepicURL:String){
  this.selecteduser=username;
  console.log(profilepicURL)
  this.selecteduserimage=profilepicURL;       
  this.cardImageBase64=null;
  this.selectedusermessages=[]
  let statuschangearray=[]
  
  for(let i=0;i<this.chats.length;i++){
    if(username==this.chats[i].contact&&!this.blockedlist.includes(username))
    {
      this.selectedusermessages=this.chats[i].message;
      let temparr=this.chats[i].message.slice();
      // console.log("temparris", temparr)
      temparr.reverse();
      let k=0;
      for(let i=0;i<temparr.length;i++){
        if(temparr[i].readstatus=="unread"&&temparr.from!=this.currentuser){
          statuschangearray.push(temparr[i]._id)
        }
      }
      // statuschangearray=this.chats[i].message.slice(this.chats[i].message.length-this.chats[i].unread,this.chats[i].length)
      // .map((a:any)=>a._id)
      if(statuschangearray.length>0)
      this.statuschangeremit({message:statuschangearray,from:username,to:sessionStorage.username})
      this.chats[i].unread=0
}
    
  }

  this.muteblockselect=[]
  if(this.mutedlist.includes(this.selecteduser)){
    this.muteblockselect.push("mute")
  }
  if(this.blockedlist.includes(this.selecteduser)){
    this.muteblockselect.push("block")
  }

  // console.log(this.selecteduser)
}
  
onmuteblock(){
  console.log(this.muteblockselect)
if(this.muteblockselect.includes("mute")){
  if(!(this.mutedlist.includes(this.selecteduser))){
    this.mutedlist.push(this.selecteduser)
  }
}
if(!this.muteblockselect.includes("mute")){
  if((this.mutedlist.includes(this.selecteduser))){
    // this.mutedlist.push(this.selecteduser)
    const index = this.mutedlist.indexOf(this.selecteduser);
        if (index > -1) {
          this.mutedlist.splice(index, 1);
            }
    }
}



if(this.muteblockselect.includes("block")){
  if(!(this.blockedlist.includes(this.selecteduser))){
    this.blockedlist.push(this.selecteduser)
  }
}

if(!this.muteblockselect.includes("block")){
  if((this.blockedlist.includes(this.selecteduser))){
    // this.mutedlist.push(this.selecteduser)
    const index = this.blockedlist.indexOf(this.selecteduser);
        if (index > -1) {
          this.blockedlist.splice(index, 1);
            }
    }
}

console.log(this.blockedlist)
console.log(this.mutedlist)

this.User.block({username:sessionStorage.username,blockedlist:this.blockedlist}).subscribe(res=>{},err=>{})
this.User.mute({username:sessionStorage.username,mutedlist:this.mutedlist}).subscribe(res=>{},err=>{})

}



  toggleTheme(): void {
    if (this.overlay.classList.contains("unicorn-dark-theme")) {
        this.overlay.classList.remove("unicorn-dark-theme");
        this.overlay.classList.add("light-theme");
    } else if (this.overlay.classList.contains("light-theme")) {
        this.overlay.classList.remove("light-theme");
        this.overlay.classList.add("unicorn-dark-theme");
    } else {
        this.overlay.classList.add("light-theme");
    }
}

  handleSelection(event :any) {
    console.log(event.char);
    this.emote=event.char;
    this.msg += this.emote;  
  }



  constructor(@Inject( LOCALE_ID ) localID: string,private router:Router,public httpclient:HttpClient, public dialog: MatDialog,private ngxLoader: NgxUiLoaderService, private overlayContainer: OverlayContainer,private User:UserService,private socketio:SocketioService,public modalService: NgbModal) {
    this.overlay = overlayContainer.getContainerElement();
    this.localID=localID
   }
   

openDialog(msg:any,image:any): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '50%',
      data: {message: msg, image:image,chats:this.chats,allUsers:this.allUsers,mutedlist:this.mutedlist,blockedlist:this.blockedlist}
    });
  }

openDialog2(imgUrl:any){
  const dialogRef = this.dialog.open(Modal2Component, {
  width:'50%',
  data:{image:imgUrl,allUsers:this.allUsers,mutedlist:this.mutedlist,blockedlist:this.blockedlist}
  })
  dialogRef.afterClosed().subscribe(res => {
    // received data from dialog-component
    // this.mutedlist=res.data.mutedlist;
    // this.blockedlist=res.data.blockedlist;
    this.User.block({username:sessionStorage.username,blockedlist:this.blockedlist}).subscribe(res=>{},err=>{})
    this.User.mute({username:sessionStorage.username,mutedlist:this.mutedlist}).subscribe(res=>{},err=>{})  
  })


}



   sendmessage(){
     if(this.msg!=""||!!this.cardImageBase64)
    {
     if(this.blockedlist.includes(this.selecteduser)){     
        alert("unblock this user to send message" )
        this.msg="";
    this.cardImageBase64=null 
      }
     else
     {
      if(!!this.cardImageBase64){
        this.sendphoto()
      }
      else
    {
      var data:{[key:string]:any}={}
     data.from=sessionStorage.username;
     data.to=this.selecteduser;
     data.message=this.msg;

    //  var data={from:sessionStorage.username,to:this.selecteduser,message:this.msg}

    this.socketio.socket.emit('mymessage',data)   
  }
  this.msg="";
  this.cardImageBase64=null
  this.event2=null;
}
}
   }

   clearphoto(){
    this.cardImageBase64=null
    this.event2=null;
   }

   sendphoto(){
    {
      const file= this.event2.target.files[0];
      var formdata= new FormData()
      formdata.append("file",file)
      formdata.append("from",sessionStorage.username)
      formdata.append("to",this.selecteduser)
      formdata.append("message",this.msg)
      console.log(formdata)
      this.httpclient.post(environment.SOCKET_ENDPOINT+"/user/sendimage",formdata)
  .subscribe((d)=>{console.log(d)},(err)=>{console.log(err)})
  
    }
  }
  fileChangeEvent(event: any) {
    const file = event.target.files[0];
    this.event2=event;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        console.log(reader.result);
        this.cardImageBase64=reader.result
    };
  }  

  ngAfterViewChecked() {        
    this.scrollToBottom();        
} 


  ngOnInit(): void {
    this.ngxLoader.start();
    setTimeout(() => {
      this.ngxLoader.stop(); // stop foreground spinner of the loader "loader-01" with 'default' taskId
    }, 1000);
    this.scrollToBottom();
    this.toggleTheme();
    this.currentuser=sessionStorage.username;
    // console.log(this.currentuser)
      this.User.allUser().subscribe(res=>
        {
        this.allUsers=res
          for(let i=0;i<this.allUsers.length;i++){
            if(this.allUsers[i].username==sessionStorage.username){
              this.blockedlist=this.allUsers[i].blockedlist
              this.mutedlist=this.allUsers[i].mutedlist
              this.myprofilepicURL=this.allUsers[i].profilepicURL
              break
            }
          }
        },
        err=>
        {console.log(err)})

      this.User.messages({username:sessionStorage.username}).subscribe(res=>{
        // console.log(res)
        let test2=res;
        console.log(test2)
let allcontacted=[]
let anothersorttest=[]
let k=1;

while(test2.length>0){
  let message:any[]=[]
    var object={
        contact:"",
        unread:0,
        message:message,
        profilepicURL:""
    }
    
    let tsort=[]
    let a=test2[0]
    tsort[0]=a;
    let readpending=0;
    if(a.readstatus=="unread" && a.from!=sessionStorage.username){
        readpending=1;
    }
    // console.log("this is a",a)
    if(a.to!=sessionStorage.username){
        let i=1
        let temp=a.to;
        object.contact=a.to;
        // object2.temp.messages
        allcontacted.push(a.to);
        // sort images
        // for(i=0;i<this.allUsers.length;i++){
          // if(temp==this.allUsers[i].username){
            // object.profilepicURL=this.allUsers[i].profilepicURL
            // break
          // }      
        // }

        // sortimagesend





        while(i<test2.length){
            if((a.to==test2[i].from)||(a.to==test2[i].to)){
                if(test2[i].readstatus=="unread" && a.from!=sessionStorage.username){
                    // console.log("initial",readpending)
                    readpending++
                }
                tsort.unshift(test2[i])
                test2.splice(i,1)
            }
            else{
                i++
            }

        }
    }
    if(a.to==sessionStorage.username){
        let i=1
        let temp=a.from
        object.contact=a.from;
        allcontacted.push(a.from)
        // sortimages
        // for(i=0;i<this.allUsers.length;i++){
          // if(temp==this.allUsers[i].username){
            // object.profilepicURL=this.allUsers[i].profilepicURL
            // break
          // }      
        // }

        // sortimages end

        while(i<test2.length){
        // console.log("checking",a.to,a.from,test2[i].from,test2[i].to)

            if((a.from==test2[i].from)||(a.from==test2[i].to)){
                if(test2[i].readstatus=="unread" && a.from!=sessionStorage.username){
                    // console.log("initial",readpending)
                    readpending++
                }
                console.log("checker")
                tsort.unshift(test2[i])
                test2.splice(i,1)
            }
            else{
                i++
                // console.log(i)
            }

        }
    }
    
        // console.log("tsort pass",k," ",tsort)
        test2.splice(0,1)
        // sorted[k]=tsort;
        object.message=tsort;
        object.unread=readpending;
        // sortimage
        for(let i=0;i<this.allUsers.length;i++){
          if(object.contact==this.allUsers[i].username){
            object.profilepicURL=this.allUsers[i].profilepicURL
            break
          }      
        }
        // sortimage
        // object2[temp].message=tsort;
        // console.log(object)
        anothersorttest.push(object);
        k=k+1;
        }
console.log((anothersorttest),allcontacted);    
this.chats=anothersorttest;
this.contactslist=allcontacted;
// for(let i=0;i<this.chats.length;i++){
//   for(let k=0;k<this.allUsers.length;k++){
//     if(this.chats[i].contact==this.allUsers[k].username){
//       this.chats[i].profilepicURL=this.allUsers[k].profilepicURL
//       break
//     }
//   }
// }
this.userselector(this.chats[0].contact,this.chats[0].profilepicURL)
},
      err=>{

      })


        this.socketio.setupSocketConnection()  
        this.socketio.socket.on(sessionStorage.username,(data:any)=>{
          console.log(data)
          // console.log(this.selectedusermessages)
          if(data.from==sessionStorage.username){
              if(!this.blockedlist.includes(data.to)){
                if(this.contactslist.includes(data.to)){
                    for(let i=0;i<this.chats.length;i++){
                        if(data.to==this.chats[i].contact){
                          this.chats[i].message.push(data)
                          this.array_move(this.chats,i,0)
                          console.log(this.chats)
                          break
                        }
                    }
                  }
                  else{
                  let temppic:any

                    this.contactslist.unshift(data.to)
                    for(let i=0;i<this.allUsers.length;i++){
                      if(this.allUsers[i].username==data.to){
                        temppic=this.allUsers[i].profilepicURL
                        break
                      }
                    }
                    this.chats.unshift({contact:data.to,unread:0,profilepicURL:temppic})
                    this.chats[0].message=[];
                  this.chats[0].message.push(data)
                    console.log(this.chats)
                  }
              
          if(this.selecteduser==data.to){
          this.selectedusermessages=this.chats[0].message
          console.log(this.selectedusermessages)
          }
          }
          
        }
          else
          {
            if(!this.blockedlist.includes(data.from)){

            if(this.selecteduser==data.from){
              let messages:String[]=[]
              messages.push(data._id)
              this.statuschangeremit({message:messages,from:data.from,to:data.to})
            }
              if(this.contactslist.includes(data.from)){
                  for(let i=0;i<this.chats.length;i++){
                      if(data.from==this.chats[i].contact){
                        this.chats[i].message.push(data)
                        this.chats[i].unread++
                        if(this.selecteduser==this.chats[i].contact){
                          this.chats[i].unread=0
                        }
                        this.array_move(this.chats,i,0)
                        console.log(this.chats)
                        break
                      }
                  }
                }
                else{
                  let temppic:any
                  this.contactslist.unshift(data.from)
                  for(let i=0;i<this.allUsers.length;i++){
                    if(this.allUsers[i].username==data.from){
                      temppic=this.allUsers[i].profilepicURL
                      break
                    }
                  }
                  this.chats.unshift({contact:data.from,unread:1,profilepicURL:temppic})
                  this.chats[0].message=[];
                  this.chats[0].message.push(data)
                  if(this.selecteduser==this.chats[0].contact){
                    this.chats[0].unread=0
                  }
                  console.log(this.chats)
                }
            if(this.selecteduser==data.from){
              this.selectedusermessages=this.chats[0].message
              console.log(this.selectedusermessages)
              }
        }
      }
        })
        this.socketio.socket.on(sessionStorage.username+"sc",(status:any)=>{
          console.log(status)
          this.statuschanger(status)
        })

        this.socketio.socket.on("activeuser",(data:any)=>{
          this.activeusers=data.active;
          console.log(this.activeusers)
        })

        this.socketio.socket.on("photochange",(data:any)=>{
          // console.log(status)
          // this.statuschanger(status)
          if(data.username==sessionStorage.username){
            this.myprofilepicURL=data.profilepicURL
          }
          for(let i=0;i<this.chats.length;i++){
            if(data.username==this.chats[i].contact){
              this.chats[i].profilepicURL=data.profilepicURL
            }
          }
          for(let i=0;i<this.allUsers.length;i++){
            if(data.username==this.allUsers[i].username){
              this.allUsers[i].profilepicURL=data.profilepicURL
            }
          }





        })

// video call
this.mypeer = new Peer(this.currentuser, {
  host: '192.168.18.57',
  port: 3000,
  path: '/peerjs',
  config: {'iceServers': [
    { urls: 'stun:stun.l.google.com:19302' },
    {
      urls: 'turn:numb.viagenie.ca',
      credential: 'muazkh',
      username: 'webrtc@live.com'
  }
    // { url: 'turn:homeo@turn.bistri.com:80', credential: 'homeo' }
  ]}
});









this.socketio.socket.on(this.currentuser+"callrequest",(data:any)=>{
  console.log(data)
  const modalService=this.modalService
  const modalContent=this.modalContent
  const getDismissReason=this.getDismissReason
  this.caller=data.caller;
  this.calldescname=data.caller;
  this.calldescimage=data.image
  let closeResult=""
  modalService.open(modalContent, { windowClass : "myCustomModalClass"}).result.then((result) => {
    closeResult = `Closed with: ${result}`;
  }, (reason) => {
    closeResult = `Dismissed ${getDismissReason(reason)}`;
  });
setTimeout(()=>{
  console.log(this.callresponse)
  if(this.callresponse=="rejected")
  this.callreject(this.caller)
},30000)

})


this.socketio.socket.on(this.currentuser+"callresponse",(data:any)=>{
console.log(data)

if(data.callresponse=="rejected"){
  this.callresponse="rejected"
  this.modalService.dismissAll()
  this.callbuttondisable=false
  this.calldescshow=true;
  this.calldescname=""
  this.calldescimage=""
  console.log(this.ongoingcall)
  console.log(dummycall)
  
  if(this.ongoingcall!=null)
  {
    console.log("stopping ongoing call")
    this.ongoingcall.close();
  this.ongoingStream.getTracks().forEach(function(track) {
    track.stop();
  });    
  
  }
  if(dummycall!=null)
  {
    console.log("stopping ongoing call")
    dummycall.close();
  dummystream2.getTracks().forEach(function(track:any) {
    track.stop();
  });    
  
  }
  this.ongoingcall=null
  dummycall=null
  this.caller=null
}




if(data.callresponse=="accepted"){
  this.calldescshow=false
  this.callresponse="accepted"
  navigator.mediaDevices.getUserMedia({video: { width: 400, height: 400 }, audio: true}).then(stream=> {
    console.log(this.mypeer.id+"is calling " +data.reciever)
    var call = this.mypeer.call(data.reciever, stream);
    console.log("caller side caller vid"+stream)
    this.ongoingcall=call;
    this.ongoingStream=stream
    let dummystream:MediaStream=stream
    const video2 = document.createElement('video');
    video2.classList.add('video');
    video2.srcObject = stream;
    video2.play();
    document.getElementById('my-video').append(video2);
    // this.myvidstream=stream;
    // dialogref.componentInstance.data.stream= stream
    
    call.on('stream', function(remoteStream) {
      // Show stream in some video/canvas element.
      if(remoteStream.id!=dummystream.id){
      // console.log(remoteStream)
      console.log("caller side reciever vid"+remoteStream)  
  
      let remotevid=document.getElementById('remote-video')
      // remotevid.remove()
      // console.log(typeof(remotevid))    
    const video = document.createElement('video');
    video.classList.add('video');
    video.srcObject = remoteStream;
    video.play();
    remotevid.append(video);
      dummystream=remoteStream
    }
      // dialogref.componentInstance.data.remoteStream= remoteStream
    });
    
  
  }, function(err) {
    console.log('Failed to get local stream' ,err);
  });
  
}

})
// const modalService=this.modalService
  // const modalContent=this.modalContent
 let  dummycall:any=null;
 let dummystream2:any=null;
this.mypeer.on('call', function(call:any) {   
  navigator.mediaDevices.getUserMedia({video: { width: 400, height: 400 }, audio: true}) .then(stream=> {
    console.log("recieversmyvidstream"+stream)
    // this.ongoingcall=stream
    dummycall=call;
dummystream2=stream;
console.log(dummycall)
console.log(dummystream2)
    const video2 = document.createElement('video');
video2.classList.add('video');
video2.srcObject = stream;
video2.play();
document.getElementById('my-video').append(video2);
let dummystream:any=stream
    
    call.answer(stream); 
  call.on('stream', function(remoteStream:MediaStream) {
    if(remoteStream.id!=dummystream.id){
const video = document.createElement('video');
video.classList.add('video');
video.srcObject = remoteStream;
video.play();
document.getElementById('remote-video').append(video);
console.log("recieversidecallerstream"+remoteStream)
    dummystream=remoteStream
  }
  
  });

  // call.on("error",(err:any)=>{
  //   console.log(err)
  //   console.log("call closed")
  //   modalService.dismissAll();
  //   stream.getTracks().forEach(function(track) {
  //     track.stop();
  //   });    
  //   call.close()
  // })
}, function(err) {
  console.log('Failed to get local stream' ,err);
});
});


  }

  callaccept(caller:any){
    this.socketio.socket.emit("callresponse",{caller:caller,callresponse:"accepted",reciever:this.currentuser})
    this.callresponse="accepted";
    this.calldescshow=false;
    this.callbuttondisable=true;
  }
  callreject(caller:any){
    this.socketio.socket.emit("callresponse",{caller:caller,callresponse:"rejected",reciever:this.currentuser})
  
  }





call(){
  if(!this.blockedlist.includes(this.selecteduser)){
    const modalService=this.modalService
    const modalContent=this.modalContent
    const getDismissReason=this.getDismissReason
    this.calldescimage=this.selecteduserimage
    this.calldescname=this.selecteduser
    this.callbuttondisable=true
    let closeResult=""
    modalService.open(modalContent, { windowClass : "myCustomModalClass"}).result.then((result) => {
      closeResult = `Closed with: ${result}`;
    }, (reason) => {
      closeResult = `Dismissed ${getDismissReason(reason)}`;
    });
    this.caller=this.selecteduser
  this.socketio.socket.emit("callrequest",{caller:this.currentuser,reciever:this.selecteduser,image:this.myprofilepicURL})  
  setTimeout(()=>{
    console.log(this.callresponse)
    if(this.callresponse=="rejected")
    this.callreject(this.caller)
  },30000)
    

}
  else{
    alert("unblock to call")
  }
  }










  statuschanger(status:any){
    for(let i=0;i<this.chats.length;i++){
      if(this.chats[i].contact==status.contact){
        for(let j=0;j<this.chats[i].message.length;j++){
          if(status.message.includes(this.chats[i].message[j]._id)){
            this.chats[i].message[j].readstatus="read"
          }
        }
        break
      }
    }

  }
statuschangeremit(status:any){
  this.socketio.socket.emit('statuschange',status)
}






 array_move(arr:any[], old_index:number, new_index:number) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
};
public localID:string

dateformatter(dater:string){
var date =new Date(dater);
let todaydate= new Date()


if(date.getMonth()==todaydate.getMonth()&&date.getDate()==todaydate.getDate()&&date.getFullYear()==todaydate.getFullYear()){
return formatDate(date,'shortTime',this.localID)
}

else{
  return formatDate(date,'short',this.localID)

}
}

getallusers(){
  this.User.allUser().subscribe(res=>
    {this.allUsers=res
    },
    err=>
    {console.log(err)})
}


// call



// call end


logout(){
  sessionStorage.clear();
  this.router.navigateByUrl('/login/login')
}




}




