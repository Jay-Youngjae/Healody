package dev.umc.healody.user.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "User")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "name")
    private String name;

    @Column(name = "phone", unique = true)
    private String phone;

    @Column(name = "birth")
    private java.sql.Date birth;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "gender")
    private String gender;

    @Column(name = "password")
    private String password;

    @Column(name = "image")
    private String image;

    @Column(name = "nickname", unique = true)
    private String nickname;

    @Column(name = "message")
    private String message;

    @Builder.Default
    @Column(name = "family_cnt")
    private Long familyCnt = 0L;

    @Column(name = "activated")
    private boolean activated;

    @ManyToMany
    @JoinTable(
            name = "user_authority",
            joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "authority_name")})
    private Set<Authority> authorities;


    public Map<String, Object> toMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("id", this.userId);
        map.put("name",this.name);
        map.put("image",this.image);
        map.put("nickname",this.nickname);
        map.put("message",this.message);
        return map;
//        return "{" +
//                "id=" + userId +
//                ", name='" + name + '\'' +
//                ", image='" + image + '\'' +
//                ", nickname='" + nickname + '\'' +
//                ", message='" + message + '\'' +
//                '}';
    }
}
