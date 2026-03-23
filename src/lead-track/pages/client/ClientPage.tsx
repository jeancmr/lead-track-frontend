import { useAuthStore } from '@/auth/store/auth.store';
import { CustomAlertDialogDelete } from '@/components/custom/CustomAlertDialogDelete';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useClient } from '@/lead-track/hooks/useClient';
import { getStatusColor } from '@/lead-track/lib/get-status-color';
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Circle,
  MessageSquare,
  Plus,
  Trash2,
} from 'lucide-react';
import { useState, type SubmitEvent } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';

export const ClientPage = () => {
  const { idClient } = useParams();
  const { data: client, isLoading, noteMutation, deleteNoteMutation } = useClient(idClient || '');
  const { user } = useAuthStore();

  const navigate = useNavigate();

  const notes = client?.notes;
  const tasks = client?.tasks;
  const [noteDialog, setNoteDialog] = useState(false);
  const [taskDialog, setTaskDialog] = useState(false);
  const [taskForm, setTaskForm] = useState({
    title: '',
    dueDate: '',
  });

  const handleAddNote = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const note = formData.get('note') as string;

    if (note === '') return;

    const noteBody = {
      note: { content: note, id: '' },
      userId: user?.id,
      clientId: client?.id,
    };

    await noteMutation.mutateAsync(noteBody, {
      onSuccess: (data) => {
        setNoteDialog((prev) => !prev);
        toast.success(data.message);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const handleDeleteNote = async (noteId: string) => {
    await deleteNoteMutation.mutateAsync(noteId, {
      onSuccess: () => toast.success(`Note deleted succesfully`),
      onError: (error) => toast.error(error.message),
    });
  };

  const handleAddTask = async () => {
    // if (!taskForm.title.trim() || !user) return;

    try {
      setTaskForm({ title: '', dueDate: '' });
      setTaskDialog(false);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleUpdateTaskStatus = async () => {
    try {
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm('Delete this task?')) return;

    try {
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'to-do':
        return 'text-slate-500';
      case 'in-progress':
        return 'text-amber-500';
      case 'done':
        return 'text-emerald-500';
      default:
        return 'text-slate-400';
    }
  };

  if (isLoading) {
    return <CustomFullScreenLoading />;
  }

  if (!client) {
    return (
      <div className="space-y-6">
        <Button variant="outline" onClick={() => navigate('/clients')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Clients
        </Button>
        <div className="text-center text-slate-500">Client not found</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={() => navigate('/clients')}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Clients
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{client.name}</CardTitle>
              <CardDescription>{client.company}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-slate-500 font-medium">Status</p>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(client.status)}`}
                >
                  {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                </span>
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Email</p>
                <a
                  href={`mailto:${client.email}`}
                  className="text-slate-900 hover:text-slate-700 break-all"
                >
                  {client.email}
                </a>
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Phone</p>
                <a href={`tel:${client.phone}`} className="text-slate-900 hover:text-slate-700">
                  {client.phone || 'N/A'}
                </a>
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Added</p>
                <p className="text-slate-900">{new Date(client.createdAt).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Notes</CardTitle>
                <CardDescription>
                  {notes?.length} note{notes?.length !== 1 ? 's' : ''}
                </CardDescription>
              </div>
              <Button size="sm" onClick={() => setNoteDialog(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Note
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {notes?.length === 0 ? (
                  <p className="text-sm text-slate-500">No notes yet</p>
                ) : (
                  notes?.map((note) => (
                    <div
                      key={note.id}
                      className="p-3 bg-slate-50 rounded-lg border border-slate-200"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex-1">
                          <p className="text-sm text-slate-700">{note.content}</p>
                          <p className="text-xs text-slate-500 mt-2">
                            {new Date(note.createdAt).toLocaleDateString()} at{' '}
                            {new Date(note.createdAt).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                        {/* <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="text-slate-400 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button> */}

                        <CustomAlertDialogDelete
                          itemName={`note ${note.id}`}
                          onDeleteItem={() => handleDeleteNote(note.id)}
                        >
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </CustomAlertDialogDelete>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Tasks</CardTitle>
                <CardDescription>
                  {tasks?.filter((t) => t.status !== 'done').length} active,{' '}
                  {tasks?.filter((t) => t.status === 'done').length} completed
                </CardDescription>
              </div>
              <Button size="sm" onClick={() => setTaskDialog(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Task
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {tasks?.length === 0 ? (
                  <p className="text-sm text-slate-500">No tasks yet</p>
                ) : (
                  tasks?.map((task) => (
                    <div
                      key={task.id}
                      className={`p-3 rounded-lg border ${task.status === 'done' ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex-1">
                          <div className="flex items-start gap-2">
                            <div
                              className="flex-shrink-0 cursor-pointer mt-0.5"
                              onClick={() => {
                                const statuses: ('to-do' | 'in-progress' | 'done')[] = [
                                  'to-do',
                                  'in-progress',
                                  'done',
                                ];
                                const currentIndex = statuses.indexOf(task.status);
                                const nextStatus = statuses[(currentIndex + 1) % statuses.length];
                                handleUpdateTaskStatus(task.id, nextStatus);
                              }}
                            >
                              {task.status === 'done' ? (
                                <CheckCircle2 className={`h-5 w-5 ${getTaskStatusColor('done')}`} />
                              ) : (
                                <Circle className={`h-5 w-5 ${getTaskStatusColor(task.status)}`} />
                              )}
                            </div>
                            <div className="flex-1">
                              <p
                                className={`text-sm font-medium ${task.status === 'done' ? 'line-through text-slate-500' : 'text-slate-900'}`}
                              >
                                {task.title}
                              </p>
                              {task.dueDate && (
                                <div className="flex items-center gap-1 mt-1">
                                  <Calendar className="h-3 w-3 text-slate-400" />
                                  <p className="text-xs text-slate-500">
                                    {new Date(task.dueDate).toLocaleDateString()}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-slate-400 hover:text-red-500 shrink-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={noteDialog} onOpenChange={setNoteDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Add Note
            </DialogTitle>
            <DialogDescription>Add a note to this client</DialogDescription>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleAddNote}>
            <div className="space-y-2">
              <Label htmlFor="note">Note</Label>
              <textarea
                id="note"
                name="note"
                placeholder="Type your note here..."
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none h-32"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => setNoteDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Note</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={taskDialog} onOpenChange={setTaskDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Add Task
            </DialogTitle>
            <DialogDescription>Create a new task for this client</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="task-title">Task Title</Label>
              <Input
                id="task-title"
                value={taskForm.title}
                onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                placeholder="Enter task title..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="due-date">Due Date (optional)</Label>
              <Input
                id="due-date"
                type="date"
                value={taskForm.dueDate}
                onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => setTaskDialog(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={handleAddTask} disabled={!taskForm.title.trim()}>
                Add Task
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
