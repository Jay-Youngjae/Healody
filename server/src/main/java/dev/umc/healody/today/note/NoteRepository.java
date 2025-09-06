package dev.umc.healody.today.note;

import dev.umc.healody.today.todo.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findAllByUser_UserId(Long userId);
    List<Note> findAllByDateBetweenAndUser_UserId(Date start, Date end, Long userId);
}
