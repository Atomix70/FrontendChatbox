import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {SocketioService} from '../../socketio.service'


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
contacts:String[]=[]
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private socketio:SocketioService,
    @Inject(MAT_DIALOG_DATA) public data: {message: any,image:any,chats:any,allUsers:any,mutedlist:any,blockedlist:any}) { }

  ngOnInit(): void {
  }

closethis(){
  this.dialogRef.close()
}
tester(){
  console.log(this.contacts.length)
}
sendmessage(){
  console.log(this.contacts)
  var data2:{[key:string]:any}={}
  if(!!this.data.image){
    data2.image=this.data.image;
  }
  data2.message=this.data.message;
  data2.from=sessionStorage.username;
  data2.fwdstatus=true;
  for(let i=0;i<this.contacts.length;i++){
    data2.to=""
    data2.to=this.contacts[i]
    this.socketio.socket.emit('mymessage',data2)
  }
  this.dialogRef.close()
}


}
