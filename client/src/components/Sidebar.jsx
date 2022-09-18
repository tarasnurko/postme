import React from "react";

const Sidebar = (props) => {
  return (
    <aside className="fixed top-[60px] right-0 w-[360px] h-screen bg-emerald-200">
      {props.children}
    </aside>
  );
};

export default Sidebar;
