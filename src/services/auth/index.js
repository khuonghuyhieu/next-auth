import { API } from "@/constants";
import Fetcher from "../fetch";

export const getMePromise = async (token) =>
  Fetcher.get(API.ME.DETAIL, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    next: { tags: ["me"], revalidate: Infinity },
  });
