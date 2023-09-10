package com.titi.euro7.services;


import com.titi.euro7.entities.PersonalDetails;
import com.titi.euro7.entities.User;
import com.titi.euro7.repositories.PersonalDetailsRepository;
import com.titi.euro7.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;

@Service
public class UserService {
    // TODO: Add more admin related functionality here + user
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
        return userRepository.findAll();
    }

    public User createUser(User user) {
        log.info("Saving user " + user.toString());
        return userRepository.save(user);
    }

    // TODO| implement PersonalDetails methods, one example below

    //public PersonalDetails getDetailsByUserId(Long id) {
  //      return PersonalDetailsRepository.findById
  //  }

}
