// import { Outlet } from 'react-router-dom';

// export default function AuthLayout() {
//   return (
//     <div className="bg-neutral-off-white min-h-screen flex items-center justify-center p-md md:p-xl font-body-regular text-body-regular text-on-surface">
//       {}
//       <Outlet /> 
//     </div>
//   );
// }

import React from 'react';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="bg-neutral-off-white min-h-screen flex items-center justify-center p-md md:p-xl font-body-regular text-body-regular text-on-surface">
      <Outlet />
    </div>
  );
}