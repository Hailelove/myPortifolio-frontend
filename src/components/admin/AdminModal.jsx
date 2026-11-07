// import { X } from "lucide-react";

// export default function AdminModal({
//   showModal,
//   modalType,
//   onClose,
//   onSubmit,
//   formData,
//   setFormData,
// }) {
//   if (!showModal) return null;

//   return (
//     <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
//       <div className="max-w-md w-full bg-card border border-border rounded-2xl p-6 shadow-2xl">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-lg font-bold capitalize">Add New {modalType}</h3>
//           <button
//             onClick={onClose}
//             className="p-1 text-muted-foreground hover:text-foreground"
//           >
//             <X className="h-5 w-5" />
//           </button>
//         </div>

//         <form onSubmit={onSubmit} className="space-y-4">
//           {modalType === "project" && (
//             <>
//               <div>
//                 <label className="block text-xs font-medium text-muted-foreground mb-1">
//                   Project Title
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.title}
//                   onChange={(e) =>
//                     setFormData({ ...formData, title: e.target.value })
//                   }
//                   required
//                   className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
//                   placeholder="e.g. Exit Exam Platform"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium text-muted-foreground mb-1">
//                   Category
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.category}
//                   onChange={(e) =>
//                     setFormData({ ...formData, category: e.target.value })
//                   }
//                   required
//                   className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
//                   placeholder="e.g. EdTech"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium text-muted-foreground mb-1">
//                   Tech Stack
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.tech}
//                   onChange={(e) =>
//                     setFormData({ ...formData, tech: e.target.value })
//                   }
//                   required
//                   className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
//                   placeholder="e.g. React, Node.js"
//                 />
//               </div>
//             </>
//           )}

//           {modalType === "skill" && (
//             <>
//               <div>
//                 <label className="block text-xs font-medium text-muted-foreground mb-1">
//                   Skill Name
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.name}
//                   onChange={(e) =>
//                     setFormData({ ...formData, name: e.target.value })
//                   }
//                   required
//                   className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
//                   placeholder="e.g. TypeScript"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium text-muted-foreground mb-1">
//                   Category
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.category}
//                   onChange={(e) =>
//                     setFormData({ ...formData, category: e.target.value })
//                   }
//                   required
//                   className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
//                   placeholder="e.g. Frontend"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium text-muted-foreground mb-1">
//                   Proficiency
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.proficiency}
//                   onChange={(e) =>
//                     setFormData({ ...formData, proficiency: e.target.value })
//                   }
//                   required
//                   className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
//                   placeholder="e.g. 90%"
//                 />
//               </div>
//             </>
//           )}

//           {modalType === "experience" && (
//             <>
//               <div>
//                 <label className="block text-xs font-medium text-muted-foreground mb-1">
//                   Role / Position
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.role}
//                   onChange={(e) =>
//                     setFormData({ ...formData, role: e.target.value })
//                   }
//                   required
//                   className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
//                   placeholder="e.g. Lecturer"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium text-muted-foreground mb-1">
//                   Company / Institution
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.company}
//                   onChange={(e) =>
//                     setFormData({ ...formData, company: e.target.value })
//                   }
//                   required
//                   className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
//                   placeholder="e.g. Mekdela Amba University"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium text-muted-foreground mb-1">
//                   Period
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.period}
//                   onChange={(e) =>
//                     setFormData({ ...formData, period: e.target.value })
//                   }
//                   required
//                   className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
//                   placeholder="e.g. 2025 - Present"
//                 />
//               </div>
//             </>
//           )}

//           {modalType === "service" && (
//             <>
//               <div>
//                 <label className="block text-xs font-medium text-muted-foreground mb-1">
//                   Service Title
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.title}
//                   onChange={(e) =>
//                     setFormData({ ...formData, title: e.target.value })
//                   }
//                   required
//                   className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
//                   placeholder="e.g. Web Development"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium text-muted-foreground mb-1">
//                   Description
//                 </label>
//                 <textarea
//                   value={formData.description}
//                   onChange={(e) =>
//                     setFormData({ ...formData, description: e.target.value })
//                   }
//                   required
//                   className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
//                   placeholder="Brief description..."
//                   rows={3}
//                 />
//               </div>
//             </>
//           )}

//           {modalType === "testimonial" && (
//             <>
//               <div>
//                 <label className="block text-xs font-medium text-muted-foreground mb-1">
//                   Author Name
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.author}
//                   onChange={(e) =>
//                     setFormData({ ...formData, author: e.target.value })
//                   }
//                   required
//                   className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
//                   placeholder="e.g. Meseret Belay"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium text-muted-foreground mb-1">
//                   Role / Affiliation
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.role}
//                   onChange={(e) =>
//                     setFormData({ ...formData, role: e.target.value })
//                   }
//                   required
//                   className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
//                   placeholder="e.g. Software Developer"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium text-muted-foreground mb-1">
//                   Quote
//                 </label>
//                 <textarea
//                   value={formData.quote}
//                   onChange={(e) =>
//                     setFormData({ ...formData, quote: e.target.value })
//                   }
//                   required
//                   className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
//                   placeholder="Testimonial quote..."
//                   rows={3}
//                 />
//               </div>
//             </>
//           )}

//           <div className="flex justify-end gap-2 pt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-accent transition"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 rounded-lg gradient-bg text-primary-foreground text-sm font-medium shadow-elegant hover:opacity-90 transition"
//             >
//               Save Item
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
import { useEffect } from "react";
import {
  X,
  FolderGit2,
  Cpu,
  Briefcase,
  Layers,
  MessageSquareQuote,
} from "lucide-react";

// Field config per modal type. Field names match your existing formData keys.
const MODAL_CONFIG = {
  project: {
    icon: FolderGit2,
    hint: "Add a project to your portfolio.",
    fields: [
      {
        name: "title",
        label: "Project title",
        placeholder: "e.g. Exit Exam Platform",
      },
      { name: "category", label: "Category", placeholder: "e.g. EdTech" },
      { name: "tech", label: "Tech stack", placeholder: "e.g. React, Node.js" },
    ],
  },
  skill: {
    icon: Cpu,
    hint: "Add a skill and how well you know it.",
    fields: [
      { name: "name", label: "Skill name", placeholder: "e.g. TypeScript" },
      { name: "category", label: "Category", placeholder: "e.g. Frontend" },
      {
        name: "proficiency",
        label: "Proficiency",
        placeholder: "e.g. 90%",
        meter: true,
      },
    ],
  },
  experience: {
    icon: Briefcase,
    hint: "Add a role to your timeline.",
    fields: [
      { name: "role", label: "Role / position", placeholder: "e.g. Lecturer" },
      {
        name: "company",
        label: "Company / institution",
        placeholder: "e.g. Mekdela Amba University",
      },
      { name: "period", label: "Period", placeholder: "e.g. 2025 - Present" },
    ],
  },
  service: {
    icon: Layers,
    hint: "Describe a service you offer.",
    fields: [
      {
        name: "title",
        label: "Service title",
        placeholder: "e.g. Web Development",
      },
      {
        name: "description",
        label: "Description",
        placeholder: "Brief description...",
        textarea: true,
      },
    ],
  },
  testimonial: {
    icon: MessageSquareQuote,
    hint: "Add feedback from someone you worked with.",
    fields: [
      {
        name: "author",
        label: "Author name",
        placeholder: "e.g. Meseret Belay",
      },
      {
        name: "role",
        label: "Role / affiliation",
        placeholder: "e.g. Software Developer",
      },
      {
        name: "quote",
        label: "Quote",
        placeholder: "Testimonial quote...",
        textarea: true,
      },
    ],
  },
};

const inputClass =
  "w-full rounded-xl border border-input bg-background/60 px-3.5 text-base sm:text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/15";

export default function AdminModal({
  showModal,
  modalType,
  onClose,
  onSubmit,
  formData,
  setFormData,
}) {
  // Escape to close + lock background scroll while open
  useEffect(() => {
    if (!showModal) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [showModal, onClose]);

  if (!showModal) return null;

  const config = MODAL_CONFIG[modalType];
  const Icon = config?.icon;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm sm:p-4 animate-in fade-in duration-200"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-modal-title"
        className="relative w-full sm:max-w-md max-h-[92dvh] overflow-y-auto rounded-t-3xl sm:rounded-2xl border border-border bg-card shadow-2xl animate-in slide-in-from-bottom-8 sm:zoom-in-95 duration-300"
      >
        {/* Mobile drag handle */}
        <div className="sm:hidden mx-auto mt-3 h-1 w-10 rounded-full bg-border" />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-5 sm:p-6 pb-0 sm:pb-0">
          <div className="flex items-center gap-3 min-w-0">
            {Icon && (
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl gradient-bg text-primary-foreground shadow-elegant">
                <Icon className="h-5 w-5" />
              </div>
            )}
            <div className="min-w-0">
              <h3
                id="admin-modal-title"
                className="text-lg font-bold capitalize leading-tight"
              >
                Add new {modalType}
              </h3>
              {config?.hint && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {config.hint}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-muted-foreground transition hover:bg-accent hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="p-5 sm:p-6 space-y-4">
          {config?.fields.map((field, i) => {
            const value = formData[field.name] ?? "";
            const id = `modal-${modalType}-${field.name}`;
            const percent = Math.min(
              100,
              Math.max(0, parseInt(value, 10) || 0),
            );
            return (
              <div key={field.name} className="space-y-1.5">
                <label
                  htmlFor={id}
                  className="block text-sm font-medium text-foreground"
                >
                  {field.label}
                </label>

                {field.textarea ? (
                  <textarea
                    id={id}
                    value={value}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.name]: e.target.value })
                    }
                    required
                    rows={4}
                    autoFocus={i === 0}
                    placeholder={field.placeholder}
                    className={`${inputClass} py-3 resize-none`}
                  />
                ) : (
                  <input
                    id={id}
                    type="text"
                    value={value}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.name]: e.target.value })
                    }
                    required
                    autoFocus={i === 0}
                    placeholder={field.placeholder}
                    className={`${inputClass} h-12`}
                  />
                )}

                {/* Live proficiency preview */}
                {field.meter && (
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full gradient-bg transition-all duration-300"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                )}
              </div>
            );
          })}

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-xl border border-border px-5 text-sm font-medium transition hover:bg-accent"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-11 rounded-xl gradient-bg px-5 text-sm font-semibold text-primary-foreground shadow-elegant transition hover:opacity-95 active:scale-[0.98] focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
            >
              Save item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
