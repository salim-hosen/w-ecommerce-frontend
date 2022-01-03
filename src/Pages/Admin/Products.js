import React, { Fragment } from "react";
import AdminSidebar from "../../Components/Layouts/AdminSidebar";

export default function Products() {
  return (
    <Fragment>
      <div className="flex flex-row flex-wrap">
        <AdminSidebar></AdminSidebar>

        <main role="main" className="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
          <div className="w-full h-full rounded border-dashed border-2 border-gray-300">
            Admin Produccts
          </div>
        </main>
      </div>
    </Fragment>
  );
}
