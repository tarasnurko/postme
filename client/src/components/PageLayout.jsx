import React from "react";

const PageLayout = ({ children, sidebar, gap = 10 }) => {
  return (
    <>
      <section className="container h-full mx-auto px-20">
        <div className={`w-[800px] h-full flex flex-col my-10 gap-${gap}`}>
          {children}
        </div>
        {sidebar}
      </section>
    </>
  );
};

export default PageLayout;
