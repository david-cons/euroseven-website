package com.titi.euro7.services;


import com.titi.euro7.entities.PersonalDetails;
import com.titi.euro7.entities.User;
import com.titi.euro7.repositories.PersonalDetailsRepository;
import com.titi.euro7.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.logging.Logger;

@Service
public class UserService {

    Logger log = Logger.getLogger(UserService.class.getName());

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PersonalDetailsRepository personalDetailsRepository;

    public User getUserById(Long id) {
        log.info("Retrieving user with id " + id);
        return userRepository.findById(id).orElse(null);
    }

    public List<User> getAllUsers() {
        log.info("Getting all users");
        return userRepository.findAllByRole("ROLE_USER");
    }

    public User createUser(User user) {
        log.info("Saving user " + user.toString());
        return userRepository.save(user);
    }

    public boolean deleteUser(Long id) {
        log.info("Deleting user with id " + id);
        if (!userRepository.existsById(id)) {
            log.info("User with id " + id + " does not exist");
            return false;
        }
        userRepository.deleteById(id);
        return true;
    }

    public List<User> searchUser(String keyword) {
        log.info("Searching for user with keyword " + keyword);
        List<User> users = userRepository.findAll();
        List<User> searchResult = new ArrayList<>();

        if (isNumeric(keyword)) {
            for (User user : users) {
                Integer codClient = user.getCodClient();
                if (codClient != null && codClient.toString().contains(keyword)) {
                    searchResult.add(user);
                }
            }
        } else {
            for (User user : users) {
                String name = user.getName();
                if (name != null && name.contains(keyword)) {
                    searchResult.add(user);
                }
            }
        }

        return searchResult;
    }

    public User updateUser(Long id, String name, String address, String localitate, String phone) {
        log.info("Updating user with id " + id);
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            log.info("User with id " + id + " does not exist");
            return null;
        }
        user.setName(name);
        user.setAddress(address);
        user.setLocalitate(localitate);
        user.setPhone(phone);
        return userRepository.save(user);
    }

    public static boolean isNumeric(String str) {
        return str.matches("-?\\d+(\\.\\d+)?");
    }


    public User toggleUserStatus(Long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            log.info("User with id " + id + " does not exist");
            return null;
        }
        if (!user.getInactive()) {
            user.setInactive(true);
            log.info("User with id " + id + " is now inactive");
        } else {
            user.setInactive(false);
            log.info("User with id " + id + " is now active");
        }
        userRepository.save(user);
        return user;
    }

    public User uploadImage(MultipartFile picture, Long id) {

        try {
            User user = userRepository.findById(id).orElse(null);
            if (user == null) {
                log.info("User with id " + id + " does not exist");
                return null;
            }
            user.setImage(Base64.getEncoder().encodeToString(picture.getBytes()));
            userRepository.save(user);
            return user;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }


}
