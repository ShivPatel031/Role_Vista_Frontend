
import React, { useEffect, useState } from 'react'
import axios from 'axios'
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
  <td className="px-6 py-4 whitespace-nowrap" {...props}>{children}</td>
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

// Button component
const Button = ({ children, ...props }) => (
  <button
    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    {...props}
  >
    {children}
  </button>
)

const RemoveUser = () => {
  

  const [users, setUsers] = useState([])
  const [filter, setFilter] = useState('')

  const handleRemoveStudent = async (studentId) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/removeUser`,{userId:studentId});

        if(response?.data?.success)
        {
            console.log("user remove successfull.");
            setUsers(users.filter(student => student._id !== studentId))
        }
    } catch (error) {
        console.log(error);
    }
    
  }

  const fetchAllUsers = async () => {
    try {
      const response = await axios(`${import.meta.env.VITE_BACKEND_URL}/users/fetchUserstoRemove`);
      if (response?.data?.success) {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(()=>{
    fetchAllUsers()
  },[])

  const filteredStudents = users.filter(student => 
    student.userName.toLowerCase().includes(filter.toLowerCase()) ||
    student.role.toLowerCase().includes(filter.toLowerCase()) ||
    student.branch.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Remove Student</h1>
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
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.userName}</TableCell>
                <TableCell>{student.role}</TableCell>
                <TableCell>{student.branch}</TableCell>
                <TableCell>
                  <Button onClick={() => handleRemoveStudent(student._id)}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {filteredStudents.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No students found.</p>
      )}
    </div>
  )
}

export {RemoveUser}

