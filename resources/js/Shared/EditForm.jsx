import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import TextInput from '@/Shared/TextInput';
import LoadingButton from '@/Shared/LoadingButton';
import SelectInput from '@/Shared/SelectInput';

export default ({props}) => {
    const PRIMARYID = props.PRIMARYID || "id";
    const ELEMENTS = props.ELEMENTS.map((el) => {
        return {label:el,property:el.toLowerCase()}
    })

    const setInitialFormData = (Elements,Data) => {
        let fData = {};
        Elements.forEach((el) => {
            fData[el.property] = FORMPROPS.DATA[el.property] || ''
        })
        return fData;
    }

    const InitialFormData = setInitialFormData(ELEMENTS,FORMPROPS.DATA);
    
    const { data, setData, errors, post, processing } = useForm({
        ...InitialFormData,
        _method: 'PUT'
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route(FORMPROPS.ROUTE.UPDATE, FORMPROPS.DATA[FORMPROPS.PRIMARYID]));
    }

    return <>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap p-8 -mb-8 -mr-6">
                    {ELEMENTS.map((Element) => {
                        if(Element.element == "row"){
                            return (
                                <div class="w-full pb-8 pr-6 lg:w-1/2"></div>
                            )
                        }

                        if(Element.options){
                            return (
                                <SelectInput
                                    className="w-full pb-8 pr-6 lg:w-1/2"
                                    label={Element.label}
                                    name={Element.property}
                                    errors={errors[Element.property]}
                                    value={data[Element.property]}
                                    onChange={e => setData(Element.property, e.target.value)}
                                >
                                    {Element.options.map((option, keyID) => {
                                        return <option value={option} key={keyID}>
                                            {option}
                                        </option>
                                    })}
                                </SelectInput>
                            )
                        }

                        return (
                            <TextInput
                                className="w-full pb-8 pr-6 lg:w-1/2"
                                label={Element.label}
                                name={Element.property}
                                errors={errors[Element.property]}
                                value={data[Element.property]}
                                onChange={e => setData(Element.property, e.target.value)}
                            />
                        )
                    })}
                </div>

                <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
                    <LoadingButton
                        loading={processing}
                        type="submit"
                        className="ml-auto btn-indigo"
                    >
                        Update
                    </LoadingButton>
                </div>
            </form>
        </>
}