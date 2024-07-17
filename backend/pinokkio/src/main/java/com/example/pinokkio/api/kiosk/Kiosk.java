//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.example.pinokkio.api.kiosk;

import com.example.pinokkio.api.pos.Pos;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "kiosk")
@Getter
@Setter(AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Kiosk {

    @Id
    @GeneratedValue
    @Column(columnDefinition = "BINARY(16)", name = "kiosk_id")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pos_id")
    private Pos pos;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String password;

    public void updateName(String newName) {
        this.name = newName;
    }

    public void updatePassword(String newPassword) {
        this.password = newPassword;
    }

}
