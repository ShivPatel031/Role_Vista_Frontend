import React from 'react';

// Card components
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

const CardDescription = ({ className, children }) => (
  <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>
);

// Badge component
const Badge = ({ variant = "default", className, children }) => {
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  };
  return (
    <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
};

// Accordion components
const Accordion = ({ type, collapsible, className, children }) => (
  <div className={`space-y-2 ${className}`}>{children}</div>
);

const AccordionItem = ({ value, children }) => (
  <div className="border rounded-lg">{children}</div>
);

const AccordionTrigger = ({ children }) => (
  <button className="flex w-full items-center justify-between p-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180">
    {children}
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
      className="h-4 w-4 shrink-0 transition-transform duration-200"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  </button>
);

const AccordionContent = ({ children }) => (
  <div className="px-4 pb-4">{children}</div>
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

const Shield = () => (
  <Icon d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
);

const Users = () => (
  <Icon d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75 M9 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />
);

const MessageSquare = () => (
  <Icon d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
);

const ThumbsUp = () => (
  <Icon d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
);

const CheckCircle2 = () => (
  <Icon d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M9 12l2 2 4-4" />
);

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">About RoleVista</CardTitle>
          <CardDescription className="text-center mt-2">
            A Role-Based Access Control (RBAC) System Built with the MERN Stack
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-6">
            RoleVista is a collaborative project created by me and my friend. We developed this system to enable users to post comments, like posts, and interact within their designated roles: Admin, Sub-Admin, and User. Our project incorporates secure user authentication, email verification, and hierarchical permission management to ensure an efficient and secure platform.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <FeatureItem icon={<Shield />} title="Role-Based Access Control">
              Hierarchical permissions for Admin, Sub-Admin, and User roles
            </FeatureItem>
            <FeatureItem icon={<Users />} title="User Management">
              Registration, verification, and admin approval process
            </FeatureItem>
            <FeatureItem icon={<MessageSquare />} title="Content Management">
              Create, manage, and delete posts and comments based on roles
            </FeatureItem>
            <FeatureItem icon={<ThumbsUp />} title="Interaction">
              Like posts and comment within designated branches
            </FeatureItem>
          </div>

          <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            <TechBadge>React.js</TechBadge>
            <TechBadge>Node.js</TechBadge>
            <TechBadge>Express.js</TechBadge>
            <TechBadge>MongoDB</TechBadge>
            <TechBadge>JWT</TechBadge>
            <TechBadge>Nodemailer</TechBadge>
            <TechBadge>Cloudinary</TechBadge>
          </div>

          <h2 className="text-2xl font-semibold mb-4">Project Workflow</h2>
          <Accordion type="single" collapsible className="w-full">
            <WorkflowItem value="item-1" title="User Registration">
              <ul className="list-disc pl-5">
                <li>Users register via the signup form</li>
                <li>Email verification link sent to the user</li>
                <li>Verified registration requests go to admin for approval</li>
              </ul>
            </WorkflowItem>
            <WorkflowItem value="item-2" title="Role-Based Permissions">
              <ul className="list-disc pl-5">
                <li>Users can post, like, and comment</li>
                <li>Sub-Admins manage users and content within their branch</li>
                <li>Admins have full control over the platform</li>
              </ul>
            </WorkflowItem>
            <WorkflowItem value="item-3" title="Branch Restrictions">
              <ul className="list-disc pl-5">
                <li>Sub-Admins and users interact within their assigned branch</li>
                <li>Hierarchical permissions ensure proper access control</li>
              </ul>
            </WorkflowItem>
          </Accordion>

          <h2 className="text-2xl font-semibold mt-6 mb-4">Project Achievements</h2>
          <ul className="list-none space-y-2">
            <AchievementItem>Mastered role-based access control with hierarchical permissions</AchievementItem>
            <AchievementItem>Implemented secure email verification and user authentication using JWT</AchievementItem>
            <AchievementItem>Integrated Cloudinary for efficient image management</AchievementItem>
            <AchievementItem>Gained experience with full-stack development using the MERN stack</AchievementItem>
          </ul>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">About the Creators</h2>
            <p>
              RoleVista was brought to life by two passionate developers - myself and my friend. We combined our skills and knowledge to create this comprehensive RBAC system, learning and growing throughout the development process. Our collaboration allowed us to tackle complex challenges and implement a robust solution that we're proud to share.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const FeatureItem = ({ icon, title, children }) => (
  <div className="flex items-start space-x-3">
    <div className="flex-shrink-0 mt-1">{icon}</div>
    <div>
      <h3 className="font-semibold">{title}</h3>
      <p>{children}</p>
    </div>
  </div>
);

const TechBadge = ({ children }) => (
  <Badge variant="secondary" className="text-sm">
    {children}
  </Badge>
);

const WorkflowItem = ({ value, title, children }) => (
  <AccordionItem value={value}>
    <AccordionTrigger>{title}</AccordionTrigger>
    <AccordionContent>{children}</AccordionContent>
  </AccordionItem>
);

const AchievementItem = ({ children }) => (
  <li className="flex items-center space-x-2">
    <CheckCircle2 />
    <span>{children}</span>
  </li>
);

export {AboutUs};

