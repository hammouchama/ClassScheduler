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
    public void sendFeedBack(String email,String url,String name,String TrainerName,String FromationTitle) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(message, true);
        messageHelper.setFrom("hm01.oussama@gmail.com");
        messageHelper.setTo(email);
        messageHelper.setSubject("Feedback Request: Your Experience with Trainer and Formation");
        String htmlMsg = "<p>Dear  " + name + ",</p>" +
                "<p>We hope this message finds you well. As part of our commitment to continuous improvement, we value your feedback on your recent experience with our Formation Center and Trainer.</p>" +
                "<p><b>Trainer Information:</b><br>" +
                "<b>Name:</b> "+TrainerName+"<br>" +
                "<b>Formation Title:</b> "+FromationTitle+"</p>" +
                "<p><b>Your Feedback:</b></p>" +
                "<p>Please take a few moments to share your thoughts on the following aspects:</p>" +
                "<ol>" +
                "<li><b>Trainer's Performance:</b> [Your feedback on the trainer's teaching style, knowledge, and interaction with students]</li>" +
                "<li><b>Formation Content:</b> [Your thoughts on the content, materials, and overall structure of the formation]</li>" +
                "<li><b>Facility and Resources:</b> [Any comments on the facilities and resources provided during the formation]</li>" +
                "<li><b>Overall Experience:</b> [General feedback on your overall experience]</li>" +
                "</ol>" +
                "<p>Your feedback is valuable to us, and it will help us enhance the quality of our formations and trainers. Click on the following link to submit your feedback:</p>" +
                "<p><a href=\""+url+"\">Submit Feedback</a></p>" +
                "<p>If you have any additional comments or suggestions, feel free to include them in the form.</p>" +
                "<p>Thank you for your time and collaboration in making our Formation Center even better!</p>" +
                "<p>Best regards,<br>" +
                "Oussama<br>" +
                "Admin <br>" ;

        message.setContent(htmlMsg, "text/html");
        javaMailSender.send(message);
    }
}
