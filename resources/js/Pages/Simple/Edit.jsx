import React from 'react';
import MainAuthenticatedLayout from '@/Layouts/MainAuthenticatedLayout';
import EditForm from '@/Shared/EditForm';

export default function Edit(props) {
    const FormProperties = {
        ELEMENTS: [
            { label:'Name', property: 'name' },
            { label:'Phone', property: 'phone' },
            { label:'Address', property: 'address' },
            { label:'Email', property: 'email' },
            { label:'Note', property: 'note' },
            
            { element: 'row' },
            

            { label:'Join Date', property: 'join_date' },
            { label:'Exit Date', property: 'exit_date' },
            
            { label:'Relatives Name', property: 'relatives_name' },
            { label:'Relatives Phone', property: 'relatives_phone' },
            { label:'Relatives Note', property: 'relatives_note' },
        ],
        ROUTE : {
            UPDATE : 'employee.update'
        },
        DATA : props.employee,
        PRIMARYID : 'id'
    }

    return (
        <MainAuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            title={props.employee.name}>
                
                <div className='mx-8 mb-12'>
                    <h2 className='text-lg font-bold mb-2'>Employee details</h2>
                    <div className='bg-white rounded shadow'>
                        <EditForm 
                            FORMPROPS={FormProperties}
                        ></EditForm>
                    </div>
                </div>

        </MainAuthenticatedLayout>
    );
}

