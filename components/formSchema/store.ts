import * as yup from 'yup';
import { string } from 'yup';

type LabelValuePair = {
    label: string;
    value: string;
  };
  
  // Now let's create the actual pairs: 
  const formPairs: Array<LabelValuePair> = [
    { label: 'Stein', value: 'stone' },
    { label: 'Glas', value: 'glas' },
    { label: 'Plastik', value: 'plastic' },
  ];
  type SelectType = typeof formPairs[number]['value'];
const Countries =(countries:string[])=> {

    return ["Pakistan","USA"];
}

export const storeschema = yup.object({
  ownerName: yup.string().defined().required(),
  accountEmail: yup.string().default('').required(),
  lineInventory:yup.string().default('').required(),
  defaultCurrency:yup.mixed<SelectType>().oneOf(formPairs.map(i=>i.value)),
  dateFormat:yup.mixed<SelectType>().oneOf(formPairs.map(i=>i.value)),
  weightUnit:yup.mixed<SelectType>().oneOf(formPairs.map(i=>i.value)),
  dimensions:yup.mixed<SelectType>().oneOf(formPairs.map(i=>i.value)),
  nextInvoiceNumber:yup.string().default('').required(),
  nextPoNumber:yup.string().default('').required(),
  phone:yup.string().default('').required(),
  shippingLabelSize:yup.mixed<SelectType>().oneOf(formPairs.map(i=>i.value)),

  vatNumber:yup.string().default('').required(),
});

interface store extends yup.InferType<typeof storeschema> {}

export const storeFields=[

    {
      name: "ownerName", // Name should be unique and is our identifier
      label: "Owner Name",
      className:"mb-5 mt-2 text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border",
      placeholder: "Tommy",
      type: "text" // Type is defined by ourselves, based on this we will add validations
    },
   
    {
        name: "accountEmail", // Name should be unique and is our identifier
        label: "Account Name",
        className:"mb-5 mt-2 text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border",
        placeholder: "Tommy@hotmail.com",
        type: "text" // Type is defined by ourselves, based on this we will add validations
      },
      {
        name: "liveInventory", // Name should be unique and is our identifier
        label: "Live Inventory",
        className:"mb-5 mt-2 text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border",
        placeholder: "",
        type: "text" // Type is defined by ourselves, based on this we will add validations
      },
      {
        name: "defaultCurrency", // Name should be unique and is our identifier
        label: "Default Currency",
        className:"mb-5 mt-2 text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border",
        placeholder: "",
        type: "select" // Type is defined by ourselves, based on this we will add validations
      },
    
      {
        name: "dateFormat", // Name should be unique and is our identifier
        label: "Date Format",
        className:"mb-5 mt-2 text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border",
        placeholder: "",
        type: "select" // Type is defined by ourselves, based on this we will add validations
      },
    
      {
        name: "weightUnit", // Name should be unique and is our identifier
        label: "Weight Unit",
        className:"mb-5 mt-2 text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border",
        placeholder: "",
        type: "select" // Type is defined by ourselves, based on this we will add validations
      },
    
      {
        name: "dimensions", // Name should be unique and is our identifier
        label: "Dimensions",
        className:"mb-5 mt-2 text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border",
        placeholder: "",
        type: "select" // Type is defined by ourselves, based on this we will add validations
      },
      {
        name: "nextInvoiceNumber", // Name should be unique and is our identifier
        label: "Next Invoice Number",
        className:"mb-5 mt-2 text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border",
        placeholder: "",
        type: "text" // Type is defined by ourselves, based on this we will add validations
      },
      {
        name: "nextPoNumber", // Name should be unique and is our identifier
        label: "Next PO Number",
        className:"mb-5 mt-2 text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border",
        placeholder: "",
        type: "text" // Type is defined by ourselves, based on this we will add validations
      },
      {
        name: "shippingLableSize", // Name should be unique and is our identifier
        label: "Shipping Label Size",
        className:"mb-5 mt-2 text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border",
        placeholder: "",
        type: "text" // Type is defined by ourselves, based on this we will add validations
      },
      {
        name: "uploadLogo", // Name should be unique and is our identifier
        label: "Upload Logo",
        className:"mb-5 mt-2 text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border",
        placeholder: "",
        type: "upload" // Type is defined by ourselves, based on this we will add validations
      },
    
  ];