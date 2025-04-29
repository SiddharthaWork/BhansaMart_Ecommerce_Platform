import { useGetUserQuery } from "../redux/api/graphqlBaseApi";

const useFetchUserById = () => {
    const userString = localStorage.getItem("user");
    const userData = userString ? JSON.parse(userString) : null;
    const userId = userData?._id;

    const { data, error, isLoading, refetch } = useGetUserQuery({
        userId: userId,
    });

    return { data, error, isLoading, refetch };
};

export default useFetchUserById;
