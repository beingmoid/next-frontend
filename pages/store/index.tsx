import FormBuilder from "@components/formBuilder";
import { storeFields, storeschema } from "@components/formSchema/store";

export default function store(){
    return(<div>
             <FormBuilder formFields={storeFields} yupSchema={storeschema} className="w-full max-w-lg" ></FormBuilder>

    </div>)
}   