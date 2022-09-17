import { InertiaLink } from "@inertiajs/inertia-react"
import Icon from "./Icon"

export default ({headers, listmap, listdata, routeto}) => {
    return <>
        <table className="w-full whitespace-nowrap table-padding-row"> 
                    <thead className="text-left">
                        <tr>
                            {
                                headers.map((header) => {
                                    return <th>{header}</th>
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listdata.map((data,i) => {
                                return <tr 
                                    key={i}
                                    className="hover:bg-gray-100 focus-within:bg-gray-100"
                                    >
                                    
                                    {
                                        listmap.map((datamapper) => {
                                            return <td>{data[datamapper]}</td>
                                        })
                                    }
                                    
                                    <td>
                                        <InertiaLink
                                            tabIndex="-1"
                                            href={route(routeto, data.id)}
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