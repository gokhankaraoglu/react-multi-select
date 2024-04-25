import { ICharacter } from "../types/character";
import { useGet } from "../utils/api/factory";

interface IResult<T> {
  info: {
    count: number;
    next: string;
    pages: number;
    prev: string;
  };
  results: T[];
}

interface CustomError {
  response?: {
    data?: {
      error?: string;
    };
  };
}

export function useGetCharacters(options: { name?: string }) {
  const queryParams: string[] = [];

  const { name } = options;

  if (name) {
    queryParams.push(`name=${name}`);
  }

  const filterQuery = queryParams.length ? `?${queryParams.join("&")}` : "";

  const { data, isLoading, isError, error } = useGet<IResult<ICharacter>>(
    `character${filterQuery}`
  );

  const customError = error as CustomError;
  const errorMessage = customError?.response?.data?.error;

  return { data, isLoading, isError, errorMessage };
}
