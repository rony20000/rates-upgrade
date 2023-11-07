import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

export default function useFetchDate<t>(url: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState<t>();

  useEffect(() => {
    const axiosCancelSource = axios.CancelToken.source();

    setIsLoading(true);
    setError("");
    const fetchData = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_SERVER_URL + url, {
          headers: { apiKey: import.meta.env.VITE_SERVER_API_KEY },
        });
        setIsLoading(false);
        setData(res.data);
      } catch (error) {
        setIsLoading(false);
        setData(undefined);
        if (error instanceof AxiosError) {
          setError(error.response?.data.error.message);
        } else {
          setError("we are sorry something went wrong, please try again later");
        }
      }
    };
    fetchData();
    return () => axiosCancelSource.cancel();
  }, [url]);

  return { isLoading, error, data };
}
