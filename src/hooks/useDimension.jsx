import React, { useLayoutEffect, useState } from "react";

function useDimension(curr) {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useLayoutEffect(() => {
        const boundingBox = curr.getBoundingClientRect();
        setWidth(boundingBox.width);
        setHeight(boundingBox.height);
    });
    console.log(width,height)
    return { width, height };
};

export default useDimension;