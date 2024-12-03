// import React, { useState } from "react";

// const Permissions = () => {
//     const [roles, setRoles] = useState([
//         { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
//         { id: 2, name: "Editor", permissions: ["Read", "Write"] },
//         { id: 3, name: "Viewer", permissions: ["Read"] },
//         { id: 4, name: "Contributor", permissions: ["Read", "Write"] },
//         { id: 5, name: "Moderator", permissions: ["Read", "Delete"] },
//     ]);

//     const permissions = ["Read", "Write", "Delete"];

//     return (
//         <div>
//             <h1 className="text-3xl font-bold mb-4">Permissions</h1>
//             <div className="overflow-x-auto">
//                 <table className="min-w-full bg-white">
//                     <thead>
//                         <tr>
//                             <th className="py-2 px-4 border-b">Role</th>
//                             {permissions.map((permission) => (
//                                 <th key={permission} className="py-2 px-4 border-b">
//                                     {permission}
//                                 </th>
//                             ))}
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {roles.map((role) => (
//                             <tr key={role.id}>
//                                 <td className="py-2 px-4 border-b">{role.name}</td>
//                                 {permissions.map((permission) => (
//                                     <td key={permission} className="py-2 px-4 border-b">
//                                         <input type="checkbox" checked={role.permissions.includes(permission)} readOnly />
//                                     </td>
//                                 ))}
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default Permissions;
