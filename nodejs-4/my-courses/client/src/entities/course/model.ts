import {
  createStore,
  combine,
  createEffect,
  createEvent,
  sample,
  merge,
} from "effector";
import { createGate } from "effector-react";
import { getCourses, createCourse } from "../../api/rest/courses";
import { Course } from "../../api/rest/courses/types";

// import format from "date-fns/format";
// import parse from "date-fns/parse";
// import { Column, TableRow } from "@admiral-ds/react-ui";

// import { notificationService } from "@src/common/services/notification/notification";

// import { tasksService } from "./tasks.service";
// import { columnList } from "./utils/constants";
// import {
//   ITask,
//   ITaskPriorities,
//   ITaskStatuses,
//   ITaskTypes,
//   IUpdateTaskRequest,
// } from "./types";

const CourseListPageGate = createGate("CourseListPage");

const $courseList = createStore<Course[]>([]);

const getCourseList = createEvent();
const addCourse = createEvent<Course>();

const getCourseListFx = createEffect(() => getCourses());
// const createCourseFx = createEffect(() => createCourse());
const addCourseFx = createEffect((data: Course) => createCourse(data));

sample({
  clock: CourseListPageGate.open,
  target: getCourseList,
});

sample({
  clock: getCourseList,
  target: getCourseListFx,
});

sample({
  clock: addCourse,
  target: addCourseFx,
});

$courseList.on(getCourseListFx.doneData, (_, payload: any) => {
  return payload;
});

// sample({
//   clock: getTaskTableList,
//   target: [
//     getTaskTableListFx,
//     getTaskTypesFx,
//     getTaskStatusesFx,
//     getTaskPrioritiesFx,
//   ],
// });

// const TaskWidgetGate = createGate("TaskWidgetGate");

// const updateStatusTask = createEvent<IUpdateTaskRequest>();
// const getTaskTableList = createEvent();

// const getTaskTableListFx = createEffect(() => tasksService.getTasks());
// const getTaskTypesFx = createEffect(() => tasksService.getTaskTypes());
// const getTaskStatusesFx = createEffect(() => tasksService.getTaskStatuses());
// const getTaskPrioritiesFx = createEffect(() =>
//   tasksService.getTaskPriorities()
// );
// const updateStatusTaskFx = createEffect((data) =>
//   tasksService.updateTask(data.numberTask, { statusId: data.numberStatus })
// );

// const $originTaskRowList = createStore<ITask[]>([]);
// const $taskTypes = createStore<ITaskTypes[]>([]);
// const $taskStatuses = createStore<ITaskStatuses[]>([]);
// const $taskPriorities = createStore<ITaskPriorities[]>([]);
// const $taskRowList = createStore<TableRow[]>([]);
// const $taskColumnList = createStore<Column[]>(columnList);

// const $isTaskTableListEmpty = $taskRowList.map((list) => list.length === 0);
// const $isTasksLoading = getTaskTableListFx.pending;
// const $isTaskTypesLoading = getTaskTypesFx.pending;
// const $isTaskStatusesLoading = getTaskStatusesFx.pending;
// const $isTaskPrioritiesLoading = getTaskPrioritiesFx.pending;

// sample({
//   clock: updateStatusTask,
//   target: updateStatusTaskFx,
// });

// const showErrorFx = createEffect(() => {
//   notificationService.showErrorNotification(
//     "Произошла ошибка, повторите действие позднее",
//     "Ошибка"
//   );
// });

// sample({
//   clock: getTaskTableListFx.fail,
//   target: showErrorFx,
// });

// const $isError = createStore<boolean>(false);

// sample({
//   clock: showErrorFx.done,
//   fn: () => true,
//   target: $isError,
// });

// sample({
//   clock: getTaskTableListFx,
//   fn: () => false,
//   target: $isError,
// });

// $originTaskRowList
//   .on(getTaskTableListFx.doneData, (_, payload) => payload?.content ?? [])
//   .on(updateStatusTaskFx.doneData, (state) => {
//     notificationService.showSuccessNotification("Задача успешно обновлена");

//     // TODO: не убирать, нужно проверить функционал на работоспособность, смена статуса
//     // const currentStateTaskIdx = state.findIndex(
//     //   (task) => task.number === payload.number
//     // );
//     // state[currentStateTaskIdx].statusId = payload.statusId;

//     return [...state];
//   })
//   .on(updateStatusTaskFx.fail, (state) => [...state]);

// $taskTypes.on(getTaskTypesFx.doneData, (_, payload) => payload);
// $taskStatuses.on(getTaskStatusesFx.doneData, (_, payload) => payload);
// $taskPriorities.on(getTaskPrioritiesFx.doneData, (_, payload) => payload);

// const getTasksSuccessAction = merge([
//   getTaskTableListFx.doneData,
//   getTaskTypesFx.doneData,
//   getTaskStatusesFx.doneData,
//   getTaskPrioritiesFx.doneData,
// ]);

// sample({
//   clock: getTasksSuccessAction,
//   source: combine(
//     $originTaskRowList,
//     $taskTypes,
//     $taskStatuses,
//     $taskPriorities,
//     (originTaskRowList, taskTypes, taskStatuses, taskPriorities) => {
//       const taskRowList = originTaskRowList.map((task) => {
//         const currentType = taskTypes.find((type) => type.id === task.typeId);
//         const currentStatus = taskStatuses.find(
//           (status) => status.id === task.statusId
//         );
//         const currentPriority = taskPriorities.find(
//           (priority) => priority.id === task.priorityId
//         );

//         return {
//           ...task,
//           id: task.number,
//           currentType,
//           currentStatus,
//           currentPriority,
//           status: currentStatus?.name,
//           priority: currentPriority?.name,
//           dueDate: task?.dueDate
//             ? format(parse(task.dueDate, "yyyy-MM-dd", new Date()), "dd.MM.yy")
//             : "",
//         };
//       });

//       return taskRowList;
//     }
//   ),
//   target: $taskRowList,
// });

// sample({
//   clock: TaskWidgetGate.open,
//   target: [
//     getTaskTableListFx,
//     getTaskTypesFx,
//     getTaskStatusesFx,
//     getTaskPrioritiesFx,
//   ],
// });

// sample({
//   clock: getTaskTableList,
//   target: [
//     getTaskTableListFx,
//     getTaskTypesFx,
//     getTaskStatusesFx,
//     getTaskPrioritiesFx,
//   ],
// });

// export {
//   TaskWidgetGate,
//   $taskColumnList,
//   $taskRowList,
//   $isTasksLoading,
//   $isTaskTypesLoading,
//   $isTaskStatusesLoading,
//   $isTaskPrioritiesLoading,
//   $taskTypes,
//   $taskStatuses,
//   $taskPriorities,
//   $isError,
//   $isTaskTableListEmpty,
//   getTaskTableList,
//   updateStatusTask,
// };

export { CourseListPageGate, $courseList, addCourse, addCourseFx };
