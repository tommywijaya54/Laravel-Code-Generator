import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/inertia-react';

export default function MainAuthenticatedLayout({auth, errors, title, children}) {
    const {flash} = usePage().props;

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{title}</h2>}
        >
            <Head title={title} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {flash.message && (
                        <div className="alert">{flash.message}</div>
                    )}
                    {children}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}