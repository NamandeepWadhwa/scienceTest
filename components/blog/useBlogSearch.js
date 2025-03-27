"use strict";
"use client";

import axios from "axios";
import { useEffect } from "react";

export default function useBlogSearch(props) {
  // Clear data when query changes
  useEffect(() => {
    setData([]); // This runs only when query changes
  }, [tag]);

  useEffect(() => {
    let cancel;
    setLoading(true);

    axios({
      method: "GET",
      url: "https://openlibrary.org/search.json",
      params: { q: tag, page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setHasMore(res.data.docs.length > 0);
        setData((prevData) => {
          return [
            ...new Set([...prevData, ...res.data.docs.map((d) => d.title)]),
          ];
        });

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);

        if (axios.isCancel(error)) return;
        console.log(error);
        setError(true);
      });

    return () => cancel();
  }, [query, pageNumber]); // setData, setLoading, setError are NOT needed in dependencies

  // ✅ No unnecessary re-renders!
}
