import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment'

@Component({
  selector: 'app-modal2',
  templateUrl: './modal2.component.html',
  styleUrls: ['./modal2.component.scss']
})
export class Modal2Component implements OnInit {
  imgUrl:any;
  event:any;
  imagePath:any;
  constructor( 
    public dialogRef: MatDialogRef<Modal2Component>,
    private httpclient:HttpClient,
    @Inject(MAT_DIALOG_DATA) public data:{image:any,allUsers:any,mutedlist:any,blockedlist:any}
  ) { }
currentuser:String=sessionStorage.username;
currentemail:String=sessionStorage.email;

  
  ngOnInit(): void {
    if(!!this.data.image)
    this.imgUrl=this.data.image
  }

  tester(files:any,event:any)
  {
    if (files.length === 0)
    return;
  
  this.event=event;
  console.log(this.event)
  console.log(files)
  
  
  var reader = new FileReader();
      this.imagePath = files;
      reader.readAsDataURL(files[0]); 
      reader.onload = (_event) => 
      { 
        this.imgUrl = reader.result; 
        console.log(this.imgUrl)
      }
  }

changephoto(){
  {
    const file= this.event.target.files[0];
    var formdata= new FormData()
    formdata.append("file",file)
    formdata.append("username",sessionStorage.username)
    this.httpclient.post(environment.SOCKET_ENDPOINT+"/user/changeimage",formdata)
.subscribe((d)=>{console.log(d)},(err)=>{console.log(err)})

  }
}

removemuted(x:String){
  const index = this.data.mutedlist.indexOf(x);
if (index > -1) {
  this.data.mutedlist.splice(index, 1);
}
}


removeblocked(x:String){
  const index = this.data.blockedlist.indexOf(x);
if (index > -1) {
  this.data.blockedlist.splice(index, 1);
}
}







}
