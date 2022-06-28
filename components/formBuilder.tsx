import { Field, Form } from '@lib/types';
import { NextPage } from 'next';
import React, { Component, FunctionComponent,useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AnySchema, SchemaSpec } from 'yup/lib/schema';
import * as yup from 'yup';
import { Select } from './select';
import { Uploader } from './uploader';

type FormProps = {
  formFields: Array<any>;
  
  className: string;

  
};
const FormBuilder: FunctionComponent<FormProps> = ({
  formFields,


}: FormProps) => {

  const {register,watch} = useFormContext();


  const switchcase = (param: any) => {
    switch (param?.type) {
      case 'text':
        return (
           <div>
          <React.Fragment>
           

          {watch(param?.name)}
            <label className="text-gray-800  text-sm font-bold leading-tight tracking-normal mb-4 mt-4">
            {param?.label}
            </label>

       
            <input
              
              className={param?.className}
              type="text"
              placeholder={param?.placeholder}
              value={param?.value}
              {...register(param?.name)}
              

              />

          </React.Fragment>
          </div>
        )
      

        case 'select':
            return (
                <div>
                <label className="font-semibold block py-2">{param?.label}</label> 
                <Select param={param} register={register}></Select>
                </div>
     
            );
           



        case 'upload':
             return(   <div>
                    <Uploader param={param} register={register}/>
                </div>);

            break;
            default:
                break;
            
     
    }
  };
  
  return (
    <div>
    
        
        {formFields.map(field => {
          return <React.Fragment>
        
              <div className='columns-3 mb-4 mt-4'>
                
              
              {switchcase(field)}
          
          
              </div>
          </React.Fragment>
        
        }
        )
        }
   

    </div>
    
  );
};

export default FormBuilder;
