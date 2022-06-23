import React, { Component, FunctionComponent } from 'react';
import { FieldValues, useForm, UseFormRegister } from 'react-hook-form';
export const Uploader = (param:any)=>{

    return(<div>
  
  <label className="block pl-5">
    <span className="sr-only">{param.label}</span>
    <input type="file"  className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "

    />
  </label>
    </div>)
}
