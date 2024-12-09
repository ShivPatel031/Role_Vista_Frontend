import React, { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.withCredentials=true;

// Utility function to simulate database fetch
const fetchRequestsFromDB = async () => {
  try {
    const response = await axios(`${import.meta.env.VITE_BACKEND_URL}/users/requestedUsers`);

    if(response?.data?.success)
    {
      return response.data.data;
    }
  } catch (error) {
    console.log(error)
  }

  return false;
};

// Table component
const Table = ({ children }) => (
  <table className="min-w-full divide-y divide-gray-200">
    {children}
  </table>
);

const TableHeader = ({ children }) => (
  <thead className="bg-gray-50">
    <tr>{children}</tr>
  </thead>
);

const TableBody = ({ children }) => (
  <tbody className="bg-white divide-y divide-gray-200">
    {children}
  </tbody>
);

const TableHead = ({ children }) => (
  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    {children}
  </th>
);

const TableRow = ({ children }) => (
  <tr>{children}</tr>
);

const TableCell = ({ children }) => (
  <td className="px-6 py-4 whitespace-nowrap">
    {children}
  </td>
);

// Button component
const Button = ({ onClick, variant, size, children }) => {
  const baseStyle = "font-medium rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantStyles = {
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-indigo-500",
    primary: "border border-transparent text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500",
  };
  const sizeStyles = {
    sm: "px-3 py-2",
    md: "px-4 py-2",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]}`}
    >
      {children}
    </button>
  );
};

// Badge component
const Badge = ({ variant, children }) => {
  const baseStyle = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
  const variantStyles = {
    success: "bg-green-100 text-green-800",
    destructive: "bg-red-100 text-red-800",
    secondary: "bg-gray-100 text-gray-800",
  };

  return (
    <span className={`${baseStyle} ${variantStyles[variant]}`}>
      {children}
    </span>
  );
};

// RequestRow component
const RequestRow = ({ request, onApprove, onReject }) => {
  const [showOption,setShowOption] = useState(true);
  return (
    <TableRow>
      <TableCell>{request.userName}</TableCell>
      <TableCell>{request.role}</TableCell>
      <TableCell>{request.branch}</TableCell>
      <TableCell>
        {showOption &&
        <div className="flex space-x-2">
          <Button onClick={() =>{ onApprove(request._id);setShowOption(false)}} variant="outline" size="sm">
            Approve
          </Button>
          <Button onClick={() => { onReject(request._id);setShowOption(false)}} variant="outline" size="sm">
            Reject
          </Button>
        </div>
        }
        
      </TableCell>
    </TableRow>
  );
};

// Main Requests component
const Requests = () => {
  const [requests, setRequests] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async ()=>
  {
    const response = await fetchRequestsFromDB();
    if(response){
      
      setRequests(response);
    }
    else
    {
      console.log("something went wrong while fetching requested user data");
      
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const approveUser = async (id)=>
  {
    const data = {requestedUserId:id}
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/approveUser`,data);

      if(response?.data?.success)
      {
        return true;
      }
    } catch (error) {
      console.log(error);
    }
    return false;
  }

  const handleApprove = async (id) => {

    if(await approveUser(id))
    {
      setRequests(requests.map(req => 
        req._id === id ? { ...req, status: 'approved',showOption:false } : req
      ));
    }
    else
    {
      console.log("something went wrong while approveing user.");
    }
  };

  const rejectUser = async (id)=>
    {
      const data = {requestedUserId:id}
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/rejectUser`,data);
  
        if(response?.data?.success)
        {
          return true;
        }
      } catch (error) {
        console.log(error);
      }
      return false;
    }

  const handleReject = async (id) => {
    if(await rejectUser(id))
      {
        setRequests(requests.map(req => 
          req._id === id ? { ...req, status: 'rejected',showOption:false } : req
        ));
      }
      else
      {
        console.log("something went wrong while approveing user.");
      }
    
  };

  if (loading) {
    return <div className="text-center p-4">Loading requests...</div>;
  }

  if(requests.length === 0) return <div className="text-center p-4">No requrest found.</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pending Requests</h1>
      <Table>
        <TableHeader>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Branch</TableHead>
          <TableHead>Actions</TableHead>
        </TableHeader>
        <TableBody>
          {requests.map((request) => {
            request.showOption=true;

            return <RequestRow
            key={request.id}
            request={request}
            onApprove={handleApprove}
            onReject={handleReject}
          />
          }
            
          )}
        </TableBody>
      </Table>
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Request Status</h2>
        {requests.map((request) => (
          <div key={request.id} className="flex items-center space-x-2 mb-2">
            <span>{request.userName}:</span>
            {request.status ? (
              <Badge variant={request.status === 'approved' ? 'success' : 'destructive'}>
                {request.status}
              </Badge>
            ) : (
              <Badge variant="secondary">pending</Badge>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export {Requests};

