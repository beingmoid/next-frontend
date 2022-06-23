import { Field, Form } from '@lib/types';
import { NextPage } from 'next';
import React, { Component, FunctionComponent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AnySchema, SchemaSpec } from 'yup/lib/schema';
import * as yup from 'yup';
import { Select } from './select';

type Props = {
  form: any;
};
export type FormType = {
  key: string;
  required: boolean;
  min: { number: number; text: string };
  label: { text: string; classNameName: string };
  type: string;
  classNameName: string;
};

export type FormInputType = Omit<FormType[], string>;
export const INITIAL_VALUES: FormType = {
  key: '',
  required: false,
  min: { number: 0, text: '' },
  label: { text: '', classNameName: '' },
  type: '',
  classNameName: ''
};

type FormProps = {
  formFields: Array<any>;
  yupSchema: yup.InferType<any>;
  className: string;
};

const FormBuilder: FunctionComponent<FormProps> = ({
  formFields,
  yupSchema,
  className
}: FormProps) => {
  const {
    formState: { errors },
    register
  } = useForm({ mode: 'onTouched' });

  const [checked,setChecked]=React.useState(false);
  const [checked2,setChecked2]=React.useState(false);

  const setCheck= (name:any,value:boolean)=>{
    if(name==="checked1")
        setChecked(value)
    else
        setChecked2(value)
  };
  console.log(formFields, yupSchema);

  const switchcase = (param: any) => {
    switch (param?.type) {
      case 'text':
        return (
           <div>
          <React.Fragment>
           

        
            <label className="text-gray-800  text-sm font-bold leading-tight tracking-normal mb-4 mt-4">
            {param?.label}
            </label>

       
            <input
              id="name"
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
                <label className="font-semibold block py-2">{param?.label}</label> <Select param={param} ></Select>
                </div>
     
            );
            break;



        case 'upload':

            default:
                break;
            
     
    }
  };

  return (
    <div>
      <form>
        {formFields.map(field => {
          return <React.Fragment>
        
              <div className='columns-3 mb-4 mt-4'>
                
              
              {switchcase(field)}
          
          
              </div>
          </React.Fragment>
        
        }
        )
        }
      </form>
    </div>
    
  );
};

export default FormBuilder;
