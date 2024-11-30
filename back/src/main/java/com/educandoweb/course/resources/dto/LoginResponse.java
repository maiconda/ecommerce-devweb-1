package com.educandoweb.course.resources.dto;

import com.educandoweb.course.entities.User;

public record LoginResponse(String accessToken, Long expiressIn, User user) {

}
