// /* eslint-disable react-refresh/only-export-components */
// import { createFileRoute, useNavigate } from "@tanstack/react-router";
// import { useState } from "react";
// import {
//   LayoutDashboard,
//   Mail,
//   FolderGit2,
//   Cpu,
//   Briefcase,
//   Layers,
//   MessageSquareQuote,
// } from "lucide-react";

// import AdminSidebar from "../components/admin/AdminSidebar";
// import AdminHeader from "../components/admin/AdminHeader";
// import AdminModal from "../components/admin/AdminModal";
// import OverviewTab from "../components/admin/tabs/OverviewTab";
// import MessagesTab from "../components/admin/tabs/MessagesTab";
// import ProjectsTab from "../components/admin/tabs/ProjectsTab";
// import SkillsTab from "../components/admin/tabs/SkillsTab";
// import ExperienceTab from "../components/admin/tabs/ExperienceTab";
// import ServicesTab from "../components/admin/tabs/ServicesTab";
// import TestimonialsTab from "../components/admin/tabs/TestimonialsTab";
// import { authService } from "../services/auth.service";

// export const Route = createFileRoute("/admin/")({
//   component: AdminDashboard,
// });

// function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const navigate = useNavigate();

//   // State collections (keeping your exact mockup states)
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       name: "Sarah Jenkins",
//       email: "sarah@example.com",
//       date: "2026-11-06",
//       subject: "Full-Stack Project Inquiry",
//       message:
//         "Hi Deme, love your portfolio! We need a React & Node.js expert.",
//       read: false,
//     },
//   ]);
//   const [projects, setProjects] = useState([
//     {
//       id: 1,
//       title: "Exit Exam Preparation Platform",
//       category: "EdTech",
//       tech: "React, Node.js, PostgreSQL",
//       status: "Active",
//     },
//   ]);
//   const [skills, setSkills] = useState([
//     {
//       id: 1,
//       name: "React / TypeScript",
//       category: "Frontend",
//       proficiency: "95%",
//     },
//   ]);
//   const [experiences, setExperiences] = useState([
//     {
//       id: 1,
//       role: "University Lecturer",
//       company: "Mekdela Amba University",
//       period: "2025 - Present",
//     },
//   ]);
//   const [services, setServices] = useState([
//     {
//       id: 1,
//       title: "Full-Stack Web Development",
//       description: "Building scalable, high-performance web apps.",
//     },
//   ]);
//   const [testimonials, setTestimonials] = useState([
//     {
//       id: 1,
//       author: "Meseret Belay",
//       role: "Software Developer",
//       quote: "Deme is an exceptional engineer.",
//     },
//   ]);

//   // Modal controls
//   const [showModal, setShowModal] = useState(false);
//   const [modalType, setModalType] = useState("");
//   const [formData, setFormData] = useState({
//     title: "",
//     category: "",
//     tech: "",
//     name: "",
//     role: "",
//     company: "",
//     period: "",
//     description: "",
//     author: "",
//     quote: "",
//     proficiency: "",
//   });

//   const handleLogout = async () => {
//     try {
//       await authService.logout();
//     } catch (err) {
//       console.error("Logout failed", err);
//     } finally {
//       navigate({ to: "/admin/login" });
//     }
//   };

//   const handleAddItem = (e) => {
//     e.preventDefault();
//     const newId = Date.now();
//     if (modalType === "project")
//       setProjects([
//         ...projects,
//         {
//           id: newId,
//           title: formData.title,
//           category: formData.category,
//           tech: formData.tech,
//           status: "Active",
//         },
//       ]);
//     else if (modalType === "skill")
//       setSkills([
//         ...skills,
//         {
//           id: newId,
//           name: formData.name,
//           category: formData.category,
//           proficiency: formData.proficiency,
//         },
//       ]);
//     else if (modalType === "experience")
//       setExperiences([
//         ...experiences,
//         {
//           id: newId,
//           role: formData.role,
//           company: formData.company,
//           period: formData.period,
//         },
//       ]);
//     else if (modalType === "service")
//       setServices([
//         ...services,
//         { id: newId, title: formData.title, description: formData.description },
//       ]);
//     else if (modalType === "testimonial")
//       setTestimonials([
//         ...testimonials,
//         {
//           id: newId,
//           author: formData.author,
//           role: formData.role,
//           quote: formData.quote,
//         },
//       ]);

//     setFormData({
//       title: "",
//       category: "",
//       tech: "",
//       name: "",
//       role: "",
//       company: "",
//       period: "",
//       description: "",
//       author: "",
//       quote: "",
//       proficiency: "",
//     });
//     setShowModal(false);
//   };

//   const navItems = [
//     { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
//     { id: "projects", label: "Projects", icon: FolderGit2 },
//     { id: "skills", label: "Skills", icon: Cpu },
//     { id: "experience", label: "Experience", icon: Briefcase },
//     { id: "services", label: "Services", icon: Layers },
//     { id: "testimonials", label: "Testimonials", icon: MessageSquareQuote },
//     {
//       id: "messages",
//       label: "Contact Messages",
//       icon: Mail,
//       badge: messages.filter((m) => !m.read).length,
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-background text-foreground flex">
//       <AdminSidebar
//         navItems={navItems}
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         isSidebarOpen={isSidebarOpen}
//         setIsSidebarOpen={setIsSidebarOpen}
//         onLogout={handleLogout}
//       />

//       <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
//         <AdminHeader
//           activeTab={activeTab}
//           onOpenSidebar={() => setIsSidebarOpen(true)}
//         />

//         <div className="p-6 lg:p-10 max-w-7xl w-full mx-auto space-y-8">
//           {activeTab === "dashboard" && (
//             <OverviewTab
//               projects={projects}
//               messages={messages}
//               skills={skills}
//               experiences={experiences}
//               onDeleteMessage={(id) =>
//                 setMessages(messages.filter((m) => m.id !== id))
//               }
//             />
//           )}

//           {activeTab === "messages" && (
//             <MessagesTab
//               messages={messages}
//               onMarkRead={(id) =>
//                 setMessages(
//                   messages.map((m) => (m.id === id ? { ...m, read: true } : m)),
//                 )
//               }
//               onDelete={(id) =>
//                 setMessages(messages.filter((m) => m.id !== id))
//               }
//             />
//           )}

//           {activeTab === "projects" && (
//             <ProjectsTab
//               projects={projects}
//               onOpenAddModal={() => {
//                 setModalType("project");
//                 setShowModal(true);
//               }}
//               onDelete={(id) =>
//                 setProjects(projects.filter((p) => p.id !== id))
//               }
//             />
//           )}

//           {activeTab === "skills" && (
//             <SkillsTab
//               skills={skills}
//               onOpenAddModal={() => {
//                 setModalType("skill");
//                 setShowModal(true);
//               }}
//               onDelete={(id) => setSkills(skills.filter((s) => s.id !== id))}
//             />
//           )}

//           {activeTab === "experience" && (
//             <ExperienceTab
//               experiences={experiences}
//               onOpenAddModal={() => {
//                 setModalType("experience");
//                 setShowModal(true);
//               }}
//               onDelete={(id) =>
//                 setExperiences(experiences.filter((e) => e.id !== id))
//               }
//             />
//           )}

//           {activeTab === "services" && (
//             <ServicesTab
//               services={services}
//               onOpenAddModal={() => {
//                 setModalType("service");
//                 setShowModal(true);
//               }}
//               onDelete={(id) =>
//                 setServices(services.filter((s) => s.id !== id))
//               }
//             />
//           )}

//           {activeTab === "testimonials" && (
//             <TestimonialsTab
//               testimonials={testimonials}
//               onOpenAddModal={() => {
//                 setModalType("testimonial");
//                 setShowModal(true);
//               }}
//               onDelete={(id) =>
//                 setTestimonials(testimonials.filter((t) => t.id !== id))
//               }
//             />
//           )}
//         </div>
//       </main>

//       <AdminModal
//         showModal={showModal}
//         modalType={modalType}
//         onClose={() => setShowModal(false)}
//         onSubmit={handleAddItem}
//         formData={formData}
//         setFormData={setFormData}
//       />
//     </div>
//   );
// }
/* eslint-disable react-refresh/only-export-components */
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  LayoutDashboard,
  Mail,
  FolderGit2,
  Cpu,
  Briefcase,
  Layers,
  MessageSquareQuote,
} from "lucide-react";

import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";
import AdminModal from "../components/admin/AdminModal";
import OverviewTab from "../components/admin/tabs/OverviewTab";
import MessagesTab from "../components/admin/tabs/MessagesTab";
import ProjectsTab from "../components/admin/tabs/ProjectsTab";
import SkillsTab from "../components/admin/tabs/SkillsTab";
import ExperienceTab from "../components/admin/tabs/ExperienceTab";
import ServicesTab from "../components/admin/tabs/ServicesTab";
import TestimonialsTab from "../components/admin/tabs/TestimonialsTab";
import { authService } from "../services/auth.service";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

const EMPTY_FORM = {
  title: "",
  category: "",
  tech: "",
  name: "",
  role: "",
  company: "",
  period: "",
  description: "",
  author: "",
  quote: "",
  proficiency: "",
};

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const mainRef = useRef(null);

  // State collections (keeping your exact mockup states)
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "Sarah Jenkins",
      email: "sarah@example.com",
      date: "2026-11-06",
      subject: "Full-Stack Project Inquiry",
      message:
        "Hi Deme, love your portfolio! We need a React & Node.js expert.",
      read: false,
    },
  ]);
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Exit Exam Preparation Platform",
      category: "EdTech",
      tech: "React, Node.js, PostgreSQL",
      status: "Active",
    },
  ]);
  const [skills, setSkills] = useState([
    {
      id: 1,
      name: "React / TypeScript",
      category: "Frontend",
      proficiency: "95%",
    },
  ]);
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      role: "University Lecturer",
      company: "Mekdela Amba University",
      period: "2025 - Present",
    },
  ]);
  const [services, setServices] = useState([
    {
      id: 1,
      title: "Full-Stack Web Development",
      description: "Building scalable, high-performance web apps.",
    },
  ]);
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      author: "Meseret Belay",
      role: "Software Developer",
      quote: "Deme is an exceptional engineer.",
    },
  ]);

  // Modal controls
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [formData, setFormData] = useState(EMPTY_FORM);

  // UI only: jump back to the top when switching tabs
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
  }, [activeTab]);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      navigate({ to: "/admin/login" });
    }
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    const newId = Date.now();
    if (modalType === "project")
      setProjects([
        ...projects,
        {
          id: newId,
          title: formData.title,
          category: formData.category,
          tech: formData.tech,
          status: "Active",
        },
      ]);
    else if (modalType === "skill")
      setSkills([
        ...skills,
        {
          id: newId,
          name: formData.name,
          category: formData.category,
          proficiency: formData.proficiency,
        },
      ]);
    else if (modalType === "experience")
      setExperiences([
        ...experiences,
        {
          id: newId,
          role: formData.role,
          company: formData.company,
          period: formData.period,
        },
      ]);
    else if (modalType === "service")
      setServices([
        ...services,
        { id: newId, title: formData.title, description: formData.description },
      ]);
    else if (modalType === "testimonial")
      setTestimonials([
        ...testimonials,
        {
          id: newId,
          author: formData.author,
          role: formData.role,
          quote: formData.quote,
        },
      ]);

    setFormData(EMPTY_FORM);
    setShowModal(false);
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "projects", label: "Projects", icon: FolderGit2 },
    { id: "skills", label: "Skills", icon: Cpu },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "services", label: "Services", icon: Layers },
    { id: "testimonials", label: "Testimonials", icon: MessageSquareQuote },
    {
      id: "messages",
      label: "Contact Messages",
      icon: Mail,
      badge: messages.filter((m) => !m.read).length,
    },
  ];

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden bg-background text-foreground">
      <AdminSidebar
        navItems={navItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        onLogout={handleLogout}
      />

      <main
        ref={mainRef}
        className="relative flex-1 flex flex-col min-w-0 overflow-y-auto scroll-smooth"
      >
        {/* Soft ambient glow behind content */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-72 bg-gradient-to-b from-primary/[0.06] to-transparent"
        />

        <AdminHeader
          activeTab={activeTab}
          onOpenSidebar={() => setIsSidebarOpen(true)}
        />

        <div
          key={activeTab}
          className="relative z-10 mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 lg:p-10 animate-in fade-in slide-in-from-bottom-2 duration-300"
        >
          {activeTab === "dashboard" && (
            <OverviewTab
              projects={projects}
              messages={messages}
              skills={skills}
              experiences={experiences}
              onDeleteMessage={(id) =>
                setMessages(messages.filter((m) => m.id !== id))
              }
            />
          )}

          {activeTab === "messages" && (
            <MessagesTab
              messages={messages}
              onMarkRead={(id) =>
                setMessages(
                  messages.map((m) => (m.id === id ? { ...m, read: true } : m)),
                )
              }
              onDelete={(id) =>
                setMessages(messages.filter((m) => m.id !== id))
              }
            />
          )}

          {activeTab === "projects" && (
            <ProjectsTab
              projects={projects}
              onOpenAddModal={() => {
                setModalType("project");
                setShowModal(true);
              }}
              onDelete={(id) =>
                setProjects(projects.filter((p) => p.id !== id))
              }
            />
          )}

          {activeTab === "skills" && (
            <SkillsTab
              skills={skills}
              onOpenAddModal={() => {
                setModalType("skill");
                setShowModal(true);
              }}
              onDelete={(id) => setSkills(skills.filter((s) => s.id !== id))}
            />
          )}

          {activeTab === "experience" && (
            <ExperienceTab
              experiences={experiences}
              onOpenAddModal={() => {
                setModalType("experience");
                setShowModal(true);
              }}
              onDelete={(id) =>
                setExperiences(experiences.filter((e) => e.id !== id))
              }
            />
          )}

          {activeTab === "services" && (
            <ServicesTab
              services={services}
              onOpenAddModal={() => {
                setModalType("service");
                setShowModal(true);
              }}
              onDelete={(id) =>
                setServices(services.filter((s) => s.id !== id))
              }
            />
          )}

          {activeTab === "testimonials" && (
            <TestimonialsTab
              testimonials={testimonials}
              onOpenAddModal={() => {
                setModalType("testimonial");
                setShowModal(true);
              }}
              onDelete={(id) =>
                setTestimonials(testimonials.filter((t) => t.id !== id))
              }
            />
          )}
        </div>
      </main>

      <AdminModal
        showModal={showModal}
        modalType={modalType}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddItem}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
}
