import { useState } from 'react'
import CustomTabs from '../../../components/shared/CustomTab';
import { useGetAllCategoriesQuery } from '../../../redux/api/graphqlBaseApi';
import Loading from '../../../components/shared/Loading';

const Tab = () => {

    const { data, error, isLoading } = useGetAllCategoriesQuery(undefined);
    const [tab, setTab] = useState("");

    if (isLoading) return
    <div>
        <Loading />
        Loading categories...
    </div>;
    if (error) return <div>Error fetching categories</div>;

    console.log(tab, "tab")
    return (
        <div>
            <CustomTabs tabs={data?.getAllCategories} setTab={setTab} />

        </div>
    )
}

export default Tab
