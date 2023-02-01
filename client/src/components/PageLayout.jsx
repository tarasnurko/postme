import React from "react";

const PageLayout = ({ children, gap = 10 }) => {
  return (
    <section
      className={`w-full md:w-[700px] lg:w-[900px] h-full px-10 md:px-0  sm:mx-auto `}
    >
      <div className={`flex flex-col my-10 gap-${gap}`}>{children}</div>
    </section>
  );
};

export default PageLayout;
