package de.neuefische.backend.appUser;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
    class AppUserControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    void me_whenAppUserNotLoggedIn_thenReturn401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/app-users/me")).
                andExpectAll(MockMvcResultMatchers.status().isUnauthorized()
                );
    }
    @Test
    @WithMockUser(username = "admin", roles = "BASIC")
    void me_whenAppUserisLoogedIn_thenReturn200() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/app-users/me"))
                .andExpectAll(MockMvcResultMatchers.status().isOk()
                );
    }

    @Test
    void Loggin_whenAppUserIsNotExist_thenReturn401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/app-users/login")).
                andExpectAll(MockMvcResultMatchers.status().isUnauthorized()
                );
    }

    @Test
    @WithMockUser(username = "admin", roles = "BASIC")
    void Loggin_whenAppUserIsExist_thenReturn200() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/app-users/login"))
                .andExpectAll(MockMvcResultMatchers.status().isOk()
                );
    }

    @Test
    @WithMockUser(username = "maik",roles = "BASIC")
    void logout_whenLoggedAppUserWillLogout_shouldReturnIsOK() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/app-users/logout"))
                .andExpectAll(MockMvcResultMatchers.status().isOk()
                );
    }

    @Test
    void logout_whenNotLoggedAppUserWillLogout_shouldReturn401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/app-users/logout"))
                .andExpectAll(MockMvcResultMatchers.status().isUnauthorized()
                );

    }
    @Test
    void SignUp_whenAppUserSignUp_thenCreateNewAppUser() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/app-users")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                           {
                           "id": "1",
                           "username": "user",
                           "password": "password"
                            }
                            """)).andExpectAll(
                                    MockMvcResultMatchers.status().isOk(),
                                    MockMvcResultMatchers.content().json("""
                                              {
                                              "id": "1",
                                              "username": "user",
                                              "password": ""
                                              }
                                              """)
        );
    }

    @Test
    void SignUp_whenAppUserSignUpAlreadyExist_thenReturnConflict() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/app-users")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                           {
                           "id": "1",
                           "username": "user",
                           "password": "123"
                            }
                            """)).andExpectAll(
                MockMvcResultMatchers.status().isOk(),
                MockMvcResultMatchers.content().json("""
                                              {
                                              "id": "1",
                                              "username": "user",
                                              "password": ""
                                              }
                                              """)
        );
        mockMvc.perform(MockMvcRequestBuilders.post("/api/app-users")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                           {
                           "id": "1",
                           "username": "user",
                           "password": "123"
                            }
                            """)).andExpectAll(
                MockMvcResultMatchers.status().isConflict()
        );
    }
}