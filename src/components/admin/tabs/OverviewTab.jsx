import { FolderGit2, Mail, Cpu, Briefcase, Trash2 } from "lucide-react";

export default function OverviewTab({
  projects,
  messages,
  skills,
  experiences,
  onDeleteMessage,
}) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="p-3 rounded-xl bg-primary/10 text-primary">
              <FolderGit2 className="h-6 w-6" />
            </span>
          </div>
          <h3 className="text-2xl font-bold">{projects.length}</h3>
          <p className="text-sm text-muted-foreground mt-1">Active Projects</p>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
              <Mail className="h-6 w-6" />
            </span>
          </div>
          <h3 className="text-2xl font-bold">
            {messages.filter((m) => !m.read).length}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">Unread Messages</p>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="p-3 rounded-xl bg-amber-500/10 text-amber-500">
              <Cpu className="h-6 w-6" />
            </span>
          </div>
          <h3 className="text-2xl font-bold">{skills.length}</h3>
          <p className="text-sm text-muted-foreground mt-1">Listed Skills</p>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="p-3 rounded-xl bg-purple-500/10 text-purple-500">
              <Briefcase className="h-6 w-6" />
            </span>
          </div>
          <h3 className="text-2xl font-bold">{experiences.length}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Experience Entries
          </p>
        </div>
      </div>

      <div className="p-6 rounded-2xl border border-border bg-card">
        <h3 className="text-lg font-semibold mb-4">Recent Contact Messages</h3>
        <div className="space-y-4">
          {messages.slice(0, 3).map((msg) => (
            <div
              key={msg.id}
              className="p-4 rounded-xl border border-border/60 bg-background flex flex-col sm:flex-row justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{msg.name}</span>
                  <span className="text-xs text-muted-foreground">
                    ({msg.email})
                  </span>
                </div>
                <p className="text-sm font-medium text-foreground mt-1">
                  {msg.subject}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {msg.message}
                </p>
              </div>
              <div className="flex items-center gap-2 self-start">
                <span className="text-xs text-muted-foreground">
                  {msg.date}
                </span>
                <button
                  onClick={() => onDeleteMessage(msg.id)}
                  className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
