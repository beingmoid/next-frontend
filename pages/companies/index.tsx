import DrawTable from "@components/dynamicTable";
import Table from "@components/table";
import fetcher from "@lib/fetcher";
import React, { useEffect } from "react";
import useSWR from "swr";
type CompanyDTO = {
    name: string;
    address:string;
    phone:string;
    email:string;
    city:string;
  }
export default function Company(){
  
    const columns:any = React.useMemo(
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
            accessor: 'phone',
  
          },
          {
            Header: 'Email',
            accessor: 'email',
   
          },
          {
            Header: 'City',
            accessor: 'City',

          }
        ],
        []
      );

     
 async  function fetching():Promise<CompanyDTO[]> {

    var response =  await  fetch("http://localhost:3002/api/company", {
            method: 'GET',
            redirect: 'follow'
          })
          .then(response => response.json())
          .then((result)=>{
            return result as CompanyDTO[];
          });

          console.log(response)
          return response ;

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
            <div className="p-3 flex justify-center">
              
            </div>
            <div className="p-3 flex justify-end">
              <button
                className="bg-teal-600 hover:bg-blue-700 text-white font-medium py-2 px-4  rounded"
              >
                Add Company
              </button>
            </div>
          </div>

            <Table columns={columns} data={data}></Table>
          </div>
          </main>
          </div>
    )
} 