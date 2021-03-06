import FormBuilder from "@components/formBuilder";
import { Form } from "@lib/types";

import { NextPage } from "next";
import * as yup from "yup";
import { companyFields, companySchema } from "@components/formSchema/company";
import CustomForm from "@components/customForm";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import axios from "axios";
import { AnySchema } from "yup";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { watch } from "fs";
import { AlertSuccess, AlertError, AlertWarning, AlertInfo } from "@components/sweetalert";
import { IBaseResponse } from "@components/BaseResponse";
import React from "react";
const useYupValidationResolver = (validationSchema: AnySchema) =>
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
      } catch (errors: any) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors: any, currentError: any) => ({
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



type FormValue = {
  fieldConfig: { name: string, type: string, className: string };
}




export default function AddCompany(props:any) {
  // const resolver = useYupValidationResolver(companySchema);
  const country = useQuery<any[]>('country-list')?.data;
  const city = useQuery<any[]>('city-list')?.data;
  const state = useQuery<any[]>('state-list')?.data;
  const { register, watch, handleSubmit, getValues, formState,setValue } = useForm();
  const [isEditMode,setIsEditMode]=React.useState(false);
  const [id,setId]=useState(0);
  // const onSubmit = (data:any) => console.log('heelo',data);

  useEffect(()=>{
    if(props.isEditMode){
      setIsEditMode(true);
      setId(props.id);
      const fields = ['firstName','lastName','companyName','website','addressLine1'
    ,'addressLine2','zipcode','phone','vatNumber','countryId','email','cityId','stateId']
      fields.forEach(field=> setValue(field,props.data[field]))
    // form.append('companyName',data.companyName);
      // form.append('website',data.website);
      // form.append('addressLine1',data.addressLine1);
      // form.append('addressLine2',data.addressLine2);
      // form.append('zipcode',data.zipcode);
      // form.append('phone',data.phone);
      // form.append('vatNumber',data.vatNumber);
      // form.append('firstName',data.firstName);
      // form.append('lastName',data.lastName);
      // form.append('countryId',data.countryId);
      // form.append('email',data.email);
      // form.append('cityId',data.cityId);
      // form.append('stateId',data.stateId);
    }
  },[])

  const onSubmit = async (data: any) => {
    // var payload = {
    //   firstName: data.firstName,
    //   secondName: data.secondName,
    //   email: data.email,
    //   countryId: parseInt(data.countryId),
    //   cityId: parseInt(data.cityId),
    //   stateId: parseInt(data.stateId),

    // }
    var fileList:FileList=data.file as FileList;
    
    var form = new FormData();
    if(fileList[0]){
      form.append('file',fileList[0]);
    }
  
    form.append('companyName',data.companyName);
    form.append('website',data.website);
    form.append('addressLine1',data.addressLine1);
    form.append('addressLine2',data.addressLine2);
    form.append('zipcode',data.zipcode);
    form.append('phone',data.phone);
    form.append('vatNumber',data.vatNumber);
    form.append('firstName',data.firstName);
    form.append('lastName',data.lastName);
    form.append('countryId',data.countryId);
    form.append('email',data.email);
    form.append('cityId',data.cityId);
    form.append('stateId',data.stateId);
    var config = {
      method: 'post',
      url: 'http://localhost:3002/api/company',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: form
    };
    await axios(config).then(
      response => response
    )
      .then(res => res)
      .then(response=>{
          if((response.data as IBaseResponse).statusCode==200){
            props.setShowModal(false);
           AlertSuccess('Company has been Added Successfully','').then((res)=>{

           });
          }
      })


  }

  return (

    <div>

      <form method="post" onSubmit={handleSubmit((data: any) => {
        console.log('plz', data);
        onSubmit(data)
      })}  >

 
        <div className="row">
          <div className="col-md-6">
            <div>

              <label className="text-gray-800  
text-sm font-bold leading-tight
 tracking-normal mb-4 mt-4">
                Company Name</label>
              
              <input type="text" {...register('companyName')}
              placeholder="Company Name"

                className="mb-5 mt-2 text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              />
            </div>
          </div>

          <div className="col-md-6">
            <div>

              <label className="text-gray-800  
text-sm font-bold leading-tight
tracking-normal mb-4 mt-4">
                Website </label>

              <input type="text" {...register('website')}
                placeholder="https://yourwebsite.com/"
                className="mb-5 mt-2 text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              />
            </div>
          </div>
        </div>


        <div className="row">

          <div className="col-md-6">

            <label className="text-gray-800  
text-sm font-bold leading-tight
tracking-normal mb-4 mt-4">
              Address Line 1</label>

            <input type="text" {...register('addressLine1')}
            placeholder="Address Line 1"
              className="mb-5 mt-2 text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            />
          </div>
          <div className="col-md-6">

            <label className="text-gray-800  
text-sm font-bold leading-tight
tracking-normal mb-4 mt-4">
              Address Line 2</label>

            <input type="text" {...register('addressLine2')}
placeholder="Address Line 2"
              className="mb-5 mt-2 text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">

            <label className="text-gray-800  
      text-sm font-bold leading-tight
       tracking-normal mb-4 mt-4">
              Zipcode</label>

            <input type="text" {...register('zipcode')}
              placeholder="Zip code"
              className="mb-5 mt-2 text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            />
          </div>
          <div className="col-md-6">

            <label className="text-gray-800  
      text-sm font-bold leading-tight
       tracking-normal mb-4 mt-4">
              Phone </label>

            <input type="text" {...register('phone')}
              placeholder="Phone#"
              className="mb-5 mt-2 text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">

            <label className="text-gray-800  
text-sm font-bold leading-tight
tracking-normal mb-4 mt-4">
              Vat Number </label>

            <input type="text" {...register('vatNumber')}
              placeholder="VAT Number"
              className="mb-5 mt-2 text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            />
          </div>
          <div className="col-md-6">

            <label className="text-gray-800  
text-sm font-bold leading-tight
tracking-normal mb-4 mt-4">
              First Name</label>

            <input type="text" {...register('firstName')}
              placeholder="Owner First Name"
              className="mb-5 mt-2 text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">

            <label className="text-gray-800  
text-sm font-bold leading-tight
tracking-normal mb-4 mt-4">
              Last Name</label>

            <input type="text" {...register('lastName')}
              placeholder="Owner Last Name"
              className="mb-5 mt-2 text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            />
          </div>
          <div className="col-md-6">

            <label className="text-gray-800  
text-sm font-bold leading-tight
tracking-normal mb-4 mt-4">
              Email Address
            </label>

            <input type="text" {...register('email')}
              placeholder="Email "
              className="mb-5 mt-2 text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">

          <label className="text-gray-800  
text-sm font-bold leading-tight
tracking-normal mb-4 mt-4">
              Country
            </label>

            
            <select {...register('countryId')} className="mb-5 mt-2 text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center ">
             <option selected>Select Country</option>
              {country?.map((val: any) => {

                return <option value={val.id}> {val.name} </option>

              })}
            </select>
          </div>
          <div className="col-md-6">

          <label className="text-gray-800  
text-sm font-bold leading-tight
tracking-normal mb-4 mt-4">
              State
            </label>
       
            <select className="mb-5 mt-2 text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center " {...register('stateId')} >
            <option selected>Select State</option>
              {state?.map((val: any) => {

                return <option value={val.id}> {val.name} </option>

              })}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">

       
          <label className="text-gray-800  
text-sm font-bold leading-tight
tracking-normal mb-4 mt-4">
              City
            </label>
            <select  {...register('cityId')} className="mb-5 mt-2 text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center ">
            <option selected>Select City</option>
              {city?.map((val: any) => {

                return <option value={val.id}> {val.name} </option>

              })}
            </select>


          </div>
          <div className="flex justify-center mt-8">
    <div className="max-w-2xl rounded-lg shadow-xl bg-gray-50">
        <div className="m-4">
            <label className="inline-block mb-2"> Upload Company Logo</label>
            <div className="flex items-center justify-center w-full">
                <label
                    className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                    <div className="flex flex-col items-center justify-center pt-7">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                            Attach a file</p>
                    </div>
                    <input type="file" className="opacity-0" {...register('file')} />
                </label>
            </div>
        </div>
     
    </div>
</div>
        </div>





                            <button className="mr-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring--teal-600  transition duration-150 ease-in-out hover:bg-teal-500 bg-teal-600 rounded text-white px-8 py-2 text-sm"       type="submit">Submit</button>
                            <button className="mr-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring--teal-600  transition duration-150 ease-in-out hover:bg-teal-500 bg-red-600 rounded text-white px-8 py-2 text-sm"  onClick={()=>   props.setShowModal(false)}   >Cancel</button>
                           
             
      </form>



    </div>

  );
}

