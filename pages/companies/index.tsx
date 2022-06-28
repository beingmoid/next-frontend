import DrawTable from '@components/dynamicTable';
import Table from '@components/table';
import fetcher from '@lib/fetcher';
import React, { useEffect, useState } from 'react';
import AddCompany from './add';
import useSWR from 'swr';
import { useQuery } from 'react-query'
import Modal from '@components/modal';
import axios from 'axios'
import { IBaseResponse } from '@components/BaseResponse';
import EditCompany from './edit';
import { AlertError, AlertSuccess } from '@components/sweetalert';
type CompanyDTO = {
  name: string;
  address: string;
  phone: string;
  email: string;
  city: string;
};
export default function Company() {
  const columns: any = React.useMemo(
    () => [
      {
        Header:'ID',
        accessor:'id',
        isVisible:false,
        
      },
      {
        Header: 'Company Name',
        accessor: 'companyName'
      },
      {
        Header: 'Website',
        accessor: 'website'
      },
      {
        Header: 'Address Line# 1',
        accessor: 'addressLine1'
      },
      {
        Header: 'Address Line# 2',
        accessor: 'addressLine2'
      },
      {
        Header: 'Zipcode',
        accessor: 'zipcode'
      },
      {
        Header: 'VAT NUMBER',
        accessor: 'vatNumber'
      },
      {
        Header: 'First Name',
        accessor: 'firstName'
      },
      {
        Header: 'Last Name',
        accessor: 'lastName'
      },
      {
        Header:'Actions'
      }

    ],
    []
  );
  const [showModal, setShowModal] = React.useState(false);


  const { isLoading, data, isFetched, isFetching } = useQuery<any>('company-key', async () => {

    return (await axios.get('http://localhost:3002/api/company', {
      method: 'GET'
    }).then(response => response.data)
      .then(res => {

        if ((res as IBaseResponse).dynamicResult.length > 0) {
          return (res as IBaseResponse).dynamicResult
        }
        else {
          return new Array<CompanyDTO>();
        }
      }));

  });

  const country = useQuery<any>('country-list', async () => {

    return (await axios.get('http://localhost:3002/api/lookup/countries', {
      method: 'GET'
    }).then(response => response.data)
      .then(res => {

        if ((res as IBaseResponse).dynamicResult.length > 0) {
          return (res as IBaseResponse).dynamicResult
        }
        else {
          return new Array<any>();
        }
      }));

  }, {
    cacheTime: 60000
  });

  const state = useQuery<any>('state-list', async () => {

    return (await axios.get('http://localhost:3002/api/lookup/states', {
      method: 'GET'
    }).then(response => response.data)
      .then(res => {

        if ((res as IBaseResponse).dynamicResult.length > 0) {
          return (res as IBaseResponse).dynamicResult
        }
        else {
          return new Array<any>();
        }
      }));

  }, {
    cacheTime: 60000
  });
  const city = useQuery<any>('city-list', async () => {
 
    return (await axios.get('http://localhost:3002/api/lookup/cities', {
      method: 'GET'
    }).then(response => response.data)
      .then(res => {


        if ((res as IBaseResponse).dynamicResult.length > 0) {
          return (res as IBaseResponse).dynamicResult
        }
        else {
          return new Array<any>();
        }
      }));

  }, {
    cacheTime: 60000
  });

  const deleteItem=(data:any)=>{
    axios.delete(
      'http://localhost:3002/api/company/'+data.id
    ).then(res=> res)
    .then(res=>{
      if((res.data as IBaseResponse).statusCode==200){
        AlertSuccess('Company has been deleted','');
      }
      else{
        AlertError('Company failed to delete','');
      }
    })
  }

const[edit,setEdit]=useState(false);
const [editData,setEditData]=useState({});
  const HandleChange =(data:any)=>{
    console.log('Parent',data);
    setEdit(true);
    setEditData(data);
  }

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
                <Modal setShowModal={setShowModal} modalTitle={"Manage Companies"} FormComponent={AddCompany} />


              </>
            ) : null}
          </div>
          {isFetching ? 'Loading' : <Table columns={columns} data={data} handleChange={HandleChange} deleteItem={deleteItem }></Table>}

          {edit?   <EditCompany data={editData} setEdit={setEdit}></EditCompany> :null}
        </div>
      </main>
    </div>
  );
}
