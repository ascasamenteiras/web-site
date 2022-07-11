import React from "react";

export const Row = ({ opt, children }) => {
  const rowWidth = opt.isBoxed ? "boxed-column" : "full-width-row";
  const alignTo = opt.alignTo ? `align-to-${opt.alignTo}` : "";
  const templateColumns = `repeat(${opt.numColumns ||
    "1"}, ${opt.widthColumns || "1fr"})`;
  const bgParent = opt.bgColor && opt.isBoxed === false ? opt.bgColor : null;
  const bgChild = opt.bgColor && opt.isBoxed === true ? opt.bgColor : null;
  return (
    <div
      className={`${rowWidth} ${opt.classes} ${alignTo} responsive-padding`}
      style={{
        backgroundColor: bgParent,
      }}
    >
      <div
        className={rowWidth + "-child " + opt.classes}
        role={opt.role || null}
        style={{
          backgroundColor: bgChild,
          display: "grid",
          gridTemplateColumns: templateColumns,
        }}
      >
        {children}
      </div>
    </div>
  );
};
