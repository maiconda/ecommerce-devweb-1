package com.educandoweb.course.services.exceptions;

public class NotAllowedEception extends RuntimeException{
	private static final long serialVersionUID = 1L;
	
	public NotAllowedEception(String msg) {
		super(msg);
	}
}
