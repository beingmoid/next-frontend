import React from "react";
import Swal from "sweetalert2";
import { SweetAlertIcon,SweetAlertResult } from "sweetalert2";

 export  function AlertSuccess (title:string,text:string) {
    return(
        Swal.fire({
            title:title,
            text:text,
            icon:"success"
        })
    );
}
 export  function AlertWarning (title:string,text:string)  {
    return(
        Swal.fire({
            title:title,
            text:text,
            icon:"warning"
        })
    );
}
 export  function AlertError (title:string,text:string)  {
    return(
        Swal.fire({
            title:title,
            text:text,
            icon:"error"
        })
    );
}
 export  function AlertInfo (title:string,text:string)  {
    return(
        Swal.fire({
            title:title,
            text:text,
            icon:"info"
        })
    );
}