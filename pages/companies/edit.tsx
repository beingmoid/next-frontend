import { IBaseResponse } from "@components/BaseResponse";
import Modal from "@components/modal";
import { AlertError, AlertSuccess } from "@components/sweetalert";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";


export default function EditCompany(props:any){

    // const[open,SetOpen]=React.useState(false);
    const country = useQuery<any[]>('country-list')?.data;
    const city = useQuery<any[]>('city-list')?.data;
    const state = useQuery<any[]>('state-list')?.data;
    const { register, watch, handleSubmit, getValues, formState,setValue } = useForm({
        defaultValues:{
            companyName:props.data.companyName,
            website:props.data.website,
            addressLine1:props.data.addressLine1,
            addressLine2:props.data.addressLine2,
            zipcode:props.data.zipcode,
            phone:props.data.phone,
            vatNumber:props.data.vatNumber,
            firstName:props.data.firstName,
            lastName:props.data.lastName,
            email:props.data.email,
            countryId:props.data.countryId,
            stateId:props.data.stateId,
            cityId:props.data.cityId,
            file:props.data.companyLogo
        }
    });
    console.log(props);
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
        form.append('id',props.data.id);
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
          method: 'put',
          url: 'http://localhost:3002/api/company/'+props.data.id,
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
               
               AlertSuccess('Company has been Updated Successfully','').then((res)=>{
                    props.setEdit(false);
               });
               
              }
              else{
                AlertError('Company has been failed to update','');
              }
          })
    
    
      }
    return(<div>
        <div className="py-12 bg-neutral-800/50 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal" aria-hidden="true">
                <div role="alert" className="container mx-auto w-8/12 ">
                    <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                        <div className="w-full flex justify-start text-gray-600 mb-3">
                            <svg  xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-wallet" width="52" height="52" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
                                <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
                            </svg>
                        </div>
                        <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4"> Update Company </h1>
                        
                        <form
                        onSubmit={handleSubmit((data: any) => {
                            console.log('plz', data);
                            onSubmit(data)
                          })} >
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





                            
                           
             
                        </form>
                       
                        <div className="flex items-center justify-start w-full">
                        <button className="mr-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring--teal-600  transition duration-150 ease-in-out hover:bg-teal-500 bg-teal-600 rounded text-white px-8 py-2 text-sm"       type="submit">Update</button>
                            <button className="mr-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring--teal-600  transition duration-150 ease-in-out hover:bg-teal-500 bg-red-600 rounded text-white px-8 py-2 text-sm"     onClick={()=> props.setEdit(false)}  >Camcel</button>
                        </div>
                        <button className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"  aria-label="close modal" role="button">
                            <svg  xmlns="http://www.w3.org/2000/svg"  className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        
    </div>)
}