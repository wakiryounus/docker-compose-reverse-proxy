package com.example.dockerbackend;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class TodoController {
    public List<Todo> todos = new ArrayList<>();

    @GetMapping("todos")
    public ResponseEntity<List<Todo>> getTodos() {
        return ResponseEntity.ok(todos);
    }

    @PostMapping("todo")
    public ResponseEntity<List<Todo>> saveTodo(@RequestBody Todo todo) {
        todos.add(todo);
        return ResponseEntity.ok(todos);
    }

    @PutMapping("todo")
    public ResponseEntity<List<Todo>> updateTodo(@RequestBody Todo todo) {
        todos.replaceAll(t -> t.getId() == todo.getId() ? todo : t);
        return ResponseEntity.ok(todos);
    }

    @DeleteMapping("todo")
    public ResponseEntity<List<Todo>> deleteTodo(@RequestBody Todo todo) {
        todos.removeIf(t -> t.getId() == todo.getId());
        return ResponseEntity.ok(todos);
    }

}
