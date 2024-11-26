import { useQuery } from "@tanstack/react-query";

const useSupabase = (fn: () => Promise<any>) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: [fn.name],
    queryFn: fn,
  });

  return { data: data ?? [], loading: isLoading, refetch };
};

export default useSupabase;
