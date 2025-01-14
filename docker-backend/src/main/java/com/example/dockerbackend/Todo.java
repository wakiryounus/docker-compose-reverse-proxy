package com.example.dockerbackend;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Todo {
    private int id;
    private String title;
    private Boolean isDone;
}
