
import { NextPage } from "next";
import { Component } from "react"

type Props={
    setShowModal:any;
    modalTitle:string;
    FormComponent:any
}
const Modal = ({setShowModal,modalTitle,FormComponent}:Props)=>{


    return(  <>
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
                        <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">{modalTitle} </h1>
                        
                       <FormComponent setShowModal={setShowModal}/>
                        <div className="flex items-center justify-start w-full">
                          
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
        
      </>)
}
export default Modal;
