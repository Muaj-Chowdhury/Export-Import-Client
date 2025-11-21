import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | GameHub`;
  }, [title]);
};

export default useTitle;
