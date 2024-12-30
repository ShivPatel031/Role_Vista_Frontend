import React from 'react';
import { useSelector } from 'react-redux';

// Card component
const Card = ({ className, children }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ className, children }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);

const CardContent = ({ className, children }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

const CardTitle = ({ className, children }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>{children}</h3>
);

// Avatar component
const Avatar = ({ className, children }) => (
  <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}>
    {children}
  </div>
);

const AvatarImage = ({ src, alt }) => (
  <img className="aspect-square h-full w-full" src={src} alt={alt} />
);

const AvatarFallback = ({ children }) => (
  <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
    {children}
  </div>
);

// Badge component
const Badge = ({ className, children }) => (
  <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
    {children}
  </div>
);

// Icon components
const Icon = ({ d }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={d} />
  </svg>
);

const MailIcon = () => (
  <Icon d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" />
);

const PhoneIcon = () => (
  <Icon d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
);

const BookOpenIcon = () => (
  <Icon d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
);

const CalendarIcon = () => (
  <Icon d="M8 2v4 M16 2v4 M3 10h18 M21 8v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
);

// Placeholder data (replace with actual data fetching logic in a real application)
const user = {
  userName: "johndoe",
  role: "user",
  gender: "male",
  mobileNo: "9876543210",
  email: "johndoe@example.com",
  branch: "cse",
  image: "/placeholder.svg?height=100&width=100",
  dob: "1990-01-01"
};

const ProfileItem = ({ icon, label, value }) => {
  return (
    <div className="flex items-center space-x-2">
      {icon && <span className="text-muted-foreground">{icon}</span>}
      <span className="font-medium">{label}:</span>
      <span>{value}</span>
    </div>
  );
};

const Profile = () => {
    const user = useSelector(state=>state.user.userData);
  return (
    <Card className="w-full max-w-3xl mx-auto h-[calc(100vh-21rem)]">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="w-20 h-20">
          <AvatarImage src={user.image || "./user.png"} alt={user.userName} />
          <AvatarFallback>{user.userName.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{user.userName}</CardTitle>
          <Badge className="mt-1 bg-primary text-primary-foreground">
            {user.role}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProfileItem icon={<MailIcon />} label="Email" value={user.email} />
          <ProfileItem icon={<PhoneIcon />} label="Mobile" value={user.mobileNo} />
          <ProfileItem icon={<BookOpenIcon />} label="Branch" value={user.branch} />
          <ProfileItem icon={<CalendarIcon />} label="Date of Birth" value={user.dob || 'Not provided'} />
          <ProfileItem label="Gender" value={user.gender} />
          <ProfileItem label="Posts" value={user.posts.length} />
        </div>
      </CardContent>
    </Card>
  );
};

export {Profile};

