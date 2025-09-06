package dev.umc.healody.today.goal;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

import static jakarta.persistence.GenerationType.IDENTITY;

@NoArgsConstructor
@Entity @Getter
public class Records {

    @Id @GeneratedValue(strategy = IDENTITY)
    @Column(name = "records_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "goal_id")
    private Goal goal;

    private LocalDate today;
    private String val;
    private String behavior;
    private Long days;
    private LocalDate startDate;
    private LocalDate endDate;

    @Builder
    public Records(Goal goal, LocalDate today, String val, String behavior, Long days, LocalDate startDate, LocalDate endDate) {
        this.goal = goal;
        this.today = today;
        this.val = val;
        this.behavior = behavior;
        this.days = days;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public void updateVal(String val) {
        this.val = val;
    }
}
