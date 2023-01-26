package de.neuefische.backend.appUser;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class AppUserServiceTest {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    void whenCreateNewAppUser_thenReturnNewAppUser(){
        //given
        AppUser signup = new AppUser(
                "1","maik"
                ,"123"
        );
        AppUser signupend = new AppUser(
                "1","maik"
                ,""
        );
        AppUserRepository appUserRepository = Mockito.mock(AppUserRepository.class);

        AppUserService appUserService = new AppUserService(appUserRepository,passwordEncoder);
        Mockito.when(appUserRepository.findByUsername(signup.getUsername())).thenReturn(Optional.empty());
        //when
        AppUser actual = appUserService.create(signup);
        //then
        Assertions.assertEquals(actual,signupend);

        Mockito.verify(appUserRepository).findByUsername("maik");

    }

    @Test
    void whenCreateNewAppUserHasAdminRole_thenReturnNewAppUserWithBasicRole(){
        //given
        AppUser signup = new AppUser(
                "1","maik"
                ,"123"
        );
        AppUser signupend = new AppUser(
                "1","maik"
                ,""
        );
        AppUserRepository appUserRepository = Mockito.mock(AppUserRepository.class);

        AppUserService appUserService = new AppUserService(appUserRepository,passwordEncoder);
        Mockito.when(appUserRepository.findByUsername(signup.getUsername())).thenReturn(Optional.empty());
        //when
        AppUser actual = appUserService.create(signup);
        //then
        Assertions.assertEquals(actual,signupend);

        Mockito.verify(appUserRepository).findByUsername("maik");

    }

    @Test
    void whenCreateNewAppUserIsExist_thenReturn409Conflict(){
        //given
        AppUser signup = new AppUser(
                "1","maik"
                ,"123"
        );
        AppUser signupend = new AppUser(
                "1","maik"
                ,""
        );
        AppUserRepository appUserRepository = Mockito.mock(AppUserRepository.class);

        AppUserService appUserService = new AppUserService(appUserRepository,passwordEncoder);
        Mockito.when(appUserRepository.findByUsername(signup.getUsername())).thenReturn(Optional.of(signupend));
        //when //then
        try {
            appUserService.create(signup);
        } catch (ResponseStatusException e) {
            Assertions.assertEquals(e.getStatus(), HttpStatus.CONFLICT);
        }
        Mockito.verify(appUserRepository).findByUsername("maik");
    }
    @Test
    void whenLoginIsSuccessfully_thenReturnUserWithoutPassword(){
        //given
        AppUser existuser = new AppUser(
                "1","maik"
                ,"123"
        );
        AppUserRepository appUserRepository = Mockito.mock(AppUserRepository.class);

        AppUserService appUserService = new AppUserService(appUserRepository,passwordEncoder);
        Mockito.when(appUserRepository.findByUsername(existuser.getUsername())).thenReturn(Optional.of(existuser));

        //when
        Optional<AppUser> actual = appUserService.findByUsernameWithoutPassword(existuser.getUsername());

        //then
        Assertions.assertEquals(actual,Optional.of(existuser));

        Mockito.verify(appUserRepository).findByUsername("maik");
    }

    @Test
    void whenLoginIsFail_thenReturnNull(){
        //given
        AppUser existuser = new AppUser(
                "1","maik"
                ,"123"
        );
        AppUserRepository appUserRepository = Mockito.mock(AppUserRepository.class);

        AppUserService appUserService = new AppUserService(appUserRepository,passwordEncoder);
        Mockito.when(appUserRepository.findByUsername(existuser.getUsername())).thenReturn(Optional.empty());

        //when
        Optional<AppUser> actual = appUserService.findByUsernameWithoutPassword(existuser.getUsername());

        //then
        Assertions.assertEquals(actual,Optional.empty());

        Mockito.verify(appUserRepository).findByUsername("maik");
    }

    @Test
    void whenMeIsSuccessfully_thenReturnUserWithoutPassword() {
        //given
        AppUser existuser = new AppUser(
                "1", "maik"
                , "123"
        );
        AppUserRepository appUserRepository = Mockito.mock(AppUserRepository.class);

        AppUserService appUserService = new AppUserService(appUserRepository, passwordEncoder);
        Mockito.when(appUserRepository.findByUsername(existuser.getUsername())).thenReturn(Optional.of(existuser));

        //when
        Optional<AppUser> actual = appUserService.findByUsernameWithoutPassword(existuser.getUsername());

        //then
        Assertions.assertEquals(actual, Optional.of(existuser));

        Mockito.verify(appUserRepository).findByUsername("maik");
    }
}