import React, { Component, FunctionComponent } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
export const Select = (param:any)=>{

    const [checked,setChecked]=React.useState(false);

   const li = ["Data1","Data2"]
   
   
    return (  <React.Fragment>

     

<div className="h-10 bg-white flex border border-gray-200 rounded items-center">
<input value="Javascript" name="select" id="select" className="px-4 appearance-none outline-none text-gray-800 w-full" checked={checked} />

<button className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-gray-600">
<svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg"
onClick={(e)=> {setChecked(false);e.preventDefault()}}
viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<line x1="18" y1="6" x2="6" y2="18"></line>
<line x1="6" y1="6" x2="18" y2="18"></line>
</svg>
</button>
<label className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-gray-600">
<svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
onClick={()=> setChecked(true)}
>
<polyline points="18 15 12 9 6 15"></polyline>
</svg>
</label>
</div>

<input type="checkbox" name={param.name} key={param.name} className="hidden peer" checked={checked}  />
<div className="absolute rounded shadow bg-white overflow-hidden hidden peer-checked:flex flex-col w-80 mt-1 border border-gray-200">


 {
  (li?  (li?.map((value:string)=>{
        return(<div className="cursor-pointer group">
        <a className="block p-2 border-transparent border-l-4 group-hover:border-blue-600 group-hover:bg-gray-100"  >{value}</a>
        </div>
        )
    })
  ):(null)
  )
 }   

</div>


     </React.Fragment>)
} 