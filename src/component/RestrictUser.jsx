import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
axios.defaults.withCredentials=true;

// Table component
const Table = ({ children, ...props }) => (
  <table className="w-full border-collapse" {...props}>{children}</table>
)

const TableHeader = ({ children, ...props }) => (
  <thead className="bg-gray-50" {...props}>{children}</thead>
)

const TableBody = ({ children, ...props }) => (
  <tbody className="bg-white divide-y divide-gray-200" {...props}>{children}</tbody>
)

const TableRow = ({ children, ...props }) => (
  <tr {...props}>{children}</tr>
)

const TableHead = ({ children, ...props }) => (
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" {...props}>{children}</th>
)

const TableCell = ({ children, ...props }) => (
  <td className="px-6 py-4 whitespace-nowrap text-center" {...props}>{children}</td>
)

// Checkbox component
const Checkbox = ({ checked, onCheckedChange, disabled, ...props }) => (
  <input
    type="checkbox"
    checked={checked}
    onChange={(e) => onCheckedChange(e.target.checked)}
    disabled={disabled}
    className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
    {...props}
  />
)

// Input component
const Input = ({ ...props }) => (
  <input
    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
    {...props}
  />
)

// Label component
const Label = ({ children, ...props }) => (
  <label className="block text-sm font-medium text-gray-700" {...props}>{children}</label>
)

const RestrictUser = () => {
  const loginUser = useSelector(state=>state?.user?.userData)
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  // Debugging user data
  

  // Handle permission change
  const handlePermissionChange = (userId, permissionKey) => {
    console.log(userId,permissionKey);
    setUsers(users.map((user) =>
      user._id === userId
        ? {
            ...user,
            permissions: {
              ...user.permissions,
              [permissionKey]: !user.permissions[permissionKey],
            },
          }
        : user
    ));
  };

  // Fetch all users with permissions
  const fetchAllUsersWithPermissions = async () => {
    try {
      const response = await axios(`${import.meta.env.VITE_BACKEND_URL}/users/fetchUsersWithPermissions`);
      if (response?.data?.success) {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchAllUsersWithPermissions();
  }, []);

  const changePermissionofThisUser = async (restrictedUserId)=>
  {
    let userpermission = users.filter(u=>u._id===restrictedUserId)[0];
    let data = {restrictedUserId,...userpermission.permissions};

    try{
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/modifyPermission`,data)

      if(response?.data?.success)
      {
        console.log("user permission changed successfully");
      }
    }catch(error)
    {
      console.log(error);
    }
  }

  // Filter logic
  const filteredUsers = users.filter(
    (user) =>
      user.userName.toLowerCase().includes(filter.toLowerCase()) ||
      user.role.toLowerCase().includes(filter.toLowerCase()) ||
      user.branch.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User and Sub-Admin Permissions</h1>

      {/* Filter Input */}
      <div className="mb-4">
        <Label htmlFor="filter">Filter:</Label>
        <Input
          id="filter"
          placeholder="Filter by name, role, or branch"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead>Can Post</TableHead>
              <TableHead>Can Comment</TableHead>
              <TableHead>Can Sub-Admin Restrict Post</TableHead>
              <TableHead>Can Sub-Admin Restrict Comment</TableHead>
              <TableHead>Change Permission</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.userName}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.branch}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={user.permissions.canPost}
                    onCheckedChange={() => handlePermissionChange(user._id, "canPost")}
                  />
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={user.permissions.canComment}
                    onCheckedChange={() => handlePermissionChange(user._id, "canComment")}
                  />
                </TableCell>
                <TableCell>
                  {user.role === "user" && loginUser.role === 'admin' && (
                    <Checkbox
                      checked={user.permissions.canSubAdminRestrictPost}
                      onCheckedChange={() => handlePermissionChange(user._id, "canSubAdminRestrictPost")}
                      disabled={user.role === "sub-admin"}
                    />
                  )}
                </TableCell>
                <TableCell>
                  {user.role === "user" && loginUser.role === 'admin' && (
                    <Checkbox
                      checked={user.permissions.canSubAdminRestrictComment}
                      onCheckedChange={() => handlePermissionChange(user._id, "canSubAdminRestrictComment")}
                      disabled={user.role === "sub-admin"}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <button onClick={()=>changePermissionofThisUser(user._id)}>Change</button>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export { RestrictUser };


