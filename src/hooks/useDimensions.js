import React from "react";
export default function useDimensions() {
    const [dimensions, setDimensions] = React.useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const handleResize = () => {
        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };
    React.useEffect(() => {
        window.addEventListener("resize", handleResize, false);
    }, []);
    return dimensions;
}
