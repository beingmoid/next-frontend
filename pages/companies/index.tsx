import DrawTable from '@components/dynamicTable';
import Table from '@components/table';
import fetcher from '@lib/fetcher';
import React, { useEffect } from 'react';
import AddCompany from './add';
import useSWR from 'swr';
import {useQuery} from 'react-query'
import Modal from '@components/modal';
import axios from 'axios'
type CompanyDTO = {
  name: string;
  address: string;
  phone: string;
  email: string;
  city: string;
};
export default  function Company() {
  const columns: any = React.useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'firstName'
      },
      {
        Header: 'Last Name',
        accessor: 'lastName'
      },
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header:'City',
        accessor:'cityId'
      }
      
    ],
    []
  );
  const [showModal, setShowModal] = React.useState(false);


 const {isLoading,data,isFetched,isFetching}= useQuery<any>('company-key',  async ()=>{

   return (await axios.get('http://localhost:3002/api/company',{
    method:'GET'
  }).then(response=> response.data)
  .then(res=>{

        if(res.length>0){
            return res 
        }
        else{
          return new Array<CompanyDTO>();
        }
  })) ;

});

const country = useQuery<any>('country-list',async ()=>{

  return (await axios.get('http://localhost:3002/api/lookup/countries',{
    method:'GET'
  }).then(response=> response.data)
  .then(res=>{

        if(res.length>0){
            return res 
        }
        else{
          return new Array<any>();
        }
  })) ;

},{
  cacheTime:60000
});

const state = useQuery<any>('state-list',async ()=>{

  return (await axios.get('http://localhost:3002/api/lookup/states',{
    method:'GET'
  }).then(response=> response.data)
  .then(res=>{

        if(res.length>0){
            return res 
        }
        else{
          return new Array<any>();
        }
  })) ;

},{
  cacheTime:60000
});
const city = useQuery<any>('city-list',async ()=>{

  return (await axios.get('http://localhost:3002/api/lookup/cities',{
    method:'GET'
  }).then(response=> response.data)
  .then(res=>{

        if(res.length>0){
            return res 
        }
        else{
          return new Array<any>();
        }
  })) ;

},{
  cacheTime:60000
});

 


  return (
    <div>
      <header className="bg-white shadow">
        <strong> Manage Companies {isLoading} </strong>
      </header>
      <main>
        <div className="container mx-auto">
          <div className="grid grid-cols-2 gap-6">
            <div className="p-3 flex justify-center"></div>
            <div className="p-3 flex justify-end">
            <button
        className="bg-teal-600 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3
         rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add Company
      </button>
        
            </div>
       
      {showModal ? (
      <>
      <Modal setShowModal={setShowModal} modalTitle={"Manage Companies"} FormComponent={AddCompany}/>
          
      
      </>
      ) : null}
          </div>
          {isFetching ? 'Loading'  : <Table columns={columns} data={data}></Table>}
        </div>
      </main>
    </div>
  );
}
