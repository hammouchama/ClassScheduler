package com.classscheduler.backend.utils;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class EmailHelper {


    private JavaMailSender javaMailSender;

    public void sendLoginInfoEmail(String email, String password,String name,String typeOfUser) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(message, true);
        messageHelper.setFrom("hm01.oussama@gmail.com");
        messageHelper.setTo(email);
        messageHelper.setSubject("Welcome to Center Formation System - Your Login Details");

        String htmlMsg = "<p>Dear "+typeOfUser+" "+name+",</p>" +
                "<p><b>Your Login Details for formation center Management System</b></p>" +
                "<p><b>Username:</b> " + email + "<br>" +
                "<b>Password:</b> " + password + "</p>" +
                "<p>Please use the provided credentials to log in to the Formation Center Management System. You can access the login page by clicking on the following link:</p>" +
                "<p><a href=\"http://localhost:4200/login\">Login to Formation Center Management System</a></p>" +
                "<p>For security reasons, we recommend changing your password after the initial login.</p>" +
                "<p>If you encounter any issues or have questions, feel free to contact our support team at admin@gmail.com.</p>" +
                "<p>Thank you for using Formation Center Management System!</p>" +
                "<p>Best regards,<br>" +
                "Oussama<br>" +
                "Admin <br>" ;

        message.setContent(htmlMsg, "text/html");
        javaMailSender.send(message);
    }
}
