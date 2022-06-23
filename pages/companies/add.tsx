import FormBuilder from "@components/formBuilder";
import { Form } from "@lib/types";

import { NextPage } from "next";
import * as yup from "yup";
import { companyFields, companySchema } from "@components/formSchema/company";

  const AddCompany:NextPage= ()=>{
    return(

      <div>
        <FormBuilder formFields={companyFields} yupSchema={companySchema} className="w-full max-w-lg" ></FormBuilder>
      </div>

    )
}
export default AddCompany;