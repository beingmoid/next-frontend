import * as yup from 'yup';
import { string } from 'yup';
import {useQuery} from 'react-query';



type LabelValuePair = {
    id: number;
    name: string;
  };
  
  // Now let's create the actual pairs: 
  const formPairs: Array<LabelValuePair> = [
  
  ];
  type SelectType = typeof formPairs[number]['value'];
const Countries =(countries:string[])=> {

    return ["Pakistan","USA"];
}

export const companySchema = yup.object({
  companyName: yup.string().defined().required(),
  email:yup.string().defined().required(),
  countryId:yup.mixed<any>().oneOf(formPairs.map(i=>i.id)),
  stateId:yup.mixed<any>().oneOf(formPairs.map(i=>i.id)),
  cityId:yup.mixed<any>().oneOf(formPairs.map(i=>i.id)),
  postalCode:yup.string().default('').required(),
  phone:yup.string().default('').required(),
  vatNumber:yup.string().default('').required(),
});

interface Company extends yup.InferType<typeof companySchema> {}

export const companyFields=[

    {
      name: "companyName", // Name should be unique and is our identifier
      label: "Company Name",
      className:"mb-5 mt-2 text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border",
      placeholder: "Tommy",
      type: "text" // Type is defined by ourselves, based on this we will add validations
    },
    {
      name: "websiteUrl",
      className:"mb-5 mt-2 text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border",
      label: "Website Url",
      placeholder: "https://",
      type: "text"

    },
    {
      name: "addressLine1",
      label: "Address Line 1",
      className:"mb-5 mt-2 text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border",

      placeholder: "Address Line 1",
      type: "text"
    },
    {
      name: "addressLine2",
      label: "Address Line 2",
      placeholder: "Address Line 2",
      className:"mb-5 mt-2 text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border",

      type: "text"
    },
    {
      name: "country",
      label: "Country",
      placeholder: "Country",
      className:"mb-5 mt-2 text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center pl-3 text-sm border border-gray-200rounded border",
      type: "select",
      queryKey:'country-list',
    },
    {
      name: "stateId",
      label: "State",
      placeholder: "State",
      className:"mb-5 mt-2 text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border",
      queryKey:'state-list',
      type: "select"
    },
    {
      name: "cityId",
      label: "City",
      placeholder: "City",
      className:"mb-5 mt-2 text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border",
      queryKey:'city-list',
      type: "select"
    },
    {
      name: "postalCode",
      label: "Postal Code",
      placeholder: "Wiseau",
      className:"mb-5 mt-2 text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border",

      type: "text"
    },
    {
      name: "phone",
      label: "Phone",
      placeholder: "Phone",
      className:"mb-5 mt-2 text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border",

      type: "text"
    },

    {
      name: "vatNumber",
      label: "VAT ",
      placeholder: "https://...",
      className:"mb-5 mt-2 text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border",

      type: "text"
    },
    // {
    //     name: "Uploader",
    //     label: "Uploader",
    //     placeholder: "https://...",
    //     className:"mb-5 mt-2 text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border",
  
    //     type: "upload"
    //   }
  ];