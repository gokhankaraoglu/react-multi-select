import { axiosClient } from "./axiosClient";

interface BaseRequest {
  path: string;
}

// P = payload, R = ResponseType
export async function get<R>({ path }: BaseRequest): Promise<R> {
  const { data } = await axiosClient.get<R>(path);

  return data;
}
