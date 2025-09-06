package dev.umc.healody.calender;

import dev.umc.healody.calender.dto.CalenderFindDto;
import dev.umc.healody.calender.dto.FamilyCalenderResponseDto;
import dev.umc.healody.common.SuccessResponse;
import dev.umc.healody.common.SuccessStatus;
import dev.umc.healody.family.FamilyResponseDTO;
import dev.umc.healody.family.FamilyService;
import dev.umc.healody.today.note.NoteService;
import dev.umc.healody.today.note.dto.NoteResponseDto;
import dev.umc.healody.today.todo.TodoService;
import dev.umc.healody.today.todo.dto.TodoRequestDto;
import dev.umc.healody.today.todo.dto.TodoResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static dev.umc.healody.common.FindUserInfo.*;

@RequiredArgsConstructor
@RequestMapping("/api")
@RestController
public class CalenderController {

    private final FamilyService familyService;
    private final TodoService todoService;
    private final NoteService noteService;

    @GetMapping("/calender/view")
    public SuccessResponse<List<FamilyResponseDTO>> getFamily() {
        List<FamilyCalenderResponseDto> responseDTOList = familyService.searchFamilyInCalender(getCurrentUserId());
        return new SuccessResponse(SuccessStatus.SUCCESS, responseDTOList);
    }

    @PostMapping("/todo")
    public SuccessResponse<Long> createTodo(@RequestBody TodoRequestDto requestDto) {
        Long todoId = todoService.createTodo(getCurrentUserId(), requestDto);
        return new SuccessResponse<>(SuccessStatus.TODO_CREATE, todoId);
    }

    @GetMapping("/calender/note")
    public SuccessResponse<List<NoteResponseDto>> getNoteInCalender(@RequestBody CalenderFindDto findDto) {
        List<NoteResponseDto> responseDtoList = noteService.findNoteByUserAndDate(findDto.getUserId(), findDto.getDate());
        return new SuccessResponse<>(SuccessStatus.SUCCESS, responseDtoList);
    }

    @GetMapping("/calender/note/{userId}/{date}")
    public SuccessResponse<List<NoteResponseDto>> getNoteInCalender(@PathVariable Long userId, @PathVariable String date) {
        List<NoteResponseDto> responseDtoList = noteService.findNoteByUserAndDate(userId, date);
        return new SuccessResponse<>(SuccessStatus.SUCCESS, responseDtoList);
    }

    @GetMapping("/calender/todo")
    public SuccessResponse<List<TodoResponseDto>> getTodoInCalender(@RequestBody CalenderFindDto findDto) {
        List<TodoResponseDto> responseDtoList = todoService.findTodoByUserAndDate(findDto.getUserId(), findDto.getDate());
        return new SuccessResponse<>(SuccessStatus.SUCCESS, responseDtoList);
    }

    @GetMapping("/calender/todo/{userId}/{date}")
    public SuccessResponse<List<TodoResponseDto>> getTodoInCalender(@PathVariable Long userId, @PathVariable String date) {
        List<TodoResponseDto> responseDtoList = todoService.findTodoByUserAndDate(userId, date);
        return new SuccessResponse<>(SuccessStatus.SUCCESS, responseDtoList);
    }
}
