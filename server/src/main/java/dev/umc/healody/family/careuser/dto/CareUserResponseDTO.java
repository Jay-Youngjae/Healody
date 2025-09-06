package dev.umc.healody.family.careuser.dto;

import dev.umc.healody.family.careuser.domain.CareUser;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@Getter
@NoArgsConstructor
public class CareUserResponseDTO {
    private Long id;
    private Long homeId;
    private String image;
    private String nickname;
    private String message;

    @Builder
    public CareUserResponseDTO(Long id, Long homeId, String image, String nickname, String message) {
        this.id = id;
        this.homeId = homeId;
        this.image = image;
        this.nickname = nickname;
        this.message = message;
    }

    public CareUserResponseDTO toDTO(CareUser careUser) {
        return CareUserResponseDTO.builder()
                .id(careUser.getId())
                .message(careUser.getMessage())
                .homeId(careUser.getHome().getHomeId())
                .image(careUser.getImage())
                .nickname(careUser.getNickname())
                .build();
    }

//    @Override
//    public String toString() {
//        return "{" +
//                "id=" + id +
//                ", image='" + image + '\'' +
//                ", nickname='" + nickname + '\'' +
//                ", message='" + message + '\'' +
//                '}';
//    }

    public Map<String, String> toMap() {
        Map<String, String> map = new HashMap<>();
        map.put("id", String.valueOf(this.id));
        map.put("image", this.image);
        map.put("nickname", this.nickname);
        map.put("message", this.message);
        return map;
    }
}
