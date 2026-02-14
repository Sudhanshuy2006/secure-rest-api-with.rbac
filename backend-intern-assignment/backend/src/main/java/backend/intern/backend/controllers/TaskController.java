package backend.intern.backend.controllers;


import backend.intern.backend.dto.ApiResponse;
import backend.intern.backend.dto.TaskRequest;
import backend.intern.backend.entity.Task;
import backend.intern.backend.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tasks")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TaskController {
    private final TaskService taskService;

    @PostMapping
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<ApiResponse> createTask(@Valid @RequestBody TaskRequest request) {
        Task task = taskService.createTask(request);
        return ResponseEntity.ok(new ApiResponse(true, "Task created successfully", task));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<ApiResponse> getAllTasks() {
        List<Task> tasks = taskService.getAllTasks();
        return ResponseEntity.ok(new ApiResponse(true, "Tasks retrieved successfully", tasks));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<ApiResponse> getTaskById(@PathVariable Long id) {
        Task task = taskService.getTaskById(id);
        return ResponseEntity.ok(new ApiResponse(true, "Task retrieved successfully", task));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<ApiResponse> updateTask(@PathVariable Long id, @Valid @RequestBody TaskRequest request) {
        Task task = taskService.updateTask(id, request);
        return ResponseEntity.ok(new ApiResponse(true, "Task updated successfully", task));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok(new ApiResponse(true, "Task deleted successfully", null));
    }
}
