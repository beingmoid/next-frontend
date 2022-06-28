import FormBuilder from "@components/formBuilder";
import { Form } from "@lib/types";

import { NextPage } from "next";
import * as yup from "yup";
import { companyFields, companySchema } from "@components/formSchema/company";
import CustomForm from "@components/customForm";
import { useForm,FormProvider,useFormContext } from "react-hook-form";
import axios from "axios";
import { AnySchema } from "yup";
import { useCallback } from "react";
import { useQuery } from "react-query";
import { watch } from "fs";
const useYupValidationResolver = (validationSchema:AnySchema)  =>
  useCallback(
    async data => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false
        });

        return {
          values,
          errors: {}
        };
      } catch (errors:any) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors:any, currentError:any) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? "validation",
                message: currentError.message
              }
            }),
            {}
          )
        };
      }
    },
    [validationSchema]
  );



type FormValue={
fieldConfig:{name:string,type:string,className:string};
}




  export default function AddCompany () {
    // const resolver = useYupValidationResolver(companySchema);
    const country = useQuery<any[]>('country-list')?.data;
    const city = useQuery<any[]>('city-list')?.data;
    const state = useQuery<any[]>('state-list')?.data;
    const {register,watch,handleSubmit,getValues,formState} = useForm();

   
   // const onSubmit = (data:any) => console.log('heelo',data);
    const onSubmit= (data:any)=>{
      var payload ={
        firstName:data.firstName,
        secondName:data.secondName,
        email:data.email,
        countryId:parseInt(data.countryId),
        cityId:parseInt(data.cityId),
        stateId:parseInt(data.stateId),

      }
      var config = {
        method: 'post',
        url: 'http://localhost:3002/api/company',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : payload
      };
      axios(config).then(
        response=> response
      )
      .then(res=> console.log('res',res))
      

      }
  
    return(
 
      <div>
     
        <form method="post" onSubmit={handleSubmit((data:any)=>{
          console.log('plz',data);
          onSubmit(data)
        })}  >

<div>

      <label className="text-gray-800  
      text-sm font-bold leading-tight
       tracking-normal mb-4 mt-4">
        First Name</label>

        <input type="text" {...register('firstName')}
        
        className="mb-5 mt-2 text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
        />
</div>
<div>

      <label className="text-gray-800  
      text-sm font-bold leading-tight
       tracking-normal mb-4 mt-4">
        Last Name</label>

        <input type="text" {...register('lastName')}
        
        className="mb-5 mt-2 text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
        />
</div>
<div>

      <label className="text-gray-800  
      text-sm font-bold leading-tight
       tracking-normal mb-4 mt-4">
        Email Address
        </label>

        <input type="text" {...register('email')}
        
        className="mb-5 mt-2 text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
        />
</div>
<div>

      <label className=" w-96 text-gray-800  
      text-sm font-bold leading-tight
       tracking-normal mb-4 mt-4">
        Country
        </label>
            {watch('countryId')}
      <select {...register('countryId')} className="mb-5 mt-2 text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center ">
      {country?.map((val:any)=>

      {

        return <option value={val.id}> {val.name} </option>

      }  )}
      </select>
</div>
<div>

      <label className="text-gray-800  
      text-sm font-bold leading-tight
       tracking-normal mb-4 mt-4">
        State
        </label>
        {watch('stateId')}
      <select className="mb-5 mt-2 text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center " {...register('stateId')} >
      {state?.map((val:any)=>

      {

        return <option value={val.id}> {val.name} </option>

      }  )}
      </select>
</div>
<div>

      <label className="text-gray-800  
      text-sm font-bold leading-tight
       tracking-normal mb-4 mt-4">
        City
        </label>
        {watch('cityId')}
      <select  {...register('cityId')} className="mb-5 mt-2 text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center ">
      {city?.map((val:any)=>

      {

        return <option value={val.id}> {val.name} </option>

      }  )}
      </select>

      
</div>
          <button type="submit" className="bg-teal-600 w-full hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
          Submit
          </button>
        </form>
     
      
  
      </div>

    );
}
  
