import { waitForInput } from './Input';
import {
  PRIORITY_NAME_MAP,
  Priority,
  Action,
  ActionNewTodo,
  AppState,
  ActionDeleteTodo,
} from './type';
import { getIsValidEnumValue } from './util';

export abstract class Command {
  constructor(public key: string, private desc: string) {}
  toString() {
    return `${this.key}: ${this.desc}`;
  }
  abstract async run(state: AppState): Promise<Action | void>;
}

export class CommandPrintTodos extends Command {
  constructor() {
    super('p', '모든 할 일 출력하기');
  }
  async run(state: AppState): Promise<void> {
    for (const todo of state.todos) {
      const text = todo.toString();
      console.log(text);
    }
    await waitForInput('press any key: ');
  }
}

export class CommandDeleteTodo extends Command {
  constructor() {
    super('d', '할 일 제거하기');
  }
  async run(state: AppState): Promise<ActionDeleteTodo | undefined> {
    for (const todo of state.todos) {
      const text = todo.toString();
      console.log(text);
    }
    const idStr = await waitForInput('press todo id to delete: ');
    const id = Number(idStr);
    if (typeof id === 'number') {
      return {
        type: 'deleteTodo',
        id,
      };
    }
  }
}

export class CommandNewTodo extends Command {
  constructor() {
    super('n', '새로운 할 일 만들기');
  }
  async run(): Promise<ActionNewTodo | undefined> {
    const title = await waitForInput('title: ');
    const priorityStr = await waitForInput(
      `priority ${PRIORITY_NAME_MAP[Priority.High]}(${Priority.High}) ~ ${
        PRIORITY_NAME_MAP[Priority.Low]
      }(${Priority.Low}): `,
    );
    const priority = Number(priorityStr);
    if (typeof title === 'string' && CommandNewTodo.getIsPriority(priority)) {
      return {
        type: 'newTodo',
        title,
        priority,
      };
    }
  }

  static getIsPriority(priority: any): priority is Priority {
    return getIsValidEnumValue(Priority, priority);
  }
}
