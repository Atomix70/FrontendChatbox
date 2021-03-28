import {AbstractControl,FormGroup} from "@angular/forms"

export function passvalidator(control:AbstractControl){
if(control&&(control.value!==null||control.value!==undefined))
{

    const cnfpasswordvalue=control.value
    const passcontrol=control.root.get("password")
    if(passcontrol){
        const passvalue= passcontrol.value
        if(passvalue!==cnfpasswordvalue){
            return{
                isError:true                
            }
        }
    }
}

return null;
}