import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";
interface TrendingContent {
  id: number;
  backdrop_path: string;
  title: string;
  name: string;
  release_date?: string;
  first_air_date?: string;
  adult?: boolean;
  overview: string;
}

const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] =
    useState<TrendingContent | null>(null);
  const { contentType } = useContentStore();

  useEffect(() => {
    const getTrendingContent = async () => {
      const res = await axios.get(`/api/v1/${contentType}/trending`);
      setTrendingContent(res.data.content);
    };

    getTrendingContent();
  }, [contentType]);

  return { trendingContent };
};
export default useGetTrendingContent;
