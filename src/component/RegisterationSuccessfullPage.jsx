import React from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationSuccess = () => {

  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Registration Successful!</h1>
        <div className="space-y-4">
          <p className="text-gray-700">
            Thank you for registering with Role Vista. Your account has been created successfully.
          </p>
          <p className="text-gray-700 font-semibold">
            Please verify your email to continue.
          </p>
          <p className="text-gray-600 text-sm">
            After email verification, your request will be sent to an admin for approval.
          </p>
        </div>
        <div className="mt-8">
            <button 
            className="w-full"
            onClick={()=>navigate('/')}>
              Return to Home Page
            </button>
        </div>
      </div>
    </div>
  );
};

export {RegistrationSuccess};

