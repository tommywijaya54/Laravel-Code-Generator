import React from 'react';
import MainAuthenticatedLayout from '@/Layouts/MainAuthenticatedLayout';
import ListView from '@/Shared/ListView';

export default function Index(props) {
    
    const ListProperties = {
        ELEMENTS: props.view.split(","),
        ROUTE : props.route,
        DATA : props.data
    }

    return (
        <MainAuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            title={props.pagetitle}
        >
            <div className="overflow-x-auto bg-white rounded shadow">
                <ListView
                    props={ListProperties}
                ></ListView>

            </div>
        </MainAuthenticatedLayout>
    );
}
