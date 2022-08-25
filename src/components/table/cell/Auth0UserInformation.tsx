import { useCallback, memo } from "react";
import { Link } from "react-router-dom";

function Auth0UserInformation(cell: { [key: string]: any }) {
  const reduceText = useCallback((text: string) => {
    return text.length > 29 ? text.slice(0, 29) + "..." : text;
  }, []);

  return (
    <Link
      to={"/auth0-users/".concat(cell.value)}
      className="font-bold underline"
    >
      {cell.value && reduceText(cell.value)}
    </Link>
  );
}

export default memo(Auth0UserInformation);
