import react from 'react';



export  type Field={

    placeholder:string;
 
 
    type:string;
    className:string;
    state:any;
    value:any;
    stateChange:any;

}

export  type Form ={

  
    fields:Field[];
    onSubmit:any;
    className:string;
}