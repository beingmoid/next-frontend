import DrawTable from '@components/dynamicTable';
import Table from '@components/table';
import fetcher from '@lib/fetcher';
import React, { useEffect } from 'react';
import AddCompany from './add';
import useSWR from 'swr';
import Modal from '@components/modal';
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
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Address',
        accessor: 'address'
      },
      {
        Header: 'Phone',
        accessor: 'phone'
      },
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: 'City',
        accessor: 'City'
      }
    ],
    []
  );
  const [showModal, setShowModal] = React.useState(false);
  async function fetching(): Promise<CompanyDTO[]> {
    var response = await fetch('http://192.168.100.43:5001/api/company', {
      method: 'GET',
      redirect: 'follow'
    })
      .then(response => response.json())
      .then(result => {
        return result as CompanyDTO[];
      });

    console.log(response);
    return response;
  }

  const { data, error } = useSWR<CompanyDTO[]>('api/company', fetching);
  return (
    <div>
      <header className="bg-white shadow">
        <strong> Manage Companies</strong>
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
          {data ? <Table columns={columns} data={data}></Table> : ''}
        </div>
      </main>
    </div>
  );
}
