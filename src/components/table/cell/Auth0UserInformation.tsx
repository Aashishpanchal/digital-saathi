import { useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { textReduce } from "../../Utils";

function Auth0UserInformation(cell: { [key: string]: any }) {
  const reduceText = useCallback((text: string) => {
    return textReduce(text, 29);
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
