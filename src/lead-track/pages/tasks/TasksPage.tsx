import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';
import { useTask } from '../../hooks/useTask';
import type { Task } from '@/interfaces/task.interface';
import type { TaskStatus } from '@/schemas/task-status-enum';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';

export const TasksPage = () => {
  const { data: tasks, isLoading, onUpdateTaskStatus } = useTask();

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    onUpdateTaskStatus(draggableId, destination.droppableId as TaskStatus);
  };

  if (isLoading) {
    return <CustomFullScreenLoading />;
  }

  const columns: { [key: string]: Task[] } = {
    'to-do': tasks?.filter((task) => task.status === 'to-do') || [],
    'in-progress': tasks?.filter((task) => task.status === 'in-progress') || [],
    done: tasks?.filter((task) => task.status === 'done') || [],
  };

  return (
    <div>
      <div className="p-4">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(columns).map(([columnId, columnTasks]) => (
              <div key={columnId} className="bg-gray-100 p-4 rounded-lg">
                <h2 className="text-lg font-bold mb-4">{columnId}</h2>
                <Droppable
                  droppableId={columnId}
                  isDropDisabled={false}
                  isCombineEnabled={false}
                  ignoreContainerClipping={false}
                >
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="min-h-125">
                      {columnTasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white p-4 mb-4 rounded-lg shadow"
                            >
                              <h3 className="font-bold">{task.title}</h3>
                              <p className="text-sm text-gray-500">
                                Due: {new Date(task.dueDate).toLocaleDateString()}
                              </p>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};
