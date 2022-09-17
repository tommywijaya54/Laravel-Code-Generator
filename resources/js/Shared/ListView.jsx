import { InertiaLink } from "@inertiajs/inertia-react"
import Icon from "./Icon"

export default ({props}) => {
    const PRIMARYID = props.PRIMARYID || "id";
    const ELEMENTS = props.ELEMENTS.map((el) => {
        return {label:el,property:el.toLowerCase()}
    })
    
    return <>
        <table className="w-full whitespace-nowrap table-padding-row"> 
                    <thead className="text-left">
                        <tr>
                            {
                                ELEMENTS.map((el, keyID) => {
                                    return <th key={keyID}>{el.label}</th>
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.DATA.map((data,i) => {
                                return <tr 
                                    key={i}
                                    className="hover:bg-gray-100 focus-within:bg-gray-100"
                                    >
                                    
                                    {
                                        ELEMENTS.map((el, keyID) => {
                                            return <td key={keyID}>{data[el.property]}</td>
                                        })
                                    }
                                    
                                    <td>
                                        <InertiaLink
                                            tabIndex="-1"
                                            href={route(props.ROUTE, data[PRIMARYID])}
                                            className="flex items-center px-4 focus:outline-none"
                                        >
                                        <Icon
                                            name="cheveron-right"
                                            className="block w-6 h-6 text-gray-400 fill-current"
                                        />
                                        </InertiaLink>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
            </table>
    </>
}