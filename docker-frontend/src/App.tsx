import axios from "axios";
import { useQuery } from "react-query";
import { useCallback, useMemo, useState } from "react";

type Todo = {
  id: number;
  title: string;
  isDone: boolean;
};

const url = "http://localhost/api";

export const App = () => {
  const fetchTodos: () => Promise<Todo[]> = useCallback(async () => {
    const todos = await axios.get(`${url}/todos`);
    return todos.data;
  }, []);
  const { data, refetch } = useQuery("todos", fetchTodos, {
    refetchOnWindowFocus: false,
  });

  const initialData: Todo = useMemo(() => {
    return {
      id: 0,
      isDone: false,
      title: "",
    };
  }, []);

  const [todo, setTodo] = useState<Todo>(initialData);

  const addTodo = useCallback(() => {
    axios.post(`${url}/todo`, { ...todo, id: data?.length }).then(() => {
      setTodo(initialData);
      refetch();
    });
  }, [data?.length, initialData, refetch, todo]);

  const markDone = useCallback(
    (t: Todo) => {
      axios.put(`${url}/todo`, { ...t, isDone: true }).then(() => {
        refetch();
      });
    },
    [refetch],
  );

  const deleteTodo = useCallback(
    (t: Todo) => {
      axios.delete(`${url}/todo`, { data: t }).then(() => {
        refetch();
      });
    },
    [refetch],
  );

  return (
    <div>
      <div style={{ margin: "30px 25px" }}>
        <input
          value={todo.title}
          onChange={(e) =>
            setTodo((prevState) => {
              return { ...prevState, title: e.target.value };
            })
          }
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <ul>
        {data?.map((todo) => (
          <li key={todo.id} style={{ marginBottom: "5px" }}>
            <span
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                width: "200px",
                display: "inline-block",
                textTransform: "capitalize",
              }}
            >
              {todo.title}{" "}
            </span>
            <span
              style={{
                color: todo.isDone ? "green" : "red",
              }}
            >
              {todo.isDone ? "Done" : "Pending"}
            </span>
            {!todo.isDone ? (
              <button
                style={{
                  marginLeft: "8px",
                  color: "green",
                  border: "1px solid green",
                  borderRadius: "5px",
                  paddingBottom: "4px",
                  paddingLeft: "8px",
                  paddingRight: "8px",
                  cursor: "pointer",
                }}
                onClick={() => markDone(todo)}
              >
                ✔
              </button>
            ) : (
              <button
                style={{
                  marginLeft: "8px",
                  color: "red",
                  border: "1px solid red",
                  borderRadius: "5px",
                  paddingBottom: "4px",
                  paddingLeft: "8px",
                  paddingRight: "8px",
                  cursor: "pointer",
                }}
                onClick={() => deleteTodo(todo)}
              >
                x
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
