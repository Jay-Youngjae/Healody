package dev.umc.healody.today.goal.dto;

import dev.umc.healody.today.goal.Records;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter @NoArgsConstructor
public class RecordsResponseDto {

    private Long recordsId;
    private Long days;
    private String behavior;
    private String val;
    private String startDate;
    private String endDate;

    @Builder
    public RecordsResponseDto(Long recordsId, Long days, String behavior, String val, String startDate, String endDate) {
        this.recordsId = recordsId;
        this.days = days;
        this.behavior = behavior;
        this.val = val;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public RecordsResponseDto toDto(Records records) {
        return RecordsResponseDto.builder()
                .recordsId(records.getId())
                .days(records.getDays())
                .behavior(records.getBehavior())
                .val(records.getVal())
                .startDate(records.getStartDate().toString())
                .endDate(records.getEndDate().toString())
                .build();
    }
}
